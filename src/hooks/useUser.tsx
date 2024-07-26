import { useEffect, useState } from "react";

export default function useUser() {
    const [data, setData] = useState(null);

    const fetchData = async () => {
        const response = await fetch('/api/user');
        const data = await response.json();
        setData(data);
    }

    useEffect(() => {
        fetchData();
    }, [])
    
    return [data]
}