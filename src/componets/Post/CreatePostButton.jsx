import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";

export default function CreatePostButton({ setOpenCreatePost }) {
  const { user } = useContext(UserContext);
  return (
    <Box>
      {user && (
        <Fab
          sx={{ position: "fixed", bottom: 20, right: 30 }}
          variant="extended"
          color="primary"
          onClick={() => {
            setOpenCreatePost(true);
          }}
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  );
}
