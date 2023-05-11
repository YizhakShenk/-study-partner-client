import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppMenu from "./AppMenu";
import AppNotifications from "./AppNotifications";
import UserContext from "../../context/UserContext";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";

import { useColorScheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Nav({ setOpenLogIn }) {


  const { user } = useContext(UserContext)
  const navigae = useNavigate();
  const { mode, setMode } = useColorScheme();
  const modeToggle = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const handleBodyValContent = () => {
    navigae("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ height: "90px" }}>
          <Button type="link" onClick={handleBodyValContent}>
            <Avatar sx={{ width: 60, height: 50 }} alt="LOGO" src="SP.png" />
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* Study Partner */}
          </Typography>
          {user && <AppNotifications></AppNotifications>}
          <IconButton sx={{ margin: 2 }} onClick={modeToggle} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <AppMenu setOpenLogIn={setOpenLogIn}></AppMenu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
