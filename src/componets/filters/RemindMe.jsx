import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import {getStrDay,getStrTime} from '../../utilities/functions/dateTypeFunc'
import { Box, Typography, Card, CardContent, Button, CardActions, Alert, } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
const urlServer = process.env.REACT_APP_URL_SERVER;

// const getStrDay = (date) => {
//   return date ? `${date.$D < 10 ? "0" : ""}${date.$D}/${date.$M + 1 < 10 ? "0" : ""}${date.$M + 1}/${date.$y}` : null
// }
// const getStrTime = (time) => {
//   return time ? `${time.$H < 10 ? "0" : ""}${time.$H}:${time.$m < 10 ? "0" : ""}${time.$m}` : null
// }


export default function RemindMe({ subName, date, time, getDateStemp, getTimeStemp, clearFilter }) {
  const { user } = useContext(UserContext);


  const [sstempSubName] = useState(subName || null);
  const [strDay] = useState(getStrDay(date));
  const [strTime] = useState(getStrTime(time));

  const [alertMessage, setAlertMessage] = useState('');
  const [opanAlert, setOpanAlert] = useState(false);
  const [alertMode, setAlertMode] = useState('');
  
  const handleOpenAlert = (alertStatus, message) => {
    setAlertMode(alertStatus);
    setAlertMessage(message)
    setOpanAlert(true);
    setTimeout(() => {
      setOpanAlert(false);
    }, 3000)
  }

  const remindMe = async () => {
    try {
      if (!user) {
        handleOpenAlert("error", "you are not logged in please log in to complete");
        return;
      }
      const answer = await axios.post(`${urlServer}/alert/add-alert`, { user_id: user.id || null, sub_category: sstempSubName || null, date: getDateStemp(date) || null, time: getTimeStemp(time) || null })
      await handleOpenAlert("success", answer.data);
      setTimeout(() => {
        clearFilter();
      }, 3000)
    }
    catch (err) {
      console.log(err);
      handleOpenAlert("error", err.response.data)
    }
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width={"100%"}
    >
      <Card sx={{ width: "50%" }}>
        <Box sx={{ position: 'relative' }}>
          {opanAlert ? <Alert onClose={() => setOpanAlert(false)} sx={{ position: 'absolute', width: '100%' }} severity={alertMode}>{alertMessage}</Alert> : null}
        </Box>
        <CardContent sx={{ textAlign: "start" }}>
          <Typography variant="h6">
            we havn't find any post match with your filter
          </Typography>
          {sstempSubName && (
            <Typography variant="subtitle1">
              Subject: {sstempSubName}
            </Typography>
          )}
          {strDay && (
            <Typography variant="subtitle1">
              Date: {strDay}
            </Typography>
          )}
          {strTime && (
            <Typography variant="subtitle1">
              Time: {strTime}
            </Typography>
          )}
        </CardContent>
        <CardContent sx={{ textAlign: "start" }}>
          <Typography variant="body1">
            click below if you like to get an alert when someone will post
            as you searched
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button variant="outlined" onClick={remindMe} >
            alert me
            <AddIcon color="primary" />
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
