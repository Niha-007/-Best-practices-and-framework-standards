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

├SAUCEDEMO_PROJECT/
├── .askui/                              # AskUI Configuration Directory
│   └── Settings/                        # Settings for AskUI Framework
│       └── AskuiEnvironmentSettings.json # Environment-specific AskUI settings
│
├── .vscode/                      # Example test implementations
│   ├── extensions.json                 # recommendtions for adding extensions/plugins in vscode
│   └── settings.json                    # to configure and set askui-shell as default
├── allure-results/                      # Test execution reports and results
├── ./askui_example/                       # Example implementations and templates
│   └── data_input/                      # Test data management
│       └── test-data.ts                 # Central test data configuration
│   
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

## Additional Extensions installed in vscode
 - Go to extensions - install Live Preview, Jest Runner, ESlint. These recommendations are added to extensions.json file under .vscode/
   - live-server for viewing annotations inside vscode directly 
   - jest-runner for testing a single test in IDE
   - ESLint for to show missing exec()
   - See: [extensions.json ](.vscode\extensions.json)

## Credentials and usage
in .env file, following crfedentials are placed
standardUserName=standard_user                    #workflow that is successfully completed
commonPassword=secret_sauce                       #password for all users
lockedUserName=locked_user                        #doesnt allow you to login
errorUser = error_user                            #breaks anytime for negative testing
problemUser = problem_user                        #breaks anytime with UI changes
glitchUser = performance_glitch_user              #breaks anytime

## Use Cases with Live Demo

### 🔄 Open Application
Opens the SauceDemo application in Chrome browser. 
- Always verify the application state before starting automation:  
  - See: [to set up the environment once ](./askui_example\page_workflows\login-page.ts#L20-L39) - Application instance start and end
  
- Use execOnShell() to open a application
  - to call a local application accordingly, give filepath file in ""
    - example : await aui.execOnShell('C://Users//example//example//application_name').exec();
  - for browser  See: [open chrome ](./askui_example\folder_example\purchase-error-user.test.ts#L23) 

- Create a precondition checklist before test execution.  
   - See: [Check if page is loaded](./askui_example\page_workflows\login-page.ts#L20) - Pre condition and text detection

### 🖱️ Click Text and dynamic texts
Clicks on text elements during the purchase workflow.
-Wait till the text appears and then implement the click
  - See: [Checkout interactions](././askui_example\folder_example\purchase-error-user.test.ts#L47-L50) - Structured workflow
  - Link: [Button click with error handling](./askui_example\folder_example\purchase-performance-glitch-user.test.ts#L48)

- Use checks like exist() to see if element exists or not 
  - See: [check text if exists](./askui_example\page_workflows\inventory-page.ts#L67)

### 🎯 Click Icon
Interacts with icons and buttons throughout the application.
-Wait till the icon appears and then implement the click
  - Example: await aui.expect().aiElement('cart1').exists();
             await aui.click().aiElement('cart1').exec();
  - See: [expect icon implementation](./askui_example\page_workflows\inventory-page.ts#L58)
  - Link: [implement icon implementation](./askui_example\page_workflows\inventory-page.ts#L459)

- If using AI elements ( like the above example), you need to create a new ai- element, which is done by
  - in vs terminal, - AskUI-ImportExperimentalCommands, then - AskUI-NewAIElement , snip the element needs to be clicked, name the element and save (cart1 here), then call like above example

### ⌨️ Type in Textfields
Enters user credentials and checkout information.
  - Example: await aui.type(firstName).exec();
  - See: [Test data configuration](./askui_example\data_input\test-data.ts#L7-L18)
  - Link: [Form filling example for first name](./askui_example\page_workflows\checkout-page.ts#L20-L21)

### 👁️ Visual Relations
Handles visual element relationships and layout verification. ( could be to left, right, below or above)
-Example: If an icon that needs to be clicked is below a certain text, then 
    - await aui.click().icon().below().text() .withText('Name of the text').exec(); ( follow askui documentation to know more)

### ⏳ short delays if application is lagging more - application load
Implements wait mechanisms for application loading.
- Example :await aui.waitFor(1000).exec();
- See: [Wait pattern](./askui_example\folder_example\purchase-error-user.test.ts#L24)

### ⌨️ Press Keys
Handles keyboard interactions. Use shortcut keys for faster runtime and accuracy
- Example:  await aui.pressKey('pagedown').exec();
- See: [Key press implementation](./askui_example\page_workflows\checkout-page.ts#L47) //for going to end of page

### 💭 Random Pop-Ups
Handles unexpected pop-ups and dialog boxes. Sometimes a quick 'escape' key helps in removing popup, other times using a try catch to capture a conditional pop up box
- Example: await aui.pressKey('escape').exec();
- Link: [Error handling](./askui_example/page_workflows/login-page.ts#L38)

## Supporting Components

### Credential Data Configuration
from .env to env.d.ts and then call into workflows
- Main: [Credential Configuration file](./env.d.ts)
- Calling credentials into workflow example
  - See: [Feed User Credentials into workflow](./askui_example\purchase-standard-problem-user.test.ts#L45-L48)

### Test Data Configuration
- Main: [Configuration file](./askui_example\data_input\test-data.ts)
- Link: [Test data and URLs](./askui_example\data_input\test-data.ts#l6-l19)

### Logging System
- Main: [Logger implementation](./askui_example\logging\logger.ts)
  - See: [Error logging](./askui_example\logging\logger.ts#L7-L13)
  - Link: [Success logging](./askui_example\logging\logger.ts#L19-L21)

### Best Practices Summary

1. **Test Setup**
   - See: [Browser initialization and close](./askui_example\folder_example\purchase-error-user.test.ts#L19-33)
   - Link: [Cleanup pattern](./askui_example\folder_example\purchase-error-user.test.ts#L34-L38)

2. **Error Handling** 
   - See: [Error logging](./askui_example\logging\logger.ts#L5-L30)
   - See: [Error logging in test scaenario](./askui_example\folder_example\purchase-performance-glitch-user.test.ts#L48)

3. **Data Management**
   - See: [Test data](./askui_example\data_input\test-data.ts#L7-19)
   - See: [Error messages](./askui_example\data_input\test-data.ts#L18)

4. **Test Organization**
   - Two tests cases are created under folder_examples
   - Two test cases are in the main workflow
   - To only run specific test cases - implement "it" blocks and for test omission make them as "xit"
   
5. **How to run**
- use Jest Runner for individual test runs , install extension in vs code, and click on run or debug on individual workflows
  - See: [Run/Debug](./askui_example\folder_example\purchase-performance-glitch-user.test.ts#L39-40) # after installing jest-runner
- Make it to xit to omit test blocks
- Run from vs terminal as askui-runproject, after you have implemented askui-shell and askui-startcontroller

### Notes
- Each link points to specific line numbers in the source code
- Links use relative paths with './' prefix for proper repository navigation
- Line numbers are specified using GitHub's line number syntax (#L1-L4)