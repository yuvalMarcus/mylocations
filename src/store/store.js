import {createStore, combineReducers} from "redux";
import categoryReducer from './reducers/categoryReducer';
import locationReducer from './reducers/locationReducer';

function saveLocalStorage(state) {
    try {
        const myLocationsState = JSON.stringify(state);
        localStorage.setItem("myLocationsState", myLocationsState);
    } catch (e) {
        console.log('error');
    }
}

function loadLocalStorage() {
    try {
        const myLocationsState = localStorage.getItem("myLocationsState");
        if (myLocationsState === null) return undefined;
        return JSON.parse(myLocationsState);
    } catch (e) {
        return undefined;
    }
}

const rootReducer = combineReducers({
    categories: categoryReducer,
    locations: locationReducer
});

const store = createStore(rootReducer, loadLocalStorage());

store.subscribe(() => saveLocalStorage(store.getState()));

export default store;