import "@askui/jest-allure-circus";

declare const allure: {
    step(name: string, body?: () => void): void;
    attachment(name: string, content: string, type: string): void;
}

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