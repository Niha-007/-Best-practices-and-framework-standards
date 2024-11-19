// pages/ProductPage.ts
import { aui } from '../helpers/askui-helper';

/**
 * Page Object Model for the Product page
 * Handles product selection and cart interactions
 */
class ProductPage {
    /**
     * Selects a product by clicking its name
     * @param productName - Name of the product to select
     * @returns Promise<void>
     * @throws Will throw an error if product is not found
     */
    async selectProduct(productName: string): Promise<void> {
        await aui.click().text(productName).exec();
        await aui.waitFor(1000).exec();
    }

    /**
     * Adds current product to cart
     * Handles both initial add and remove/re-add scenarios
     * @returns Promise<void>
     * @throws Will throw an error if Add to cart button is not found
     */
    async addToCart(): Promise<void> {
        if (await aui.expect().text('Add to cart').exists()) {
            await aui.click().text('Add to cart').exec();
        } else {
            await aui.click().text('Remove').exec();
            await aui.click().text('Add to cart').exec();
        }
    }

    /**
     * Navigates to shopping cart page
     * @returns Promise<void>
     * @throws Will throw an error if cart icon is not found
     */
    async goToCart(): Promise<void> {
        //await aui.click().aiElement('cart1').exec();
    }
}

export default new ProductPage();