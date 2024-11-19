/**
 * @fileoverview Utility for consistent error logging
 */

export const logger = {
    error: (message: string, error?: any) => {
        console.error('\x1b[31m%s\x1b[0m', '❌ ERROR:', message);
        if (error) {
            console.error('Details:', error);
        }
        console.error('\x1b[33m%s\x1b[0m', '📍 Stack:', new Error().stack);
    },

    info: (message: string) => {
        console.log('\x1b[36m%s\x1b[0m', '📌 INFO:', message);
    },

    success: (message: string) => {
        console.log('\x1b[32m%s\x1b[0m', '✅ SUCCESS:', message);
    },

    warning: (message: string) => {
        console.log('\x1b[33m%s\x1b[0m', '⚠️ WARNING:', message);
    }
};

