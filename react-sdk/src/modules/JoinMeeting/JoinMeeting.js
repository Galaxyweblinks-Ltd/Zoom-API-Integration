import { ZoomMtg } from '@zoomus/websdk';
import React, { useState } from 'react';
import '../../App.css';
import Button from '../../shared/components/Button/Button';
import HelperText from '../../shared/components/HelperText/HelperText';
import PageTitle from '../../shared/components/PageTitle/PageTitle';
import TextField from '../../shared/components/TextField/TextField';
import {
  GET_SIGNATURE,
  ZOOM_JS_LIBRARY_URL,
} from '../../shared/constants/ApiConstant';
import {
  LEAVE_URL,
  MEETING_SDK_KEY,
  NODE_API_END_POINT,
} from '../../shared/constants/Constants';

ZoomMtg.setZoomJSLib(ZOOM_JS_LIBRARY_URL, '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

/**
 * @Component
 * @name JoinMeeting
 * @desc Component that render the join meeting screen.
 */
const JoinMeeting = () => {
  const userEmail = '';
  const [inputs, setInputs] = useState({});

  /**
   * @function
   * @name getSignature
   * @desc function that returns the generated the signature from API response.
   *
   * @param e - returns the event object.
   * @returns {array} signature object from API response.
   */
  const getSignature = (e) => {
    e.preventDefault();
    fetch(`${NODE_API_END_POINT}${GET_SIGNATURE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: inputs.meetingNumber,
        role: 0,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        startMeeting(response.signature);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /**
   * @function
   * @name startMeeting
   * @desc function that initiate the meeting sdk and allow access to join meeting.
   *
   * @param signature - returns the string that is allow to join the meeting.
   * @returns {object} - returns the success object if API succeed, otherwise return error object from server API call.
   */
  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block';
    ZoomMtg.init({
      leaveUrl: LEAVE_URL,
      success: (success) => {
        ZoomMtg.join({
          signature: signature,
          sdkKey: MEETING_SDK_KEY,
          meetingNumber: inputs.meetingNumber,
          passWord: inputs.passWord,
          userName: inputs.userName,
          userEmail: userEmail,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  /**
   * @function
   * @name handleChange
   * @desc function that get all the user provided inputs value.
   *
   * @param event - contain the event object that holds field name, value and other required values.
   * @returns {object} - returns the success object if API succeed, otherwise return error object from server API call.
   */
  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <>
      <div className="App">
        <PageTitle title="Zoom Meeting" />

        <div className="meeting-container">
          <HelperText description="**Please fill all the detail before join the meeting." />
          <div className="meeting-grid">
            <TextField
              labelTitle="Meeting ID"
              labelFor="meetingId"
              id="meetingId"
              placeHolder="Meeting ID"
              value={inputs.meetingNumber || ''}
              name="meetingNumber"
              onChange={handleChange}
              isRequired={true}
            />
          </div>
          <div className="meeting-grid">
            <TextField
              labelTitle="Passcode"
              labelFor="passCode"
              placeHolder="Passcode"
              value={inputs.passWord || ''}
              name="passWord"
              onChange={handleChange}
              isRequired={true}
            />
          </div>
          <div className="meeting-grid">
            <TextField
              labelTitle="User Name"
              labelFor="username"
              placeHolder="User name"
              value={inputs.userName || ''}
              name="userName"
              onChange={handleChange}
              isRequired={true}
            />
          </div>
        </div>
        <div className="action-container">
          <Button
            className="join-meeting-button"
            btnTxt="Join Meeting"
            onClick={getSignature}
          />
        </div>
      </div>
    </>
  );
};

export default JoinMeeting;

JoinMeeting.defaultProps = {};

JoinMeeting.propTypes = {};
