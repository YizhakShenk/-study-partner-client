import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AddSubject from "./AddSubject";
import UserContext from "../../context/UserContext";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UserSubjectsContext from "../../context/UserSubjectsContext";
const urlServer = process.env.REACT_APP_URL_SERVER;

export default function ProfileSubjects() {
  const { userSubjects, setUserSubjects } = useContext(UserSubjectsContext);
  const { user } = useContext(UserContext);
  const [subjects, setSubjects] = useState([]);
  const [subjectsToRemove, setSubjectsToRemove] = useState([]);
  const [edit, setEdit] = useState(false);
  const [openAddSubject, setOpenAddSubject] = useState(false);

  useEffect(() => {
    setSubjects(userSubjects || []);
  }, [userSubjects]);

  const handleEdit = () => {
    setEdit(!edit);
  };
  const handleOpenAddSubject = () => {
    setOpenAddSubject(!openAddSubject);
  };

  const handleDelete = (id) => {
    const temp = subjectsToRemove;
    temp.push(id);
    setSubjectsToRemove(temp);
    setSubjects(subjects?.filter((item) => item.id !== id));
  };
  const handleCancel = () => {
    setSubjects(userSubjects || null);
    setEdit(false);
  };

  const handleSave = () => {
    try {
      axios.post(
        `${urlServer}/user-subject/remove-user-subject`,
        { userId: user.id, subjectId: subjectsToRemove },
        { withCredentials: true }
      );
      setUserSubjects(subjects);
      setEdit(!edit);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      {subjects?.length ? (
        <Box sx={{ m: 1, display: "flex", flexWrap: "wrap" }}>
          {subjects?.map((item, index) => {
            return (
              <Paper
                key={index}
                sx={{ m: 1, display: "flex", flexDirection: "row" }}
              >
                <Typography align="center" sx={{ m: 1 }}>
                  {item.name}{" "}
                </Typography>
                {edit ? (
                  <DeleteIcon
                    sx={{ m: 1 }}
                    fontSize="small"
                    color="primary"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  />
                ) : null}
              </Paper>
            );
          })}
        </Box>
      ) : (
        <Box>
          <Typography variant="h6" m={1}>
            You had'nt added subject yet.
          </Typography>
        </Box>
      )}
      <Divider />
      {!openAddSubject ? (
        edit ? (
          <Box sx={{ m: 1 }}>
            <Button
              sx={{ m: 1 }}
              variant="contained"
              onClick={handleSave}
              size="large"
              startIcon={<SaveIcon fontSize="small" />}
            >
              Save
            </Button>
            <Button
              sx={{ m: 1 }}
              variant="outlined"
              onClick={handleCancel}
              size="large"
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <Box sx={{ m: 1 }}>
            {subjects?.length > 0 && (
              <Button
                sx={{ m: 1 }}
                variant="outlined"
                onClick={handleEdit}
                size="large"
                startIcon={<EditIcon fontSize="small" />}
              >
                Edit
              </Button>
            )}
            <Button
              sx={{ m: 1 }}
              variant="outlined"
              onClick={handleOpenAddSubject}
              size="large"
              startIcon={<AddCircleIcon fontSize="small" />}
            >
              Add Subject
            </Button>
          </Box>
        )
      ) : (
        <AddSubject setAddSubject={setOpenAddSubject} />
      )}
    </Box>
  );
}
