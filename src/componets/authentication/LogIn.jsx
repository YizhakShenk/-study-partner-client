import axios from "axios";
import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import UserDetailsContext from "../../context/UserDetailsContext";
import UserSubjectsContext from "../../context/UserSubjectsContext";
import UserPostsContext from "../../context/UserPostsContext";
import NotificationsContext from "../../context/NotificationsContext";
import { emailValid, passwordValid } from "../../utilities/validetion/validetion.js";
import { Box, Typography, TextField, Button, Link } from "@mui/material";

export default function Login({ handleAuthMode, handleCloseLogIn, handleOpenAlert }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const { setUserDetails } = useContext(UserDetailsContext);
  const { setUserSubjects } = useContext(UserSubjectsContext);
  const { setUserPosts } = useContext(UserPostsContext);
  const { setUserNotifications } = useContext(NotificationsContext);
  const urlServer = process.env.REACT_APP_URL_SERVER

  const submit = async () => {
    if (!email || !password) {
      handleOpenAlert('error', 'Missing Details');
    }
    else if (!emailValid(email)) {
      handleOpenAlert('error', 'Email is not valid!');
    } else if (!passwordValid(password)) {
      handleOpenAlert('error', 'Password is not valid!');
    } else {
      try {
        const answer = await axios.post(
          urlServer + "/auth/log-in",
          { email, password },
          { withCredentials: true }
        );
        sessionStorage.setItem("user", JSON.stringify(answer.data));
        sessionStorage.setItem("user_id", JSON.stringify(answer.data.id));
        const details = {
          name: answer.data.name,
          age: answer.data.age,
          email: answer.data.email,
          phone_number: answer.data.phone_number,
          country: answer.data.country,
          languages: answer.data.languages,
          about: answer.data.about,
        }
        setUser({id:answer.data.id});
        setUserDetails(details);
        setUserSubjects(answer.data.subjects);
        setUserPosts(answer.data.posts);
        setUserNotifications(answer.data.notifications);
        handleOpenAlert('success', 'Welcome! and good luck finding a partner');
        setTimeout(() => {
          handleCloseLogIn();
        }, 2000);
      }
      catch (err) {
        handleOpenAlert('error', 'Login Faild!');
        console.log(err);
      }
    }
  };
  return (
    <Box
      m={2}

      sx={{
        width: {
          xs: 240,
          sm: 285,
          md: 400,
        },
        display: "flex",
        flexDirection: "column",
        gap: 5,
        borderRadius: "sm",
        boxShadow: "xl",
      }}
    >
      <Box>
        <Typography variant="h5" align="center">
          Log in
        </Typography>
      </Box>
      <TextField
        variant='standard'
        required
        id="email"
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        variant='standard'
        required
        id="password"
        name="password"
        type="password"
        label="Password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Link
        underline="hover"
        onClick={() => {
          handleAuthMode(2);
        }}
      >
        forgt password?
      </Link>
      <Button color="success" variant="contained" type="submit" sx={{ width: '100%', }} onClick={submit}>
        Log in
      </Button>
      <Button variant="contained" type="submit" sx={{ mb: 2, width: '100%', }} onClick={() => { handleAuthMode(1) }}>
        Sign Up
      </Button>
    </Box>
  );
}