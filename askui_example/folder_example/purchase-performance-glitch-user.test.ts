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
        
        await aui.execOnShell("start chrome").exec();
        await aui.waitFor(1000).exec();
        logger.info('New browser instance started');
    });

    afterEach(async () => {
        await aui.pressTwoKeys('alt', 'f4').exec();
        await aui.waitFor(1000).exec();
        logger.info('Browser instance closed');
    });

    afterAll(async () => {
        await aui.pressTwoKeys('alt', 'f4').exec();
        await aui.waitFor(1000).exec();
        logger.info('Final browser cleanup completed');
    });

    it('glitch user should attempt to complete purchase with error handling', async () => {
        logger.info('Starting problem user purchase flow test');
        
        await loginPage.navigateToSite();
        await loginPage.login(
            process.env.glitchUser!,
            process.env.commonPassword!
        );
        logger.success(' user login successful');

        await inventoryPage.completeProductSelection(testData.productName);
        logger.success('Product selection completed for problem user');
        
        await checkoutPage.fillShippingDetails(
            testData.checkoutInfo.firstName,
            testData.checkoutInfo.lastName,
            testData.checkoutInfo.postalCode
        );
        await checkoutPage.clickContinue();
        await checkoutPage.clickFinish();
        logger.success('performance glitch user purchase flow completed');
        
    });
});

