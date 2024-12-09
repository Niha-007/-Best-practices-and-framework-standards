// Import required modules
import { UiControlClient } from 'askui';
import { AskUIAllureStepReporter } from '@askui/askui-reporters';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// Initialize UiControlClient
let aui: UiControlClient;

// Set test timeout to 1 hour
jest.setTimeout(60 * 1000 * 60);

/**
* Reads workspaceId from AskuiEnvironmentSettings.json
* @returns {string} workspace ID from settings file
*/
const getWorkspaceId = (): string => {
   try {
       // Use the correct relative path to the settings file
       const settingsPath = path.join(process.cwd(), '.askui', 'Settings', 'AskuiEnvironmentSettings.json');
       
       if (!fs.existsSync(settingsPath)) {
           console.error(`Settings file not found at: ${settingsPath}`);
           return 'default-workspace-id';
       }

       const settingsContent = fs.readFileSync(settingsPath, 'utf8');
       const settings = JSON.parse(settingsContent);
       
       if (!settings.credentials?.workspaceId) {
           console.error('workspaceId not found in settings file');
           return 'default-workspace-id';
       }

       return settings.credentials.workspaceId;

   } catch (error) {
       console.error('Error reading workspaceId:', error);
       return 'default-workspace-id';
   }
};

/**
* Detects device type (laptop/desktop/windows) based on system information
* @returns {string} Device prefix (LAPTOP/DESKTOP/WIN)
*/
const getDevicePrefix = () => {
   // Get system hostname in uppercase for consistent checking
   const hostname = os.hostname().toUpperCase();
   
   // First try to detect from hostname
   if (hostname.includes('LAPTOP')) return 'LAPTOP';
   if (hostname.includes('DESKTOP')) return 'DESKTOP';
   if (hostname.includes('WIN')) return 'WIN';

   // Get additional system information
   const platform = os.platform();
   
   // Check if device is a laptop by detecting battery (Windows only)
   const isLaptop = platform === 'win32' 
       ? require('child_process').execSync('wmic path win32_battery get status').toString().includes('OK')
       : false;

   // Return appropriate prefix based on checks
   if (isLaptop) return 'LAPTOP';
   if (platform === 'win32') return 'DESKTOP';
   return 'WIN';
};

/**
* Creates and writes environment information to Allure properties file
*/
const setAllureEnvironment = () => {
   const allureResultsDir = 'allure-results';
   const envPropertiesFile = path.join(allureResultsDir, 'environment.properties');

   // Create allure-results directory if it doesn't exist
   if (!fs.existsSync(allureResultsDir)) {
       fs.mkdirSync(allureResultsDir, { recursive: true });
   }

   // Generate device ID with appropriate prefix and random suffix
   const devicePrefix = getDevicePrefix();
   const deviceSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
   const deviceId = `${devicePrefix}-${deviceSuffix}`;

   // Get workspaceId and construct URL
   const workspaceId = getWorkspaceId();
   const askuiUrl = `https://app.askui.com/workspaces/${workspaceId}/quick-start`;

   // Define environment information
   const environmentInfo = {
       APP_URL: askuiUrl,
       Device_ID: deviceId,
       Workspace_ID: workspaceId,
       TEST_RUNNER: 'Jest',
       PLATFORM: os.platform(),
       OS_VERSION: os.release(),
       NODE_VERSION: process.version,
       TIMESTAMP: new Date().toISOString()
   };

   // Convert environment info to properties format
   const propertiesContent = Object.entries(environmentInfo)
       .map(([key, value]) => `${key}=${value}`)
       .join('\n');

   // Write to environment.properties file
   fs.writeFileSync(envPropertiesFile, propertiesContent);
};

// Setup before all tests
beforeAll(async () => {
   // Set environment info for Allure report
   setAllureEnvironment();

   // Initialize AskUI client
   aui = await UiControlClient.build({
       reporter: new AskUIAllureStepReporter(),
   });

   // Connect to AskUI
   await aui.connect();
});

// Setup before each test
beforeEach(async () => {
   /* Uncomment to enable video recording
   await aui.startVideoRecording();
   */
});

// Cleanup after each test
afterEach(async () => {
   /* Uncomment to enable video recording
   await aui.stopVideoRecording();
   const video = await aui.readVideoRecording();
   await AskUIAllureStepReporter.attachVideo(video);
   */
});

// Cleanup after all tests
afterAll(async () => {
   // Disconnect from AskUI
   aui.disconnect();
});

// Export aui client for use in tests
export { aui };
