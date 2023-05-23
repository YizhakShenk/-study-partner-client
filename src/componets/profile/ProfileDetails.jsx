import React, { useState, useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Box, TextField, Button } from "@mui/material";
import axios from "axios";
import UserDetailsContext from "../../context/UserDetailsContext";
const urlServer = process.env.REACT_APP_URL_SERVER;

export default function ProfileDetails() {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [name, setName] = useState(userDetails.name || "");
  const [email, setEmail] = useState(userDetails.email || "");
  const [country, setCountry] = useState(userDetails.country || "");
  const [languages, setLanguages] = useState(userDetails.languages || "");
  const [age, setAge] = useState(userDetails.age || null);
  const [phone_number, setPhone_number] = useState(
    userDetails.phone_number || null
  );
  const [edit, setEdit] = useState(true);
  const handleEdit = async () => {
    setEdit((edit) => !edit);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${urlServer}/user/update`,
        { email, name, country, languages, age, phone_number },
        { withCredentials: true }
      );
      const details = {
        name: name,
        age: age,
        email: email,
        country: country,
        phone_number: phone_number,
        about: userDetails.about,
        languages: languages,
      };
      setUserDetails(details);
      setEdit((edit) => !edit);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCancel = () => {
    setName(userDetails.name || "");
    setEmail(userDetails.email || "");
    setCountry(userDetails.country || "");
    setLanguages(userDetails.languages || "");
    setAge(userDetails.age || null);
    setPhone_number(userDetails.phone_number || null);
    setEdit((edit) => !edit);
  };

  return (
    <Box>
      <Box>
        <TextField
          sx={{ m: 1 }}
          disabled={edit}
          label="Name"
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
          value={name}
        />
        <TextField
          sx={{ m: 1 }}
          disabled
          label="Email"
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
        />
        <TextField
          sx={{ m: 1 }}
          disabled={edit}
          label="Age"
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
          value={age}
        />
        <TextField
          sx={{ m: 1 }}
          disabled={edit}
          label="Country"
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
          value={country}
        />
        <TextField
          sx={{ m: 1 }}
          disabled={edit}
          label="Languages"
          type="text"
          onChange={(event) => {
            setLanguages(event.target.value);
          }}
          value={languages}
        />
        <TextField
          sx={{ m: 1 }}
          disabled={edit}
          label="Phone Number"
          type="tel"
          onChange={(event) => {
            setPhone_number(event.target.value);
          }}
          value={phone_number}
        />
      </Box>
      <Box>
        {edit ? (
          <Button
            sx={{ m: 1 }}
            onClick={handleEdit}
            size="large"
            startIcon={<EditIcon fontSize="small" />}
          >
            Edit
          </Button>
        ) : (
          <Button
            sx={{ m: 1 }}
            variant={"contained"}
            onClick={handleSave}
            size="large"
            startIcon={<SaveIcon fontSize="small" />}
          >
            Save
          </Button>
        )}
        {!edit && (
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
    </Box>
  );
}
