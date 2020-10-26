import { CHANGE_SEARCH_QUERY, CHANGE_SEARCH_PAGE } from './constants';

const initialState = {
    searchQuery: '',
    page: 1,
}

export const setSearchQuery = (state = initialState, action = {}) => {
    switch(action.type) {
        case CHANGE_SEARCH_QUERY:
            return Object.assign({}, state, { searchQuery: action.payload });
        default:
            return state;
    }
};

export const setPage = (state = initialState, action = {}) => {
    switch(action.type) {
        case CHANGE_SEARCH_PAGE:
            return Object.assign({}, state, { page: action.payload });
        default:
            return state;
    }
};