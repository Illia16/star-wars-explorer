import React, { useState, createContext, useContext } from 'react';

const ErrorContext = createContext();

export const useError = () => {
    return useContext(ErrorContext);
};

// UserInputProvider functional
export default function ErrorProvider({ children }){
    const [errorMsg, setErrorMsg] = useState(null);

    return(
        <ErrorContext.Provider value={{
            errorMsg: errorMsg,
            setErrorMsg: setErrorMsg,
        }}>
            { children }
        </ErrorContext.Provider>
    )
};