import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext';
import ProfileSummary from './ProfileSummary';
import ProfileDetails from './ProfileDetails';
import ProfileSubjects from './ProfileSubjects';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProfilePosts from './ProfilePosts';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Button,
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
export default function Profie() {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState("1");
  const { user } = useContext(UserContext);


  const handleChange = (panel) => {
    if (expanded === panel) {
      setExpanded(" ");
      return;
    }
    setExpanded(panel);
  }
  return (
    <Box>
      {user ? <Box>
        <Accordion expanded={expanded === '1'} onChange={() => { handleChange('1') }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography >Profile Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ProfileDetails setExpanded={setExpanded} />
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === '2'} onChange={() => { handleChange('2') }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography>About Me</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ProfileSummary />
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === '3'} onChange={() => { handleChange('3') }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>My Subjects</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ProfileSubjects />
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === '4'} onChange={() => { handleChange('4') }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>My Posts</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ProfilePosts />
          </AccordionDetails>
        </Accordion>
      </Box>
        :
        <Box sx={{ height: '40vh', mt: '20%' }}>
          <Typography variant='h5'>Please log in then you can see your profile details !</Typography>
          <Button endIcon={<ArrowForwardIcon />} onClick={() => navigate('/')}>Back to home page</Button>
        </Box>
      }
    </Box>

  )
}
