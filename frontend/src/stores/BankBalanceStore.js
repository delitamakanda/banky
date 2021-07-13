//import { EventEmitter } from 'fbemitter';
//import { Store } from 'flux/utils';
import { ReduceStore } from 'flux/utils';
import AppDispatcher from '../dispatchers/main';
import BankConstants from '../constants';
//const CHANGE_EVENT = 'change';
//let __emitter = new EventEmitter();
//let balance = 0;

class BankBalanceStore extends ReduceStore {

    getInitialState() {
        return 0;
    }

    reduce(state, action) {
        switch (action.type) {
            case BankConstants.CREATED_ACCOUNT_SUCCESS:
                return action.payload.response[0].balance;

            case BankConstants.WITHDREW_FROM_ACCOUNT:
                return state - action.payload.amount;


            case BankConstants.DEPOSITED_INTO_ACCOUNT:
                return state + action.payload.amount;

            default:
                return state;
        }
    }
}

export default new BankBalanceStore(AppDispatcher);
/*
let BankBalanceStore = {

    getState() {
        return balance;
    },

    addListener: (callback) => {
        return __emitter.addListener(CHANGE_EVENT, callback);
    },
};

BankBalanceStore.dispatchToken = AppDispatcher.register((action) => {
    switch (action.type) {
        case BankConstants.CREATED_ACCOUNT:
            balance = 0;
            __emitter.emit(CHANGE_EVENT);
            break;

        case BankConstants.WITHDREW_FROM_ACCOUNT:
            balance = balance - action.amount;
            __emitter.emit(CHANGE_EVENT);
            break;

        case BankConstants.DEPOSITED_INTO_ACCOUNT:
            balance = balance + action.amount;
            __emitter.emit(CHANGE_EVENT);
            break;
    }
})

export default BankBalanceStore;
*/
