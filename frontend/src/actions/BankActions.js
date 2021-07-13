import AppDispatcher from '../dispatchers/main';
import BankConstants from '../constants';
import BankApi from '../api/BankApi';

let BankActions = {

    /**
     * @param {number} amount to whithdraw
     */

    depositIntoAccount(amount) {
        AppDispatcher.dispatchAsync(BankApi.deposit(amount), {
            type: BankConstants.DEPOSITED_INTO_ACCOUNT,
            amount: amount
        });
    },

    /**
     * @param {number} amount to whithdraw
     */

    withdrawFromAccount(amount) {
        AppDispatcher.dispatchAsync(BankApi.withdraw(amount), {
            type: BankConstants.WITHDREW_FROM_ACCOUNT,
            amount: amount
        });
    },
};

export default BankActions;
