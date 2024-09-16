import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Blog {
    id: string;
    title: string;
    content: string;
    publishedAt: string;
    author: {
        name: string
    },
    name: string
}
export const useSearchBlog = ({ id }: { id: string }) => {
    const [data, setData] = useState<Blog>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,
                    {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    });
                setLoading(false);
                console.log(response.data.blog);

                setData(response.data.blog);
            } catch (err) {
                setLoading(true)
                console.log(err);
            }
        }
        fetchData();
    }, [])

    return { data, loading };
}

export const useFetchBlogs = () => {
    const [data, setData] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk?filter=${filter}`, {
                    // params: { filter },
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                setLoading(false);
                setData(response.data.blogs);

            } catch (err) {
                setLoading(false);
                setError("Failed to fetch blogs");
                console.error(err);
            }
        };

        fetchData();
    }, [filter]);

    return {setFilter, data, loading, error };
};

interface Profile {
    name: string;
    email: string;
    blog: Blog[];
}
export const useProfile = (): { data: Profile | null; loading: boolean } => {
    const [data, setData] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
                    headers: {
                        Authorization: localStorage.getItem("token") || "",
                    },
                });
                setLoading(false);
                const userData = response.data.user;
                setData(userData);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    return { data, loading };
};


export const useDelete = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [isDeleted, setIsDeleted] = useState(false);

    const deleteBlog = async (id: string) => {
        setLoading(true);
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/blog/delete`, {
                headers: {
                    Authorization: localStorage.getItem("token") || "",
                },
                data: {
                    id,
                },
            });
            setLoading(false);
            setIsDeleted(true);
            console.log("Blog deleted successfully!");
            window.location.reload();
        } catch (err) {
            setLoading(false);
            setError("Failed to delete the blog.");
            console.log(err);
        }
    };

    return { deleteBlog, loading, error, isDeleted };
};