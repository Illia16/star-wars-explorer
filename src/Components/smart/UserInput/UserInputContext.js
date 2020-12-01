import React, { useState, createContext, useContext } from 'react';

const UserInputContext = createContext();

export const useInput = () => {
    return useContext(UserInputContext);
};

// UserInputProvider functional
export default function UserInputProvider({ children }){
    // saving the corresponding results from API call
    const [searchQuery, setInput] = useState(null);
    const [currentPageRes, changePage] = useState(1);


    const userChoice = (e) => {
        setInput(e.target.name);
    };
    
    const searchQueryReset = () => {
        setInput(null);
        changePage(1);
    };

    return(
        <UserInputContext.Provider value={{
            searchQuery: searchQuery,
            setInput: setInput,

            currentPageRes: currentPageRes,
            changePage: changePage,

            userChoice: userChoice,

            searchQueryReset: searchQueryReset,
        }}>
            { children }
        </UserInputContext.Provider>
    )
};