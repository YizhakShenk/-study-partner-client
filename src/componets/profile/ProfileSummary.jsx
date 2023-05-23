import React, { useState, useContext } from "react";
import { Box, Button, InputBase } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import UserDetailsContext from "../../context/UserDetailsContext";
const urlServer = process.env.REACT_APP_URL_SERVER;

export default function ProfileSummary() {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [about, setAbout] = useState(userDetails.about || "");
  const [edited, setEdited] = useState(true);

  const handleEdit = () => {
    setEdited((edited) => !edited);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${urlServer}/user/update`,
        { email: userDetails.email, about: about },
        { withCredentials: true }
      );
      setUserDetails({
        name: userDetails.name,
        age: userDetails.age,
        email: userDetails.email,
        country: userDetails.country,
        phone_number: userDetails.phone_number,
        languages: userDetails.languages,
        about: about,
      });
    } catch (err) {
      console.log(err);
    }
    setEdited((edited) => !edited);
  };

  const handleCancel = () => {
    setAbout(userDetails.about || " ");
    setEdited(!edited);
  };
  return (
    <Box sx={{}}>
      <InputBase
        inputProps={{ maxLength: 255 }}
        disabled={edited}
        sx={{ m: 1 }}
        multiline
        rows={4}
        fullWidth
        value={about || ""}
        placeholder="Write your words here..  
        for exapmle: 'Hi, I'm lee and I am a student of Languages and would
         like to practice grammar and speaking. my Calender is forward...'  (:"
        onChange={(event) => {
          setAbout(event.target.value);
        }}
      />
      {edited ? (
        <Button
          sx={{ m: 1 }}
          onClick={handleEdit}
          variant="text"
          size="large"
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      ) : (
        <Button
          sx={{ m: 1 }}
          onClick={handleSave}
          variant="contained"
          size="large"
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      )}
      {!edited && (
        <Button
          sx={{ m: 1 }}
          variant="outlined"
          onClick={handleCancel}
          size="large"
        >
          Cencel
        </Button>
      )}
    </Box>
  );
}
