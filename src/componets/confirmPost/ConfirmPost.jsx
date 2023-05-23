import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserContext from "../../context/UserContext.js";
import {
  Box,
  Button,
  Alert,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material/";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const urlServer = process.env.REACT_APP_URL_SERVER;

export default function ConfirmPost({ setOpenLogIn }) {
  const [paramseS] = useSearchParams();
  const { user } = useContext(UserContext);
  const postid = paramseS.get("pid");
  const the_applicant_id = paramseS.get("aid");
  const day = paramseS.get("day");
  const [applicant, setApplicant] = useState();
  const [progressTrans, setProgressTrans] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const [opanAlert, setOpanAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("Email sent");
  const [alertMode, setAlertMode] = useState("error");

  useEffect(() => {
    (async () => {
      try {
        if (the_applicant_id !== undefined && the_applicant_id) {
          const temp = await axios.post(
            `${urlServer}/user/get-one`,
            { id: the_applicant_id },
            { withCredentials: true }
          );
          console.log(temp);
          setApplicant(temp.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [the_applicant_id, day, postid]);

  const handleOpenAlert = (alertStatus, message) => {
    setAlertMode(alertStatus);
    setAlertMessage(message);
    setOpanAlert(true);
    setTimeout(() => {
      setOpanAlert(false);
    }, 3500);
  };

  const handleCloseAlert = () => {
    setOpanAlert(false);
  };
  const authConnected = () => {
    if (!user) {
      setOpenLogIn(true);
      return true;
    }
    return false;
  };
  const handleNavigateToUserPage = () => {
    if (authConnected()) {
      return;
    }
    navigate("/user", { state: { userId: the_applicant_id } });
  };

  const confirm = async () => {
    if (authConnected()) {
      return;
    }
    try {
      if (!postid || !the_applicant_id || !day) {
        handleOpenAlert("error", "Error with loading details");
        return;
      }
      setProgressTrans(true);
      await axios.post(
        urlServer + "/activity/confirm-post",
        { applicantId: the_applicant_id, postId: postid, day },
        { withCredentials: true }
      );
      setProgressTrans(false);
      handleOpenAlert("success", "Email sent successful");
      setTimeout(() => {
        setEmailSent(true);
      }, 3500);
    } catch (err) {
      console.log(err);
      setProgressTrans(false);
      handleOpenAlert("error", "Somthing got wrong please try again");
    }
  };

  const deny = async () => {
    if (authConnected()) {
      return;
    }
    if (!postid || !the_applicant_id || !day) {
      handleOpenAlert("error", "Error with loading details");
      return;
    }
    try {
      setProgressTrans(true);
      await axios.post(
        urlServer + "/activity/deny-post",
        { applicantId: the_applicant_id, postId: postid },
        { withCredentials: true }
      );
      setProgressTrans(false);
      handleOpenAlert("success", "Email sent successful");
      setTimeout(() => {
        setEmailSent(true);
      }, 3500);
    } catch (err) {
      console.log(err);
      setProgressTrans(false);
      handleOpenAlert("error", "Somthing got wrong please try again");
    }
  };

  return (
    <Box sx={{ m: 4, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ Width: "90%", position: "relative" }}>
        {opanAlert && (
          <Alert
            onClose={handleCloseAlert}
            severity={alertMode}
            sx={{ width: "100%", position: "absolute" }}
          >
            {alertMessage}
          </Alert>
        )}
        {!emailSent ? (
          <Box>
            {progressTrans && (
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress size={70} />
              </Box>
            )}
            <Box sx={{ opacity: progressTrans ? "0.2" : "1" }}>
              {applicant && (
                <Box m={2}>
                  <Typography variant="h4">
                    {applicant.name} sent request to your post.
                  </Typography>
                  <Typography sx={{ textAlign: "start" }} variant="h5">
                    please confirm their request to let them know you are in. if
                    you regret your you can deny, by press on deny your post
                    will return to be active. notice that by confirm post your
                    email and phone number will sent to your paetner.
                  </Typography>
                </Box>
              )}
              <Box sx={{ m: 2 }}>
                <Button
                  sx={{ borderRadius: "30px", m: 1 }}
                  size="large"
                  color="success"
                  variant="contained"
                  onClick={confirm}
                >
                  {" "}
                  Confirm
                </Button>
                <Button
                  sx={{ borderRadius: "30px", m: 1 }}
                  size="large"
                  variant="contained"
                  onClick={handleNavigateToUserPage}
                >
                  view Profile
                </Button>
                <Button
                  sx={{ borderRadius: "30px", m: 1 }}
                  size="large"
                  color="error"
                  variant="contained"
                  onClick={deny}
                >
                  Deny
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box m={2}>
            <Box>
              <Button
                m={1}
                onClick={() => {
                  navigate("/");
                }}
                endIcon={<ArrowForwardIcon />}
              >
                Back to Home Page
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
