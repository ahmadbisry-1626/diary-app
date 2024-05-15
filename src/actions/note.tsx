import { Note } from "@/interface";
import { Backend_URL } from "@/lib/constants";


export const fetchNotes = async (): Promise<Note[]> => {
    try {
        const res = await fetch(Backend_URL + "/note")
        const data = await res.json()

        if (Array.isArray(data)) {
            return data as Note[]
        } else {
            console.error('Data received is not an array:', data)
            return []
        }
    } catch (err: unknown) {
        console.error('Error fetching posts:', err);
        return []
    }
}

export const deleteNote = async (id: string) => {
    try {
        const res = await fetch(Backend_URL + `/note/${id}`, {
            method: "DELETE"
        })

        return res.json()
    } catch (err: unknown) {
        console.error('Error deleting note:', err)
    }
}