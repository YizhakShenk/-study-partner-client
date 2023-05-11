import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import Filters from "../filters/Filters";
import PostsContext from "../../context/PostsContext";
import {
  Box,
  Grid,
  CircularProgress,
  Typography,
} from "@mui/material";
const urlServer = process.env.REACT_APP_URL_SERVER

export default function Posts() {
  const [rendering, setRendering] = useState(false);
  const { posts, setPosts } = useContext(PostsContext)

  const handleRendering = () => {
    setRendering(!rendering);
  };

  useEffect(() => {
    (async () => {
      try {
        const postsList = await (
          await axios.get(`${urlServer}/post/get-all`)
        ).data;

        if (!postsList) {
          throw new Error("posts not dound");
        } else {
          setPosts(postsList);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [rendering, setPosts]);

  return (
    <Box alignItems="center">
      {posts ? (
        <Box>
          <Filters setPosts={setPosts} handleRendering={handleRendering} />
          <Grid container sx={{ placeContent: "center" }} spacing={1}>
            { posts?.length ? (
              posts.map((post, index) => {
                return (
                    <Grid item key={index}>
                      <PostCard post={post} />
                    </Grid>
                );
              })
            ) : (
              <Box sx={{ m: 3 }}>
                <Typography>No posts found.</Typography>
              </Box>
            )}
          </Grid>
        </Box>
      ) : (
        <Box sx={{ marginTop: "20%" }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
