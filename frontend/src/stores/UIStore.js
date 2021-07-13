import { EventEmitter } from "events";
import AppDispatcher from '../dispatchers/main';
import UIConstants from '../constants';

let _store = {
    menuVisible: false,
    navItems: [
        {
            title: 'Home',
            to: '/',
            htmlBefore: '',
            htmlAfter: ''
        },
        {
            title: 'Transactions',
            to: '/404',
            htmlBefore: '',
            htmlAfter: ''
        }
    ]
};

class UIStore extends EventEmitter {
    constructor() {
        super();

        this.registerToActions = this.registerToActions.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);

        AppDispatcher.register(this.registerToActions.bind(this));
    }

    registerToActions({ actionType, payload }) {
        switch (actionType) {
          case UIConstants.TOGGLE_SIDEBAR:
            this.toggleSidebar();
            break;
          default:
        }
    }
    
    toggleSidebar() {
        _store.menuVisible = !_store.menuVisible;
        this.emit(UIConstants.CHANGE);
    }
    
    getMenuState() {
        return _store.menuVisible;
    }
    
    getSidebarItems() {
        return _store.navItems;
    }
    
    addChangeListener(callback) {
        this.on(UIConstants.CHANGE, callback);
    }
    
    removeChangeListener(callback) {
        this.removeListener(UIConstants.CHANGE, callback);
    }
    
}

export default new UIStore(AppDispatcher);
