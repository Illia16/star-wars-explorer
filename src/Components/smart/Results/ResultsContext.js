import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

import { useInput } from '../UserInput/UserInputContext'
import { useLoading } from '../Loading/LoadingContext'
import { useError } from '../Error/ErrorContext'

const ResultsContext = createContext();

export const useResults = () => {
    return useContext(ResultsContext);
};

export default function ResultsProvider({ children }){
    const { searchQuery, setInput, currentPageRes, changePage, userChoice, searchQueryReset } = useInput();
    const { isLoading, setLoading } = useLoading();
    const { errorMsg, setErrorMsg } = useError();

    const [results, getData] = useState({people: null, films: null, planets: null});

    useEffect(() => {
        if (searchQuery) {
            setLoading(true)
            axios({
                url: `https://swapi.dev/api/${searchQuery}`,
                method: 'GET',
                params: {
                    page: currentPageRes,
                }
            })
                .then((res) => {
                    getData({ ...results, [searchQuery]: res.data })
                    setLoading(false)
                })
                .catch(error => {
                    // saving error msg from API in state for further use     
                    error.response ? setErrorMsg(error.response.data.detail) : setErrorMsg('Bad URL');
                    setLoading(false)
                })
        };
    }, [searchQuery, currentPageRes]);

    return(
        <ResultsContext.Provider value={{
            results: results,
            getData: getData,
        }}>
            { children }
        </ResultsContext.Provider>
    )
};