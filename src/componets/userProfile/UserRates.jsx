import React from "react";
import {
  Box,
  Card,
  Divider,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";

export default function UserRates({ rates }) {
  return (
    <Box textAlign={"left"}>
      <Typography m={2} variant="h6">
        Rates:
      </Typography>
      {rates?.length > 0 && (
        <Box sx={{ display: "flex", m: 1, maxWidth: "200px", height: "100%" }}>
          {rates.map((rate, index) => {
            return (
              <Box key={index} sx={{ m: 1 }}>
                <Card sx={{ textAlign: "start", padding: 2, height: "100%" }}>
                  <Typography variant="h6" sx={{ m: 1 }}>
                    {rate.rater_name}
                  </Typography>
                  <Divider />
                  <CardMedia sx={{ m: 1 }}>
                    <Rating disabled precision={0.5} value={rate.rate_score} />
                  </CardMedia>
                  <Typography sx={{ m: 1 }}>{rate.note}</Typography>
                </Card>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
