import { v4 as uuidv4 } from 'uuid';
import * as actionTypes from '../actions';

const initialState = {
    items: [],
    itemId: null,
    sort: '',
    filter: {
        category: ''
    },
    view: {
        groupBy: false
    }
};

const locationReducer = (state = initialState, action) => {

    switch (action.type) {
        case (actionTypes.SET_LOCATION):
            return {
                ...state,
                itemId: action.id
            }
        case (actionTypes.ADD_LOCATION):
            const location = {
                ...action.location,
                id: uuidv4()
            };
            return {
                ...state,
                items: state.items.concat(location)
            };
        case (actionTypes.EDIT_LOCATION):
            const newLocations = [...state.items].map(loc => {
                if(loc.id === action.id) {
                    return {
                        ...loc,
                        name: action.payload.name,
                        address: action.payload.address,
                        coordinates: action.payload.coordinates,
                        category: action.payload.category
                    }
                }
                return loc;
            });
            return {
                ...state,
                items: newLocations
            };
        case (actionTypes.REMOVE_LOCATION):
            return {
                ...state,
                items: state.items.filter(cat => cat.id !== action.id),
                itemId: null
            };
        case (actionTypes.LOCATIONS_SORT):
            return {
                ...state,
                sort: action.sort
            };
        case (actionTypes.LOCATIONS_FILTER_BY_CATEGORY):
            return {
                ...state,
                filter: {
                    ...state.filter,
                    category: action.category
                }
            };
        case (actionTypes.LOCATIONS_VIEW_GROUP_BY):
            return {
                ...state,
                view: {
                    ...state.view,
                    groupBy: action.groupBy
                }
            };
    }

  return state;
};

export default locationReducer;