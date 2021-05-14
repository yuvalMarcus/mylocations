import { v4 as uuidv4 } from 'uuid';
import * as actionTypes from './actions';

const initialState = {
    categories: [],
    alerts: []
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case (actionTypes.ADD_CATEGORY):
            const category = {
                ...action.category,
                id: uuidv4()
            };
            const addAlert = {
                id: uuidv4(),
                text: action.alert
            };
            return {
                ...state,
                categories: state.categories.concat(category),
                alerts: [addAlert]
            };
        case (actionTypes.EDIT_CATEGORY):
            const index = state.categories.findIndex(cat => cat.id === action.id);
            const newCategories = [...state.categories];
            newCategories[index] = {
                ...state.categories[index],
                name: action.payload.name
            }
            const editAlert = {
                id: uuidv4(),
                text: action.alert
            };
            return {
                ...state,
                categories: newCategories,
                alerts: [editAlert]
            };
        case (actionTypes.REMOVE_CATEGORY):
            const deleteAlert = {
                id: uuidv4(),
                text: action.alert
            };
            return {
                ...state,
                categories: state.categories.filter(cat => cat.id !== action.id),
                alerts: [deleteAlert]
            };
        case (actionTypes.REMOVE_ALERT):
            return {
                ...state,
                alerts: state.alerts.filter(alert => alert.id !== action.id)
            };
    }

  return state;
};

export default reducer;