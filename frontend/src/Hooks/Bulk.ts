import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Blog {
    id: string,
    title: string,
    content: string,
    author: {
        name: string
    }
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
                console.log(response);

                setLoading(false);
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

interface Blog {
    title: string;
    content: string;
}

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

// export const useDelete = ({ id }: { id: string }) => {
//     const [loading, setLoading] = useState(false);
//     const [data, setData] = useState();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`${BACKEND_URL}/api/v1/blog/deleteblog/${id}`,
//                     {
//                         headers: {
//                             Authorization: localStorage.getItem("token")
//                         }
//                     });
//                 console.log(response);

//                 setLoading(true);
//                 setData(response.data.blog);
//             } catch (err) {
//                 setLoading(false)
//                 console.log(err);
//             }
//         }
//         fetchData();
//     }, [])

//     return { data, loading };
// }