import React, { useState } from "react";
import ExtendPostDialog from "./ExtendPostDialog";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Paper, Box } from "@mui/material";
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';

export default function PostCard({ post }) {
  const [openMore, setOpenMore] = useState(false);
  const [week] = useState(["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"]);

  return (
    <Box>
      <Tooltip
        sx={{ padding: 5 }}
        placement="top"
        PopperProps={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -175],
              },
            },
          ],
        }}
        title={post.matched === 1 ? "this post has been already matched." : ""}
      >
        <Card
          sx={{
            minWidth: 250,
            maxWidth: 300,
            margin: 3,
            textAlign: "left",
            opacity:
              post.matched === 1 ? "0.5" : "1"
          }}
        >
          <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
            {post.matched === 1 && (
              <Paper
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  padding: "6",
                  textAlign: "center",
                  opacity: "1",
                }}
                elevation={6}
              >
                <Typography
                  fontWeight={"bold"}
                  color="primary"
                  variant="h4"
                  m={5}
                >
                  Post unavailable
                </Typography>
              </Paper>
            )}
          </Box>
          <CardMedia
            component="img"
            alt="languages"
            height="140"
            image={require("./cardPics/" + post.category + ".jpg")}
          />
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              {post.sub_category}
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              {(post.auther_name && post.auther_name) || "unknown"}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {post.date_from} - {post.date_to}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {post.time_from} - {post.time_to}
            </Typography>
            <Box mt={1}>
              {week?.map((item, index) => {
                return <CalendarTodayTwoToneIcon key={index} fontSize="small" color={post.days[index] < 1 ? "disabled" : "primary"} />
              })}
            </Box>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setOpenMore(true);
              }}
            >
              learn more
            </Button>
          </CardActions>
          <ExtendPostDialog
            openMore={openMore}
            setOpenMore={setOpenMore}
            post={post}
          />
        </Card>
      </Tooltip>
    </Box>
  );
}
