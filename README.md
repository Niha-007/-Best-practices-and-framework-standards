# SauceDemo Test Automation Documentation

## Installing AskUI in your system
refer - https://docs.askui.com/docs/general/Getting%20Started/start

## Naming conventions
- hot-dog-case for test workflows
- snake_case for directories
- Variable declarations in camelCase

## Model : Used POM design

We would be using POM design - to optimise page interactions automation with the option of feeding multiple data sets into tests.

The Page Object Model (POM) design pattern is a popular approach in UI automation frameworks to enhance maintainability and scalability of tests. It helps to centralize interactions with web pages and reduces redundancy, making it easier to maintain and update tests when the UI changes.

Core Principles of the Page Object Model (POM):

Separate Page-Specific Code: The code specific to each page of the application is placed within its own class (Page Object). This keeps the code modular and well-organized.

Centralize Locators: Locators for all elements on the page (e.g., buttons, input fields, links) are stored in the corresponding Page Object. This makes it easy to update locators when UI changes without affecting the test code.

Reusable Methods: Actions performed on the UI elements (e.g., click, input, verify) are encapsulated in methods within the Page Object, which can be reused across tests.


## Project structure

```

├SAUCEDEMO_PROJECT/
├── .askui/                              # AskUI Configuration Directory
│   └── Settings/                        # Settings for AskUI Framework
│       └── AskuiEnvironmentSettings.json # Environment-specific AskUI settings
│
├── .vscode/                             # VSCode ADE built
│   ├── extensions.json                  # recommendtions for adding extensions/plugins in vscode
│   └── settings.json                    # to configure and set askui-shell as default
|
├── allure-results/                      # Test execution reports and results
├── ./askui_example/                     # Example implementations and templates
│   └── data_input/                      # Test data management
│       └── test-data.ts                 # Central test data configuration
├── allure-report/                       # to generate allure reporting and checking process workflow stats
├── folder_example/                      # Example test implementations
│   ├── folder-1.test.ts                 # Standard user flow examples
│   └── folder-2.test.ts                 # Error user flow examples
│
├── helpers/                             # Utility and Helper Functions
│   └── askui-helper.ts                  # AskUI specific helper methods
│
├── logging/                             # Logging Configuration
│   └── logger.ts                        # Custom logger implementation
│
├── page_workflows/                      # Page Object Model Directory
│   ├── checkout-page.ts                 # Checkout page interactions
│   ├── inventory-page.ts                # Product listing page interactions
│   ├── login-page.ts                    # Login page interactions
│   └── product-page.ts                  # Individual product page interactions
│
├── jest.config.ts                       # Jest test framework configuration
├── my-first-askui-test-suite.test.ts    # Initial test suite example
├── purchase-standard-problem-user.test.ts# Standard user purchase flow tests
├── purchase-test-error-user.test.ts     # Error user purchase flow tests
├── node_modules/                        # Project dependencies
├── report/                              # Generated test reports
├── .env                                 # Environment variables declaration
├── .eslintignore                        # ESLint ignore patterns
├── .eslintrc.json                       # ESLint configuration
├── .gitignore                           # Git ignore patterns
├── env.d.ts                             # Environment variable type definitions
├── package-lock.json                    # NPM dependency lock file
├── package.json                         # Project configuration and scripts
├── README.md                            # Project documentation
└── tsconfig.json                        # TypeScript configuration

```

## creating a .vscode folder inside project
You need to create a .vscode folder before running this project
Follow these instructions - https://docs.askui.com/docs/suite/ADE/askui-ide-vscode#configure-jest-runner-eslint--live-view

## Additional Extensions installed in vscode
 - Go to extensions - install Live Preview, Jest Runner, ESlint. These recommendations are added to extensions.json file under .vscode/
   - live-server for viewing annotations inside vscode directly 
   - jest-runner for testing a single test in IDE
   - ESLint for to show missing exec()
   - See: [extensions.json ](.vscode\extensions.json)

## Creating Allure-reporting folder:
Follow these instructions - https://docs.askui.com/docs/general/Integrations/allure-reporting#step-2-install-allure-commandline
If you cannot run the java installation cmd line, then just download sdk version from website and paste in the same environment as your project directory.

## Credentials and usage
Create a .env file in the project directory , where following credentials are placed
standardUserName=standard_user                    #workflow that is successfully completed
commonPassword=secret_sauce                       #password for all users
lockedUserName=locked_user                        #doesnt allow you to login
errorUser = error_user                            #breaks anytime for negative testing
problemUser = problem_user                        #breaks anytime with UI changes
glitchUser = performance_glitch_user              #breaks anytime

- These credentials are pulled to env.d.ts file for further usage in test implementation
## Best Practices for Use Cases with Live Demo

### 🔄 Open Application
Opens the SauceDemo application in Chrome browser. 

- Example:
```typescript
// Example of opening application
await aui.execOnShell("start chrome").exec();
await aui.waitFor(1000).exec();

// Example of local application
await aui.execOnShell('C://Users//example//example//application_name').exec();
```
  
Use execOnShell() to open a application

  - to call a local application accordingly, give filepath file in ""
    - Example : 
    ```typescript
    //Execute opening a local file
    await aui.execOnShell('C://Users//example//example//application_name').exec();
    ```
  - for browser See in code: [open chrome ](./askui_example\folder_example\purchase-error-user.test.ts#L23) 

Create a precondition checklist before test execution.
   - See: [Check if page is loaded](./askui_example\page_workflows\login-page.ts#L20) - Pre condition and text detection

### 🖱️ Click Text and dynamic texts
Clicks on text elements during the purchase workflow.
- Wait till the text appears and then implement the click.Use checks like exist() to see if element exists or not 
  - Example:
  ```typescript
   // Wait and click implementation
   await aui.expect().text('Add to cart').exists();
   await aui.click().text('Add to cart').exec();

   // Check if element exists 
    await aui.expect().text('checkout').exists();
   ```
In the example code:
  - See: [Button click with error handling](./askui_example\folder_example\purchase-performance-glitch-user.test.ts#L48)
  - See: [check text if exists](./askui_example\page_workflows\inventory-page.ts#L67)

### 🎯 Click Icon
Interacts with icons and buttons throughout the application.
- Wait till the icon appears and then implement the click
  - Example: 
  ```typescript
  // AI Element interaction
  await aui.expect().aiElement('cart1').exists();
  await aui.click().aiElement('cart1').exec();
  ```
  In code: 
  - See: [expect icon implementation](./askui_example\page_workflows\inventory-page.ts#L58)
  - Link: [implement icon implementation](./askui_example\page_workflows\inventory-page.ts#L59)

If using AI elements ( like the above example), you need to create a new ai- element, which is done by
  - in vs terminal, - AskUI-ImportExperimentalCommands, then - AskUI-NewAIElement , snip the element needs to be clicked, name the element and save (cart1 here), then call like above example

### ⌨️ Type in Textfields
Enters user credentials and checkout information.
  - Example:
  ```typescript
  // Complete checkout form
  async fillShippingDetails(firstName: string, lastName: string, postalCode: string): Promise {
    await aui.click().text('First Name').exec();
    await aui.type(firstName).exec();
    
    await aui.click().text('Last Name').exec();
    await aui.type(lastName).exec();
    
    await aui.click().text('Zip/Postal Code').exec();
    await aui.type(postalCode).exec();
  }
   ```
  - See: [Test data configuration](./askui_example\data_input\test-data.ts#L7-L13)
  - Link: [Form filling example for first name](./askui_example\page_workflows\checkout-page.ts#L20-L21)

### 👁️ Visual Relations
Handles visual element relationships and layout verification. ( could be to left, right, below or above)
-Example: If an icon that needs to be clicked is below a certain text, then 
```typescript
    - await aui.click().icon().below().text() .withText('Name of the text').exec(); ( follow askui documentation to know more)
```

### ⏳ short delays if application is lagging more - application load
Implements wait mechanisms for application loading.
- Example :
  ```typescript
  // Wait patterns
  await aui.waitFor(333).exec();
  await aui.waitUntil(aui.expect().text('Swag Labs').exists());
   ```
- See: [Wait pattern](./askui_example\folder_example\purchase-error-user.test.ts#L24)

### ⌨️ Press Keys
Handles keyboard interactions. Use shortcut keys for faster runtime and accuracy
- Example: 
```typescript
// Navigation keys
await aui.pressKey('enter').exec();
await aui.pressKey('pagedown').exec();
await aui.pressTwoKeys('alt', 'f4').exec();

// Popup handling
await aui.pressKey('escape').exec();
```
- See: [Key press implementation](./askui_example\page_workflows\checkout-page.ts#L47) //for going to end of page

### 💭 Random Pop-Ups
Condition-Based Execution in AskUI and Handling Random UI Changes

- UI elements can change between test runs due to:
   * Random popups
   * Dynamic button labels
   * State-dependent elements

Code Examples
1. Check Element Exists
```typescript
const element = await aui.get()
                        .text('Button Text')
                        .exec();

if (element.length > 0) {
    // Element exists
}
```

2. Check Element Does Not Exist
```typescript
const element = await aui.get()
                        .text('Button Text')
                        .exec();

if (element.length === 0) {
    // Element does not exist
}
```
3. Best Practice: Modular Function
```typescript
async function handleDynamicElement() {
    const element1 = await aui.get().text('Option 1').exec();
    const element2 = await aui.get().text('Option 2').exec();

    if (element1.length > 0) {
        await aui.click().text('Option 1').exec();
    } else if (element2.length > 0) {
        await aui.click().text('Option 2').exec();
    }
}

// Usage
await handleDynamicElement();
```
- Sometimes a quick 'escape' key helps in removing popup, other times using a if-else to capture a conditional pop up box. 

- Example: 
```typescript
await aui.pressKey('escape').exec();
```
- Link: [Remove pop up ](./askui_example/page_workflows/login-page.ts#L53)


## Supporting Components

### Credential Data Configuration
from .env to env.d.ts and then call into workflows
- Main: [Credential Configuration file](./env.d.ts)
- Calling credentials into workflow example
  - See: [Feed User Credentials into workflow](./askui_example\purchase-standard-problem-user.test.ts#L50-L54)

### Test Data Configuration
All the test data is pulled from test-data.ts
- Main: [Configuration file](./askui_example\data_input\test-data.ts)
- Link: [Test data and URLs](./askui_example\data_input\test-data.ts#l6-l19)

### Logging System
Using a custom logger to log different states of processes
- Main: [Logger implementation](./askui_example\logging\logger.ts)
  - See: [Error logging](./askui_example\logging\logger.ts#L12-L19)
  - Link: [Success logging](./askui_example\logging\logger.ts#L25-L27)

### Best Practices Summary

1. **Test Setup**
Always ensure that the process is started in a clean environment 
In this case study,
Before each test: Opens new Chrome instance
After each test: Closes that test's browser instance
After all tests: Final cleanup to ensure no browsers are left open

This structure ensures:
- Clean environment for each test
- Proper resource cleanup
- No cross-test contamination
- Efficient resource management
   - See: [Browser initialization and close](./askui_example\folder_example\purchase-error-user.test.ts#L18-33)
   - Link: [Cleanup pattern](./askui_example\folder_example\purchase-error-user.test.ts#L34-L38)

3. **Error Handling**
   Logging errors or different process states as needed
   Example :
```typescript
// Error message verification
async isErrorDisplayed(errorMessage: string): Promise {
    await aui.expect().text(errorMessage).exists().exec();
    logger.info(`Error message verified: ${errorMessage}`);
}

// Conditional element handling
if (await aui.expect().text('Add to cart').exists()) {
    await aui.click().text('Add to cart').exec();
} else {
    await aui.click().text('Remove').exec();
}
```
   - See: [Error logging](./askui_example\logging\logger.ts#L11-L32)
   - See: [Error logging in test scaenario](./askui_example\folder_example\purchase-performance-glitch-user.test.ts#L48)

5. **Data Management**
    Creating a ts file where the test data can be pulled into the workflow 

    Example:

```typescript
/**
 * Test data configuration for Sauce Demo tests
 * Contains all test data including credentials, product information, and checkout details
 */
export const testData = {
    // Product used in test scenarios
    productName: 'Sauce Labs Backpack',
    
    // Customer information for checkout process
    checkoutInfo: {
        firstName: 'John',
        lastName: 'Doe',
        postalCode: '10000'
    },
    
    // Application URLs
    baseUrl: 'https://www.saucedemo.com/',
    
    // Error messages
    lockedUserError: 'Epic sadface: Sorry, this user has been locked out.'
};

export default testData;
```
In code:

   - See: [Test data](./askui_example\data_input\test-data.ts#L6-19)
   - See: [Error messages](./askui_example\data_input\test-data.ts#L18)

6. **Test Organization**
   - Two tests cases are created under folder_examples
   - Two test cases are in the main workflow
   - To only run specific test cases - implement "it" blocks and for test omission make them as "xit"
   
7. **How to run**
- Use Jest Runner for individual test runs , install extension in vs code, and click on run or debug on individual workflows
  - See: [Run/Debug](./askui_example\folder_example\purchase-performance-glitch-user.test.ts#L12-13) # after installing jest-runner
- Make it to xit to omit test blocks
- Run from vs terminal as askui-runproject, after you have implemented askui-shell and askui-startcontroller

### Notes
- Each link points to specific line numbers in the source code
- Links use relative paths with './' prefix for proper repository navigation
- Line numbers are specified using GitHub's line number syntax (#L1-L4)