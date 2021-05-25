import { v4 as uuidv4 } from 'uuid';
import * as actionTypes from '../actions';

const initialState = {
    items: [],
    itemId: null,
};

const categoryReducer = (state = initialState, action) => {

    switch (action.type) {
        case (actionTypes.SET_CATEGORY):
            return {
                ...state,
                itemId: action.id
            }
        case (actionTypes.ADD_CATEGORY):
            const category = {
                ...action.category,
                id: uuidv4()
            };
            return {
                ...state,
                items: state.items.concat(category)
            };
        case (actionTypes.EDIT_CATEGORY):
            const newCategories = [...state.items].map(cat => {
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
                items: newCategories
            };
        case (actionTypes.REMOVE_CATEGORY):
            return {
                ...state,
                items: state.items.filter(cat => cat.id !== action.id),
                itemId: null
            };
    }

  return state;
};

export default categoryReducer;