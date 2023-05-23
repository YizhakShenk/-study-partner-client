import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserDetailsContext from "../../context/UserDetailsContext";
import { Button, Rating, Box, Avatar, TextField } from "@mui/material";

const urlServer = process.env.REACT_APP_URL_SERVER;

export default function Rate({ user, userData, setUserData }) {
  const { userDetails } = useContext(UserDetailsContext);
  const [rate, setRate] = useState(5);
  const [rates, setRates] = useState(userData.rates || []);
  const [rateScore, setRateScore] = useState();
  const [commant, setCommant] = useState("");
  const [isRating, setIsRating] = useState(false);

  useEffect(() => {
    let count = 0,
      sum = 0;
    rates.forEach((item) => {
      if (user && item.rater_id === user.id) {
        setCommant(item.note);
      }
      sum += item.rate_score;
      count++;
    });
    setRateScore(sum / count);
  }, [rates, user, setRates]);

  const handleRate = async () => {
    const rateObj = {
      user_id: userData.id,
      rater_name: userDetails.name,
      rater_id: user.id,
      note: commant,
      rate_score: rate,
    };
    await axios.post(`${urlServer}/rate/add`, rateObj, {
      withCredentials: true,
    });
    const tempRates = rates.map((item) =>
      item.rater_id === user.id ? rateObj : item
    );
    setRates(tempRates);
    setUserData({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      phone_number: userData.phone_number,
      age: userData.age,
      country: userData.country,
      languages: userData.languages,
      about: userData.about,
      notifications: userData.notifications,
      posts: userData.posts,
      rate: userData.rate,
      rates: tempRates,
      subjects: userData.subjects,
    });
    setIsRating((rating) => !rating);
  };

  const handleChangeMode = () => {
    setIsRating((rating) => !rating);
  };
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar sx={{ width: 100, height: 100, marginTop: 5 }} />
      </Box>
      <Box sx={{ m: 5 }}>
        {!isRating ? (
          <Box>
            <Rating disabled precision={0.5} value={rateScore || null} />
            {user && (
              <Box>
                <Button onClick={handleChangeMode}>Rate</Button>
              </Box>
            )}
          </Box>
        ) : (
          <Box>
            <Rating
              value={rate || null}
              onChange={(event, newValue) => {
                if (newValue > 0) {
                  setRate(newValue);
                }
              }}
            />
            <Box>
              <TextField
                fullWidth={true}
                sx={{ mt: 2 }}
                multiline
                maxRows={3}
                variant="standard"
                placeholder="Leave a note"
                value={commant}
                onChange={(event) => {
                  if (event.target.value.length < 63) {
                    setCommant(event.target.value);
                  }
                }}
              />
              <Box mt={2}>
                <Button onClick={handleChangeMode}>Cancel</Button>
                <Button onClick={handleRate}>Save</Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
