import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Blog {
    title: string,
    content: string,
    author: {
        name: string
    }
}

export const useBlogs = () => {

    const [data, setData] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                setLoading(false);
                const data = response.data.blogs;
                setData(data);

            } catch (error) {
                setLoading(true);
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return {
        data, loading
    }
}