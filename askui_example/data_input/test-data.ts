/**
 * @fileoverview Test data configuration for Sauce Demo tests
 * Contains all test data including credentials, product information, and checkout details
 */
import { logger } from '../logging/logger';
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
    lockedUserError: 'Epic sadface: Username and password x'
};

export default testData;