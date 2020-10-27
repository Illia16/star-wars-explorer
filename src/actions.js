import { CHANGE_SEARCH_QUERY, CHANGE_SEARCH_PAGE, CHANGE_LOADING_STATUS } from './constants'

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

export const setLoading = (loadingStatus) => {
    return {
        type: CHANGE_LOADING_STATUS,
        payload: loadingStatus,
    }
}