import { createStore } from "redux";
import reducer from './reducer';

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

const store = createStore(reducer, loadLocalStorage());

store.subscribe(() => saveLocalStorage(store.getState()));

export default store;