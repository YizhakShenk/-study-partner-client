import React from "react";
import PostCard from "../Post/PostCard";
import { Box} from "@mui/material";

export default function UserPosts({ posts }) {
  
  return (
    <Box sx={{display:'flex',overflowX:'scroll' }}>
      {posts &&
        posts.map((post,index) => {
          return <PostCard key={index} post={post} />;
        })}
    </Box>
  );
}
