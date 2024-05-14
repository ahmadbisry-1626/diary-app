"use client"


import { fetchPosts } from '@/actions/post'
import { Post } from '@/interface'
import React, { useEffect, useState } from 'react'

interface PostProps {
    params: {
        id: string
    }
}

const page = ({ params }: PostProps) => {
    const { id } = params
    const [post, setPost] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPostList = async () => {
            const postData = await fetchPosts()
            setPost(postData)
        }

        fetchPostList()
    }, [])

    return (
        <div className='min-h-screen flex justify-center items-center'>
            {post.filter((post) => post.id === id).map((post) => (
                <div key={post.id}>
                    <h1 className='text-3xl'>{post.title}</h1>
                    <h1 className='text-xl'>{post.postBody}</h1>
                </div>
            ))}
        </div>
    )
}

export default page