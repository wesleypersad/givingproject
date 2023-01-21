import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useContext } from "react";
import DataContext from "../context/DataContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsloading] = useState(null);
    const { dispatch } = useAuthContext();

    // get the user path from  the data context
    const { SERVER_URL } = useContext(DataContext);

    const signup = async (username, password, email) => {
        setIsloading(true);
        setError(null);

        const response = await fetch(`${SERVER_URL}/user/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password, email})
        });

        const json = await response.json();

        if (!response.ok) {
            setIsloading(false);
            setError(json.error);
        } else {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // update the auth context
            dispatch({type: 'LOGIN', payload: json});

            setIsloading(false);
        }
    }

    return { signup, isLoading, error };
}