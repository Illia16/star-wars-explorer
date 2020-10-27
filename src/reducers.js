import { CHANGE_SEARCH_QUERY, CHANGE_SEARCH_PAGE, CHANGE_LOADING_STATUS } from './constants';

const initialState = {
    searchQuery: '',
    page: 1,
    isLoading: false,
};

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

export const setLoading = (state = initialState, action = {}) => {
    switch(action.type) {
        case CHANGE_LOADING_STATUS:
            return Object.assign({}, state, { isLoading: !action.payload });
        default:
            return state;
    }
};