import { v4 as uuidv4 } from 'uuid';
import * as actionTypes from './actions';

const initialState = {
    categories: []
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case (actionTypes.ADD_CATEGORY):
            const category = {
                ...action.category,
                id: uuidv4()
            };
            return {
                ...state,
                categories: state.categories.concat(category)
            };
        case (actionTypes.EDIT_CATEGORY):
            const index = state.categories.findIndex(cat => cat.id === action.id);
            const newCategories = [...state.categories];
            newCategories[index] = {
                ...state.categories[index],
                name: action.payload.name
            }
            return {
                ...state,
                categories: newCategories
            };
        case (actionTypes.REMOVE_CATEGORY):
            return {
                ...state,
                categories: state.categories.filter(cat => cat.id !== action.id)
            };
    }

  return state;
};

export default reducer;