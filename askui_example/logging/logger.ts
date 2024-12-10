import "@askui/jest-allure-circus";
import * as os from 'os';

declare const allure: {
    step(name: string, body?: () => void): void;
    attachment(name: string, content: string, type: string): void;
    writeEnvironmentInfo(info: Record<string, string>): void;
}

// Generate environment info
const deviceId = `${os.hostname()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
const workspaceId = process.env.ASKUI_WORKSPACE_ID || 'default-workspace-id';

// Define environment info by creating function in allure. 
allure.writeEnvironmentInfo({
    APP_URL: `https://app.askui.com/workspaces/${workspaceId}/quick-start`,
    Device_ID: deviceId,
    Workspace_ID: workspaceId,
    TEST_RUNNER: 'Jest',
    PLATFORM: os.platform(),
    OS_VERSION: os.release(),
    NODE_VERSION: process.version,
    TIMESTAMP: new Date().toISOString()
});

export const logger = {
    error: (message: string, error?: any) => {
        allure.step('❌ ERROR: ' + message, () => {
            if (error) {
                allure.attachment('Error Details', JSON.stringify(error, null, 2), 'application/json');
            }
            allure.attachment('Stack Trace', new Error().stack || '', 'text/plain');
        });
    },

    info: (message: string) => {
        allure.step('📌 INFO: ' + message, () => {
            console.log(message);
        });
    },

    success: (message: string) => {
        allure.step('✅ SUCCESS: ' + message, () => {
            console.log(message);
        });
    },

    warning: (message: string) => {
        allure.step('⚠️ WARNING: ' + message, () => {
            console.log(message);
        });
    }
};
