import { User } from "@/interface";
import { Backend_URL } from "@/lib/constants";

export const fetchUsers = async (): Promise<User[]> => {
    try {
        const res = await fetch(Backend_URL + '/user');
        const data = await res.json();

        if (Array.isArray(data)) {
            return data as User[];
        } else {
            console.error('Data received is not an array:', data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};