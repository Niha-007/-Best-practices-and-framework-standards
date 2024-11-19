/**
 * @fileoverview Page Object Model for the Inventory page
 * Contains all interactions possible on the inventory/products page
 */

import { aui } from "../helpers/askui-helper";
import { logger } from '../logging/logger';

export class InventoryPage {
    /**
     * Verifies product is present and selects it
     * @param productName - The name of the product to select and verify
     */
    async selectProduct(productName: string): Promise<void> {
        logger.info(`Attempting to select product: ${productName}`);
        
        // Initial product verification
        await aui.expect().text(productName).exists();
        await aui.click().text(productName).exec();
        logger.success(`Successfully clicked product: ${productName}`);

        // Verify landed on correct product page
        await aui.expect().text(productName).exists();
        await aui.click().text(productName).exec();
        logger.success(`Successfully verified product page for: ${productName}`);
    }

    /**
     * Verifies Add to Cart button exists and adds product to cart
     * Handles cases where item might need to be removed first
     */
    async addToCart(): Promise<void> {
        logger.info('Attempting to add product to cart');
        
        let added = false;
        
        try {
            await aui.expect().text('Add to cart').exists();
            await aui.click().text('Add to cart').exec();
            added = true;
            logger.success('Successfully added product to cart');
        } catch {
            logger.warning('Add to cart button not found, attempting remove and add sequence');
            await aui.click().text('Remove').exec();
            logger.info('Successfully clicked Remove button');
            await aui.click().text('Add to cart').exec();
            logger.success('Successfully added product to cart after remove');
        }
    }

    /**
     * Verifies cart icon is present and navigates to cart view
     * Includes additional verification of cart access
     */
    async goToCart(): Promise<void> {
        logger.info('Attempting to navigate to cart');
        
        await aui.expect().aiElement('cart1').exists();
        await aui.click().aiElement('cart1').exec();
        logger.success('Successfully clicked cart icon');

        // Additional click to ensure cart contents are visible
        await aui.mouseLeftClick().exec();
        logger.info('Additional click performed to view cart contents');

        // Verify on cart page by checking for checkout button
        await aui.expect().text('checkout').exists();
        logger.success('Successfully verified cart page loaded');
    }

    /**
     * Verifies checkout button exists and proceeds to checkout
     */
    async proceedToCheckout(): Promise<void> {
        logger.info('Attempting to proceed to checkout');
        
        await aui.expect().text('checkout').exists();
        await aui.click().text('checkout').exec();
        logger.success('Successfully proceeded to checkout');

        // Verify successful navigation to checkout page
        await aui.waitUntil(aui.expect().text('First Name').exists());
        logger.success('Successfully verified checkout page loaded');
    }

    /**
     * Completes entire product selection and cart process
     * @param productName - The name of the product to purchase
     */
    async completeProductSelection(productName: string): Promise<void> {
        logger.info(`Starting complete product selection flow for: ${productName}`);
        
        // Step 1: Product Selection
        await this.selectProduct(productName);
        logger.info('Product selection step completed');

        // Step 2: Add to Cart
        await this.addToCart();
        logger.info('Add to cart step completed');

        // Step 3: Go to Cart
        await this.goToCart();
        logger.info('Cart navigation step completed');

        // Step 4: Proceed to Checkout
        await this.proceedToCheckout();
        logger.info('Proceed to checkout step completed');

        logger.success('Completed product selection flow successfully');
    }

    /**
     * Verifies if error message is displayed
     * @param errorMessage - The error message to verify
     */
    async isErrorDisplayed(errorMessage: string): Promise<void> {
        await aui.expect().text(errorMessage).exists().exec();
        logger.info(`Error message verified: ${errorMessage}`);
    }
}