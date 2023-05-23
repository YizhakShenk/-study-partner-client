import React, { useEffect, useState } from "react";
import axios from "axios";
import RemindMe from "./RemindMe";
import { Box, Button, TextField, Autocomplete, Grid, Checkbox } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
const urlServer = process.env.REACT_APP_URL_SERVER

export default function Filters({ setPosts, handleRendering }) {
  const [remindMe, setRemindMe] = useState(false);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [subjectName, setSubjectName] = useState([]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${urlServer}/category/get-all`);
        const newArr = [];
        result.data.forEach((cat) => {
          cat.subjects.forEach((subCat) => {
            newArr.push({
              name: subCat.name,
              category: cat.name,
            });
          });
        });
        setCategoriesOptions(newArr);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const getSubName = (subjectName) => { return !subjectName || subjectName.length < 1 ? null : subjectName.map(s => s.name) }
  const getDateStemp = (date) => { return date?.$d.getTime() || null; }
  const getTimeStemp = (time) => { return time?.$H * 100 + time?.$m || null; }

  const filter = async () => {
    try {
      setRemindMe(false)
      const stempDay = getDateStemp(date)
      const stempTime = getTimeStemp(time);
      let tempSubName = getSubName(subjectName);
      const postsList = await axios.post(`${urlServer}/post/filter`, {
        subject: tempSubName,
        date: stempDay,
        time: stempTime,
        matched: false,
      });
      if (!postsList) {
        throw new Error("posts not dound");
      }
      if (postsList.data !== [] && postsList.data !== null) {
        setPosts(postsList.data);
      }
      if (postsList.data.length < 1) {
        setRemindMe(true)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const clearFilter = () => {
    setSubjectName([]);
    setDate(null);
    setTime(null);
    setRemindMe(false);
    handleRendering();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Grid
            maxWidth={{ xs: "100%", sm: "80%", md: "80%", lg: '60%' }}
            container
            columns={{ xs: 4, sm: 12, md: 12 }}
            spacing={1}
          >
            <Grid item xs={12} sm={6} md={3}>
              <Autocomplete
                size="small"
                sx={{ display: "inline-block", maxWidth: "262px", width: "100%" }}
                multiple={true}
                options={categoriesOptions ? categoriesOptions : []}
                disableCloseOnSelect
                value={subjectName}
                getOptionLabel={(option) => option.name}
                groupBy={(option) => option.category}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={<CheckBoxIcon />}
                      checkedIcon={<CheckBoxOutlineBlankIcon />}
                      checked={!selected}
                    />
                    {option.name}
                  </li>
                )}
                onChange={(event, newValue) => {
                  if (newValue.length < 4) {
                    setSubjectName([...newValue]);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Subject (max 3 choices)" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Date"
                disablePast
                value={date}
                inputFormat="DD/MM/YYYY"
                renderInput={(params) => <TextField size="small" {...params} />}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TimePicker
                label="Time"
                value={time}
                onChange={(newValue) => {
                  setTime(newValue);
                }}
                ampm={false}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Button sx={{ mr: 1, mb: 5 }} variant="outlined" onClick={filter}>
                  Filter
                </Button>
                <Button sx={{ mb: 5 }} variant="outlined" onClick={clearFilter}>
                  Clear
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          {remindMe && <RemindMe
            subName={getSubName(subjectName)}
            date={date}
            time={time}
            getDateStemp={getDateStemp}
            getTimeStemp={getTimeStemp}
            clearFilter={clearFilter}
          />}
        </Box>
    </LocalizationProvider>
  );
}
