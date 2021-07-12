import AppDispatcher from '../dispatchers/main';
import AccountActionsConstants from '../constants';
// import { throttle } from '../utils/misc';
import BankApi from '../api/BankApi';

export default {


    fetchAccountActions () {
        console.log('Account actions actions dispatches to Store');

        AppDispatcher.dispatchAsync(BankApi.getActionsAccount(), {
            request: AccountActionsConstants.CREATED_ACTIONS_ACCOUNT,
            success: AccountActionsConstants.CREATED_ACTIONS_ACCOUNT_SUCCESS,
            failure: AccountActionsConstants.CREATED_ACTIONS_ACCOUNT_ERROR
        });
    }
};

