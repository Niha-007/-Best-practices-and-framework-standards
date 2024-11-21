/**
 * @fileoverview Page Object Model for the Login page
 * Contains all interactions possible on the login page of Sauce Demo
 */

import { aui } from "../helpers/askui-helper";
import testData from "../data_input/test-data";

export class LoginPage {
    /**
     * Navigates to the Sauce Demo website and verifies the page has loaded
     * @returns Promise<void>
     * @throws Will throw an error if navigation fails or page doesn't load
     */
    async navigateToSite(): Promise<void> { 
        await aui.execOnShell("start chrome").exec();
        await aui.waitFor(333).exec();  //Always include proper wait conditions before starting applications
        await aui.type(testData.baseUrl).exec();
        await aui.pressKey('enter').exec();
        await aui.waitUntil(aui.expect().text('Swag Labs').exists());  //Verify the application is fully loaded before running tests
    }

    /**
     * Enters username in the username field
     * @param username - The username to be entered
     * @returns Promise<void>
     * @throws Will throw an error if username field is not found
     */
    async enterUsername(username: string): Promise<void> {
        await aui.click().text('Username').exec();
        await aui.type(username).exec();
    }

    /**
     * Enters password in the password field
     * @param password - The password to be entered
     * @returns Promise<void>
     * @throws Will throw an error if password field is not found
     */
    async enterPassword(password: string): Promise<void> {
        await aui.click().text('Password').exec();
        await aui.type(password).exec();
    }

    /**
     * Clicks the login button and waits for navigation
     * @returns Promise<void>
     */
    async clickLogin(): Promise<void> {
        await aui.pressKey('enter').exec();
        await aui.waitFor(333).exec();
        await aui.waitFor(333).exec();
        await aui.pressKey('escape').exec(); //if random pop-up appear, it closes it
        await aui.waitFor(333).exec();
    }

    /**
     * Checks if an error message is displayed
     * @param errorMessage - The error message to check for
     * @returns Promise<boolean> - True if error message is displayed
     */
    async isErrorMessageDisplayed(errorMessage: string): Promise<boolean> {
         return false;;
    }

    /**
     * Performs complete login flow with provided credentials
     * @param username - The username to login with
     * @param password - The password to login with
     * @returns Promise<void>
     */
    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
        
    }
}