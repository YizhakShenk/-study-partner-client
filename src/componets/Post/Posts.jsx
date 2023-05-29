import React, { useState, useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PostCard from "./PostCard";
import Filters from "../filters/Filters";
import PostsContext from "../../context/PostsContext";
import { Box, Grid, CircularProgress, Typography, Button } from "@mui/material";
const urlServer = process.env.REACT_APP_URL_SERVER;

export default function Posts() {
  const [paramseS] = useSearchParams();
  const postid = paramseS.get("pid");
  const [postId, setPostId] = useState(postid);
  const [rendering, setRendering] = useState(false);
  const { posts, setPosts } = useContext(PostsContext);
  const navigae = useNavigate();

  const handleHomePage = () => {
    navigae("/");
  };
  const handleRendering = () => {
    setRendering(!rendering);
  };

  useEffect(() => {
    (async () => {
      try {
        let postsList;
        if (postId) {
          postsList = [
            await (
              await axios.post(`${urlServer}/post/get-one`, { id: postId })
            ).data,
          ];
          setPosts(postsList);
          // console.log('postsList: ', postsList);
        } else {
          postsList = await (await axios.get(`${urlServer}/post/get-all`)).data;

          if (!postsList) {
            throw new Error("posts not dound");
          } else {
            setPosts(postsList);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [rendering, setPosts, postId]);

  return (
    <Box alignItems="center">
      {posts ? (
        <Box>
          <Filters setPosts={setPosts} handleRendering={handleRendering} />
          <Grid container sx={{ placeContent: "center" }} spacing={1}>
            {posts?.length ? (
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
          {postId && (
            <Button sx={{marginBottom: 5}}
              variant="outlined"
              onClick={() => {
                setPostId(null);
                handleHomePage();
              }}
            >
              view all posts
            </Button>
          )}
        </Box>
      ) : (
        <Box sx={{ marginTop: "20%" }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
