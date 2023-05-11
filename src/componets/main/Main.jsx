import React from "react";
import CreatePost from "../Post/CreatePost";
import CreatePostButton from "../Post/CreatePostButton";
// import PostsContext from "../../context/PostsContext";
import Posts from "../Post/Posts";
import { Box, Typography, } from "@mui/material";

export default function Main({ openCreatePost, setOpenCreatePost, editPost, setEditPost }) {
  return (
      <Box>
        <Box mt={3} mb={3}>
          <Typography variant="h5">Study Partner</Typography>
          <Typography variant="body1">Find partner to study common interests topics</Typography>
        </Box>
        <Box>
          <Posts />
        </Box>
        <CreatePostButton setOpenCreatePost={setOpenCreatePost} />
        {openCreatePost && <CreatePost open={openCreatePost} setOpen={setOpenCreatePost} editPost={editPost} setEditPost={setEditPost} />}
      </Box>
  );
}
