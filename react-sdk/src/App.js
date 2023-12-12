import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import JoinMeeting from './modules/JoinMeeting/JoinMeeting';
import Login from './modules/Login/Login';
import MeetingList from './modules/MeetingList/MeetingList';
import PageNotFound from './modules/PageNotFound/PageNotFound';
import ScheduleMeeting from './modules/ScheduleMeeting/ScheduleMeeting';
import Header from './shared/components/Header/Header';
import { getAccessToken } from './shared/utils/utils';

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
            <Route path="/" element={<Header />}>
              <Route index element={<MeetingList />} />
              <Route path="scheduleMeeting" element={<ScheduleMeeting />} />
              <Route path="joinMeeting" element={<JoinMeeting />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        ) : !zoomCode ? (
          <Login />
        ) : null}
      </BrowserRouter>
    </>
  );
};

export default App;
