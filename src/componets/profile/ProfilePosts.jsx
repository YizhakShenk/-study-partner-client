import React, { useContext } from 'react'
import UserPostsContext from '../../context/UserPostsContext';
import PostCard from "../Post/PostCard";
import { Box } from "@mui/material";

export default function ProfilePosts() {

    const { userPosts } = useContext(UserPostsContext);

    return (
        <Box sx={{ display: 'flex', overflowX: 'scroll' }}>
            {userPosts?.map((post, index) => {
                return <PostCard key={index} post={post} />;
            })}
        </Box>
    )
}










