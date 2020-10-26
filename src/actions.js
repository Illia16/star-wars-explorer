import { CHANGE_SEARCH_QUERY, CHANGE_SEARCH_PAGE } from './constants'

export const setUserChoice = (searchQuery) => {
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