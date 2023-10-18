import React, { useEffect } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { getAccessToken } from './CommonUtils/CommonUtils';
import JoinMeeting from './JoinMeeting/JoinMeeting';
import Layout from './Layout/Layout';
import MeetingList from './MeetingList/MeetingList';
import PageNotFound from './PageNotFound/PageNotFound';
import ScheduleMeeting from './ScheduleMeeting/ScheduleMeeting';
import NotLoggedIn from './NotLoggedIn/NotLoggedIn';

const App = () => {
  const zoomCode = new URLSearchParams(window.location.search).get('code');
  useEffect(() => {
    if (zoomCode) {
      getAccessToken(zoomCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomCode]);

 const isAuthenticated = sessionStorage.getItem('zoomToken');
  return (
    <>
      <BrowserRouter>
      {isAuthenticated ? (
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<MeetingList />} />
            <Route path="scheduleMeeting" element={<ScheduleMeeting />} />
            <Route path="joinMeeting" element={<JoinMeeting />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      ) : (
        !zoomCode? <NotLoggedIn /> : null
      )}
      </BrowserRouter>
    </>
  );
};

export default App;
