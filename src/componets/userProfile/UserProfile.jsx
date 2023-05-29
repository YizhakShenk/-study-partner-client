import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import UserPosts from "./UserPosts";
import Rate from "./Rate";
import UserRates from "./UserRates";
import UserContext from "../../context/UserContext";

import {
  Paper,
  Box,
  Typography,
  CircularProgress,
  Grid,
  Divider,
} from "@mui/material";
const urlServer = process.env.REACT_APP_URL_SERVER;

export default function UserProfile() {
  const {
    state: { userId },
  } = useLocation();
  const [userData, setUserData] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const answer = await axios.post(`${urlServer}/user/get-one`, {
          id: userId,
        });
        setUserData(answer.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [userId, setUserData]);
  return (
    <Box>
      {userData ? (
        <Box>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container minHeight={300}>
              <Grid item xs={12} sm={12} md={3}>
                <Rate
                  user={user}
                  userData={userData}
                  setUserData={setUserData}
                />
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
                md={9}
                xs={12}
                sm={12}
              >
                <Box sx={{ m: 3 }}>
                  <Typography
                    sx={{ textDecoration: "underline" }}
                    color="primary"
                    variant="h3"
                  >
                    {userData.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                  }}
                >
                  <Paper
                    sx={{
                      display: "flex",
                      m: 3,
                      padding: 2,
                      flexDirection: "column",
                      alignItems: "flex-start",
                      minWidth: "130px",
                    }}
                  >
                    <Typography variant="caption">Age:</Typography>
                    <Typography sx={{}}>{userData.age}</Typography>
                  </Paper>
                  <Paper
                    sx={{
                      display: "flex",
                      m: 3,
                      padding: 2,
                      flexDirection: "column",
                      alignItems: "flex-start",
                      minWidth: "130px",
                    }}
                  >
                    <Typography variant="caption">Country:</Typography>
                    <Typography sx={{}}>{userData.country}</Typography>
                  </Paper>
                  <Paper
                    sx={{
                      display: "flex",
                      m: 3,
                      padding: 2,
                      flexDirection: "column",
                      alignItems: "flex-start",
                      minWidth: "130px",
                    }}
                  >
                    <Typography variant="caption">Languages Skill:</Typography>
                    <Typography sx={{}}>{userData.languages}</Typography>
                  </Paper>
                </Box>
                <Box sx={{ minWidth: "95%", m: 3 }}>
                  <Paper
                    sx={{
                      display: "flex",
                      padding: 2,
                      flexDirection: "column",
                      alignItems: "flex-start",
                      minWidth: "100%",
                    }}
                  >
                    <Typography variant="caption">About Me:</Typography>
                    <Typography>
                      {userData.about || "User hasn't added yet..."}
                    </Typography>
                  </Paper>
                </Box>
                <Box sx={{ minWidth: "96%", m: 2 }}>
                  <Paper
                    sx={{
                      m: 1,
                      alignItems: "flex-start",
                      display: "flex",
                      paddingTop: 2,
                      paddingLeft: 2,
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="caption">Subjects:</Typography>
                    {userData.subjects.length > 0 ? (
                      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        {userData.subjects &&
                          userData.subjects.map((item, index) => {
                            return (
                              <Paper key={index} sx={{ m: 3, padding: 2 }}>
                                <Typography align="center">
                                  {item.name}
                                </Typography>
                              </Paper>
                            );
                          })}
                      </Box>
                    ) : (
                      <Typography sx={{ pb: 2 }}>
                        User hasn't added yet...
                      </Typography>
                    )}
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box>{userData.posts && <UserPosts posts={userData.posts} />}</Box>
          <Divider />
          <Box>{userData.posts && <UserRates rates={userData.rates} />}</Box>
        </Box>
      ) : (
        <Box sx={{ marginTop: "20%" }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
