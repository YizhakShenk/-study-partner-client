import React, { useState } from "react";
import Register from "./Register";
import LogIn from "./LogIn";
import ForgetPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

export default function Auth({ handleCloseLogIn, openLogIn }) {

  const [authMode, setAuthMode] = useState(0);
  const [alertMessage, setAlertMessage] = useState('')
  const [opanAlert, setOpanAlert] = useState(false);
  const [alertMode, setAlertMode] = useState('')

  const handleOpenAlert = (alertStatus, message) => {
    setAlertMode(alertStatus);
    setAlertMessage(message)
    setOpanAlert(true);
    setTimeout(() => {
      setOpanAlert(false);
    }, 3500)
  }

  const handleCloseAlert = () => {
    setOpanAlert(false);
  }
  const handleAuthMode = (numOfMode) => {
    setAuthMode(numOfMode)
  }

  return (
    <Box >
      <Dialog
        open={openLogIn}
        onClose={handleCloseLogIn}
        aria-describedby="auth"
      >
       <Box>
        <DialogTitle>
          <Box sx={{ position: 'relative' }}>
            {opanAlert ? <Alert onClose={handleCloseAlert} sx={{ position: 'absolute', width: '100%' }} severity={alertMode}>{alertMessage}</Alert> : null}
          </Box>
          {authMode > 0 && <ArrowBackOutlinedIcon onClick={() => handleAuthMode(0)} />}
          {!opanAlert && <IconButton
            onClick={handleCloseLogIn}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>}
        </DialogTitle>

        <DialogContent >
          {authMode === 1 ? <Register handleAuthMode={handleAuthMode} handleOpenAlert={handleOpenAlert} />
            : authMode === 2 ? <ForgetPassword handleAuthMode={handleAuthMode} handleOpenAlert={handleOpenAlert} />
              : authMode === 3 ? <ResetPassword handleAuthMode={handleAuthMode} handleOpenAlert={handleOpenAlert} />
                : <LogIn handleAuthMode={handleAuthMode} handleCloseLogIn={handleCloseLogIn} handleOpenAlert={handleOpenAlert} />
          }
        </DialogContent>
        </Box> 
      </Dialog>
    </Box>
  );
}
