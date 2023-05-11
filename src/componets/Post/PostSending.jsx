import React from "react";
import {
  DialogContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material/";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";

export default function PostSending({ emailSent }) {
  
  return (
    <Box>
      <DialogContent>
        {emailSent === 0 ?
          <Box sx={{ textAlign: 'center' }}>
            <Box>
              <Typography variant="h5">
                Sending email to your partner
              </Typography>
            </Box>
            <Box>
              <CircularProgress />
            </Box>
          </Box>
          : emailSent === -1 ?
            <Box sx={{textAlign: 'center'}}>
              <Box>
                <Typography variant="h5">
                  Sending email failed.. please try later 
                </Typography>
              </Box>
              <Box>
                <ErrorOutlinedIcon color="error" fontSize="large"/>
              </Box>
            </Box> :
            emailSent ===1 && (
              <Box sx={{ textAlign: 'center'}}>
                <Box>
                  <Typography variant="h5">
                  </Typography>
                    Email sent to the partner.  good luck..
                </Box>
                <Box>
                  <MarkEmailReadOutlinedIcon color="success" fontSize="large" />
                </Box>
              </Box>
            )}
      </DialogContent>
    </Box>
  );
}