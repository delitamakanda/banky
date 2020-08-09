import AppDispatcher from '../dispatchers/main';
import BankConstants from '../constants';

let BankActions = {

    /**
     * @param {number} amount to whithdraw
     */

    depositIntoAccount(amount) {
        AppDispatcher.dispatch({
            type: BankConstants.DEPOSITED_INTO_ACCOUNT,
            amount: amount
        });
    },

    /**
     * @param {number} amount to whithdraw
     */

    withdrawFromAccount(amount) {
        AppDispatcher.dispatch({
            type: BankConstants.WITHDREW_FROM_ACCOUNT,
            amount: amount
        });
    },
};

export default BankActions;
