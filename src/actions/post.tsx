import { Post } from "@/interface";
import { Backend_URL } from "@/lib/constants";

export const fetchPosts = async (): Promise<Post[]> => {
    try {
        const res = await fetch(Backend_URL + "/post");
        const data = await res.json()

        if (Array.isArray(data)) {
            return data as Post[];
        } else {
            console.error('Data received is not an array:', data);
            return [];
        }

    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export const deletePost = async (id: string) => {
    try {
        const res = await fetch(Backend_URL + `/post/${id}`, {
            method: 'DELETE'
        })

        return res.json()
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}