import AppDispatcher from '../dispatchers/main';
import BankConstants from '../constants';
import BankApi from '../api/BankApi';

let BankActions = {

    /**
     * @param {number} amount to whithdraw
     */

    deposit(amount) {
        AppDispatcher.dispatchAsync(BankApi.deposit(amount), {
            request: BankConstants.DEPOSITED_INTO_ACCOUNT,
            success: BankConstants.DEPOSITED_INTO_ACCOUNT_SUCCESS,
            failure: BankConstants.DEPOSITED_INTO_ACCOUNT_ERROR
        }, { amount });
    },

    depositIntoAccount(amount) {
        AppDispatcher.dispatch({
            type: BankConstants.DEPOSITED_INTO_ACCOUNT,
            amount: amount
        });
    },

    /**
     * @param {number} amount to whithdraw
     */

    withdraw(amount) {
        AppDispatcher.dispatchAsync(BankApi.withdraw(amount), {
            request: BankConstants.WITHDREW_FROM_ACCOUNT,
            success: BankConstants.WITHDREW_FROM_ACCOUNT_SUCCESS,
            failure: BankConstants.WITHDREW_FROM_ACCOUNT_ERROR
        }, { amount });
    },

    withdrawFromAccount(amount) {
        AppDispatcher.dispatch({
            type: BankConstants.WITHDREW_FROM_ACCOUNT,
            amount: amount
        });
    },
};

export default BankActions;
