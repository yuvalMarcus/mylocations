import * as actionTypes from './actions';

const initialState = {
    categories: [
        {id: 1, name: "name", time: 15, immediacy: 0, description: "description", check: false},
        {id: 2, name: "name2", time: 60, immediacy: 1, description: "description", check: true},
        {id: 3, name: "name3", time: 30, immediacy: 2, description: "description", check: true},
        {id: 4, name: "name4", time: 30, immediacy: 1, description: "description", check: false},
        {id: 5, name: "name5", time: 10, immediacy: 0, description: "description", check: false}
    ]
};

const reducer = (state = initialState, action) => {

  return state;
};

export default reducer;