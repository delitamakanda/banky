import { ReduceStore } from 'flux/utils';
import BankBalanceStore from './BankBalanceStore';
import AppDispatcher from '../dispatchers/main';
// import BankConstants from '../constants';


//const CHANGE_EVENT = 'change';
//let __emitter = new EventEmitter();
//let balance = 0;

class BankRewardStore extends ReduceStore {

    getInitialState() {
        return 'Basic';
    }

    reduce(state, action) {
        this.getDispatcher().waitFor([
            BankBalanceStore.getDispatchToken()
        ]);
        // if (action.type === BankConstants.DEPOSITED_INTO_ACCOUNT || action.type === BankConstants.WITHDREW_FROM_ACCOUNT) {
            let balance = BankBalanceStore.getState();
            if (balance < 5000)
                return 'Basic';
            else if (balance < 10000)
                return 'Silver';
            else if (balance < 50000)
                return 'Gold';
            else
                return 'Platinum';
        // }
        // return state;
    }
}

export default new BankRewardStore(AppDispatcher);
