import {useState} from "react";

export const useFetching = (callback:(args?:any[]) => Promise<any> ):[(...args:any[]) => Promise<void>, boolean, string] => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetching = async (...args:any[]) => {
        try {
            setIsLoading(true);
            await callback(...args);
        } catch (e) {
            // @ts-ignore
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };
    return [fetching, isLoading, error];
};