import AppDispatcher from '../AppDispatcher';
import BankConstants from '../constants';

let BankActions = {
    
    createAccount() {
        AppDispatcher.dispatch({
            type: BankConstants.CREATED_ACCOUNT,
            amount: 0
        });
    },

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
