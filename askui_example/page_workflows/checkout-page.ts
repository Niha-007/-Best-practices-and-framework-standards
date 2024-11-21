/**
 * @fileoverview Page Object Model for the Checkout page
 * Contains all interactions possible during the checkout process
 */

import { aui } from "../helpers/askui-helper";
import { logger } from '../logging/logger';
export class CheckoutPage {
    // Initiates the checkout process by clicking checkout button
    
    async clickCheckout(): Promise<void> {
        await aui.click().text('checkout').exec();
    }

    /**
     * Enters customer's first name in checkout form
     * @param firstName - Customer's first name
     */
    async enterFirstName(firstName: string): Promise<void> {
        await aui.click().text('First Name').exec();
        await aui.type(firstName).exec();
    }

    /**
     * Enters customer's last name in checkout form
     * @param lastName - Customer's last name
     */
    async enterLastName(lastName: string): Promise<void> {
        await aui.click().text('Last Name').exec();
        await aui.type(lastName).exec();
    }

    /**
     * Enters postal code in checkout form
     * @param postalCode - Customer's postal code
    
     */
    async enterPostalCode(postalCode: string): Promise<void> {
        await aui.click().text('Zip/Postal Code').exec();
        await aui.type(postalCode).exec();
    }

        /**
* Validates if entered form values exist on screen
* @param fieldType - Type of field to validate ('firstName', 'lastName', or 'postalCode')
* @param value - Value to verify 
* **/

async verifyEnteredValues(firstName: string, lastName: string, postalCode: string): Promise<void> {
       await aui.expect().text(firstName).exists();
       await aui.expect().text(lastName).exists(); 
       await aui.expect().text(postalCode).exists();

       if (firstName.length === 0 || lastName.length === 0 || postalCode.length == 0 ) {
       logger.error('checkout form details are not properly filled');
     }
     
   }


    /**
     * Clicks continue button in checkout process
     */
    async clickContinue(): Promise<void> {
        await aui.pressKey('pagedown').exec();
        await aui.click().text('continue').exec();
    }

    /**
     * Completes checkout by clicking finish button
     */
    async clickFinish(): Promise<void> {
        await aui.pressKey('pagedown').exec();
        await aui.click().text('Finish').exec();
    }

    /**
     * Fills all shipping details in checkout form
     * @param firstName - Customer's first name
     * @param lastName - Customer's last name
     * @param postalCode - Customer's postal code
     */
    async fillShippingDetails(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterPostalCode(postalCode);
    }
}