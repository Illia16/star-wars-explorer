import React, { useState, createContext, useContext } from 'react';

const LoadingContext = createContext();

export const useLoading = () => {
    return useContext(LoadingContext);
};

// UserInputProvider functional
export default function LoadingProvider({ children }){
    const [isLoading, setLoading] = useState(false);

    return(
        <LoadingContext.Provider value={{
            isLoading: isLoading,
            setLoading: setLoading,
        }}>
            { children }
        </LoadingContext.Provider>
    )
};