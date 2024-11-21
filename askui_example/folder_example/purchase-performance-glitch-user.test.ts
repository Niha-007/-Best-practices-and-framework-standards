/**
 * @fileoverview Test suite for Sauce Demo purchase workflows
 * Contains test cases for different user types: standard, locked,error, glitch and problem users
 */
import { aui } from "../helpers/askui-helper";
import { LoginPage } from '../page_workflows/login-page';
import { InventoryPage } from '../page_workflows/inventory-page';
import { CheckoutPage } from '../page_workflows/checkout-page';
import { testData } from '../data_input/test-data';
import { logger } from '../logging/logger';
import dotenv from 'dotenv';
dotenv.config();
describe('Sauce Demo Purchase Flow Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let checkoutPage: CheckoutPage;

    beforeEach(async () => {
        loginPage = new LoginPage();
        inventoryPage = new InventoryPage();
        checkoutPage = new CheckoutPage();
        
    });

    afterEach(async () => {
        await aui.pressTwoKeys('alt', 'f4').exec();
        await aui.waitFor(1000).exec();
        logger.info('Browser instance closed');
    });

    it('glitch user should attempt to complete purchase with error handling', async () => {
        logger.info('Starting problem user purchase flow test');
        
        await loginPage.navigateToSite();
        await loginPage.login(
            process.env.glitchUser!,
            process.env.commonPassword!
        );
        logger.success(' user login successful');
        await aui.pressKey('escape').exec();
        await inventoryPage.completeProductSelection(testData.productName);
        logger.success('Product selection completed for problem user');
        
        await checkoutPage.fillShippingDetails(
            testData.checkoutInfo.firstName,
            testData.checkoutInfo.lastName,
            testData.checkoutInfo.postalCode
        );

        await checkoutPage.verifyEnteredValues(
            testData.checkoutInfo.firstName,
            testData.checkoutInfo.lastName,
            testData.checkoutInfo.postalCode
        );
        logger.success('Form details filled and verified');
        await checkoutPage.clickContinue();
        await checkoutPage.clickFinish();
        logger.success('performance glitch user purchase flow completed');
        
    });
});

