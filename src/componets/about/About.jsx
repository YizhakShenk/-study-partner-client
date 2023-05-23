import { Typography, Box } from "@mui/material";
export default function About() {
  return (
      <Box
        sx={{
          padding: "15%",
        }}
      >
        <Typography variant="h5" paragraph={true}>
          Study partner took on the goal of helping anyone who wants to learn
          find a study partner from degree studies to preparatory studies and
          more
        </Typography>
        <Typography variant="h6" paragraph={true}>
          Study partner services include partner search by subject, 
          date, and time.
        </Typography>
        <Typography variant="subtitle2">
          This website was founded by Avi Rosenthaler and Yitzhak Shenk as a
          final project in software engineering On behalf of mivchar college
        </Typography>
      </Box>
  );
}
