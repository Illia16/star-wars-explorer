import { CHANGE_SEARCH_QUERY } from './constants'
import { CHANGE_SEARCH_PAGE } from './constants';

export const setUserChoice = (searchQuery) => {
    console.log(searchQuery);
    return {
        type: CHANGE_SEARCH_QUERY,
        payload: searchQuery,
    }
}

export const setSearchPage = (page) => {
    return {
        type: CHANGE_SEARCH_PAGE,
        payload: page,
    }
}