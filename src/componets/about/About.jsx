import { Typography, Box } from "@mui/material";
export default function About() {
  return (
    <div className="about">
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
          Study partner services include partner search by language, location,
          gender, time, and rating.
        </Typography>
        <Typography variant="subtitle2">
          This website was founded by Avi Rosenthaler and Yitzhak Shenk as a
          final project in software engineering On behalf of mivchar college
        </Typography>
//         <Typography variant="h5">
//           The project was built inspired by Shlomi Levinstein
//         </Typography>
      </Box>
    </div>
  );
}
