import axios from "axios";
import { useState } from "react";
import { emailValid } from '../../utilities/validetion/validetion.js';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function ForgetPassword({ handleAuthMode,handleOpenAlert }) {
  const [email, setEmail] = useState('');
  const urlServer= process.env.REACT_APP_URL_SERVER
  const submit = async () => {
    if (!email || !emailValid(email)) {
      handleOpenAlert('error','please add an valid email');
    }
    else {
      try {
        const answer = await axios.post(urlServer + '/auth/forget-pass', { email })
        console.log(answer);
        if(answer.message){
          throw new Error('Faild to reset password')
        }
        handleOpenAlert('success','Password reset. please check your Email');
        handleAuthMode(3);
      }
      catch (err) {
        console.error(err)
        handleOpenAlert('error','Faild to reset password');
      }
    }
  }

  return (
    <Box >      
      <Box>
        <Typography variant="h5" align="center">
          Reset Password
        </Typography>
        <Typography variant="h6" align="center">
          please enter your email address
          we will send you a temporary password to ypur Email inbox
        </Typography>
      </Box>
      <Box
        sx={{
          // width: 300,
          mx: 'auto', // margin left & right
          my: 4, // margin top & botom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'xl',
        }}
      // variant="outlined"
      >
        <TextField
          required
          variant='standard'
          id='email'
          label="Email address"
          name="email"
          type="email"
          autoComplete='email'
          autoFocus
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button
        variant="outlined"
          type="submit"
          sx={{ mt: 1 }}
          onClick={submit}
        >
          Reset
        </Button>
      </Box>
    </Box>
  )
}
