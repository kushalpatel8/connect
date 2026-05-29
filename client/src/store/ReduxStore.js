import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
} from "redux";
import { thunk } from "redux-thunk";
import { reducers } from "../reducers";

function saveTolocalStorage(store) {
    try{
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem('store', serializedStore);
    }
    catch(e) {
        console.log(e);
    }
}

function loadFromlocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem('store');
        if(serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    }
    catch(e) {
        console.log(e);
        return undefined;
    }
}

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const persistedStore = loadFromlocalStorage();
const store = createStore(reducers, persistedStore, composeEnhancers(applyMiddleware(thunk)));

store.subscribe(() => saveTolocalStorage(store.getState()));

export default store;