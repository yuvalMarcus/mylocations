import { v4 as uuidv4 } from 'uuid';
import * as actionTypes from './actions';

const initialState = {
    categories: [],
    category: null
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case (actionTypes.SET_CATEGORY):
            return {
                ...state,
                categoryId: action.id
            }
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
            const newCategories = [...state.categories].map(cat => {
                if(cat.id === action.id) {
                    return {
                        ...cat,
                        name: action.payload.name
                    }
                }
                return cat;
            });
            return {
                ...state,
                categories: newCategories
            };
        case (actionTypes.REMOVE_CATEGORY):
            return {
                ...state,
                categories: state.categories.filter(cat => cat.id !== action.id),
                categoryId: null
            };
    }

  return state;
};

export default reducer;