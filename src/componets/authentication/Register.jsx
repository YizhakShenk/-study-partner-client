import React, { useState } from "react";
import axios from "axios";
import {
  nameValid,
  emailValid,
  passwordValid,
  countryValid,
  languagesValid,
  phone_numberValid,
  ageValid,
} from "../../utilities/validetion/validetion.js";
import { Box, Typography, TextField, Button, } from "@mui/material";

export default function Register({ handleOpenAlert,handleAuthMode }) {
  const urlServer= process.env.REACT_APP_URL_SERVER

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [languages, setLanguages] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [age, setAge] = useState("");

  const submit = async () => {

    if (!name || !email || !password || !confirmPassword || !country) {
      handleOpenAlert('error', 'Please fill all the require fields');
    }
    else if (!nameValid(name)) {
      handleOpenAlert('error', 'name not valid');
    } else if (!emailValid(email)) {
      handleOpenAlert('error', 'email not valid');
    } else if (!passwordValid(password)) {
      handleOpenAlert('error', 'password  not valid');
    } else if (password !== confirmPassword) {
      handleOpenAlert('error', 'confirm password not match"');
    } else if (country && !countryValid(country)) {
      handleOpenAlert('error', 'country is not valid');
    } else if (!languagesValid(languages)) {
      handleOpenAlert('error', 'languages not valid');
    } else if (phone_number && !phone_numberValid(phone_number)) {
      handleOpenAlert('error', 'phone number not valid');
    }
    else if (age && !ageValid(age)) {
      handleOpenAlert('error', 'age not valid');
    }
    else {
      try {
        await axios.post(urlServer + "/user/register", {
          name,
          email,
          password,
          confirmPassword,
          country,
          languages,
          phone_number,
          age,
        });
        handleOpenAlert('success', 'User created successfully');
        setTimeout(() => {
          handleAuthMode(0)
        }, 2000);
      } catch (err) {
        console.log(err);
        handleOpenAlert('error', 'Register faild');
      }
    }
  };
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box >
        <Typography variant="h5" m={2} >
          Sign up
        </Typography>
      </Box>
      <Box  >
        <TextField
          sx={{ m: 1 }}
          required
          id="name"
          label="Name"
          name="name"
          type="text"
          autoComplete="name"
          autoFocus
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          sx={{ m: 1 }}
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
          sx={{ m: 1 }}
          required
          id="password"
          name="password"
          type="password"
          placeholder="password(a12345678)"
          label="Password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        
        <TextField
          sx={{ m: 1 }}
          required
          id="confirm_password"
          name="confirm_password"
          type="password"
          label="Confirm Password"
          autoComplete="current-Password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <Box sx={{textAlign: "left" ,ml:6}}>
      <Typography variant="caption" >
      * required 8 characters that includes numbers and letters
        </Typography>
      </Box>
        <TextField
          sx={{ m: 1 }}
          label="Country"
          name="country"
          type="text"
          autoComplete="current-country"
          autoFocus
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        />
        <TextField
          sx={{ m: 1 }}
          id="languages"
          label="Languages"
          name="languages"
          type="text"
          autoComplete="languages"
          autoFocus
          value={languages}
          onChange={(event) => setLanguages(event.target.value)}
        />
        <TextField
          required
          sx={{ m: 1 }}
          id="phone"
          label="phone number"
          name="phone"
          type="text"
          autoComplete="phone"
          autoFocus
          value={phone_number}
          onChange={(event) => setPhone_number(event.target.value)}
        />
        <TextField
          sx={{ m: 1 }}
          id="age"
          label="Age"
          name="age"
          type="number"
          autoComplete="age"
          autoFocus
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />

      </Box>
      
          
      <Box>
        <Button
          color="success"
          variant="contained"
          type="submit"
          sx={{ m: 2 ,width:'80%' }}
          onClick={submit}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}