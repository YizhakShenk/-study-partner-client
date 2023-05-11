import './App.css';
import { useEffect, useState } from 'react';
import UserContext from './context/UserContext';
import UserDetailsContext from './context/UserDetailsContext';
import UserSubjectsContext from './context/UserSubjectsContext';
import UserPostsContext from './context/UserPostsContext';
import NotificationsContext from './context/NotificationsContext';
import Home from './componets/home/Home';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
// import theme from './style/theme';
const urlServer = process.env.REACT_APP_URL_SERVER

function App() {

  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [userSubjects, setUserSubjects] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [userNotifications, setUserNotifications] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const id = sessionStorage.getItem("user_id");
        const auth = await (await axios.post(`${urlServer}/auth/`, { id }, { withCredentials: true })).data
        if (!auth) {
          setUser(null);
          setUserDetails(null);
          setUserNotifications(null);
          sessionStorage.clear()
        }
        else {
          const userId = { id: auth.id }
          const details = {
            name: auth.name,
            age: auth.age,
            email: auth.email,
            phone_number: auth.phone_number,
            country: auth.country,
            languages: auth.languages,
            about: auth.about,
          }
          const notifications = auth.notifications;
          const subjects = auth.subjects;
          const posts = auth.posts;
          setUser(userId);
          setUserDetails(details);
          setUserSubjects(subjects);
          setUserPosts(posts);
          setUserNotifications(notifications);
          // setUserConnected(auth);
        }
      }
      catch (err) {
        console.log(err.message);
      }
    })()
  }, []);

  return (
    <div className="App">
      <CssVarsProvider>
        <CssBaseline>
          {/* <ThemeProvider theme={theme}> */}
            <UserContext.Provider value={{ user, setUser }}>
              <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
                <UserSubjectsContext.Provider value={{ userSubjects, setUserSubjects }}>
                  <UserPostsContext.Provider value={{ userPosts, setUserPosts }}>
                    <NotificationsContext.Provider value={{ userNotifications, setUserNotifications }}>
                      <Home />
                    </NotificationsContext.Provider>
                  </UserPostsContext.Provider>
                </UserSubjectsContext.Provider>
              </UserDetailsContext.Provider>
            </UserContext.Provider>
          {/* </ThemeProvider> */}
        </CssBaseline>
      </CssVarsProvider>
    </div>
  );
}

export default App;

