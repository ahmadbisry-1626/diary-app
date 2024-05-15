export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface Post {
    id: string;
    title: string;
    postBody: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Note {
    id: string;
    noteBody: string;
    userId: string;
    postId: string;
    createdAt: Date
}