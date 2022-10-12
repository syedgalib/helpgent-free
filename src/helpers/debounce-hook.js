import { useEffect, useState } from "react";

export const useDebounce = (item, delay)=>{
    // State and setters for debounced value
    const [searchItem, setSearchItem] = useState(item);
    useEffect(() => {

        const timeoutHandler = setTimeout(() => {
            setSearchItem(item);
        }, delay);

        return () => {
            clearTimeout(timeoutHandler);
        };

    }, [item, delay]);

    return searchItem
}