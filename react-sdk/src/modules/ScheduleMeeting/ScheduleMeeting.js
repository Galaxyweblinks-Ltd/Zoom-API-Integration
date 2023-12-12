import React, { useState } from 'react';
import '../../App.css';
import Button from '../../shared/components/Button/Button';
import HelperText from '../../shared/components/HelperText/HelperText';
import PageTitle from '../../shared/components/PageTitle/PageTitle';
import TextField from '../../shared/components/TextField/TextField';
import { SCHEDULE_MEETING } from '../../shared/constants/ApiConstant';
import {
  ACCESS_TOKEN_EXPIRED,
  NODE_API_END_POINT,
  ZOOM_ERROR_CODE,
} from '../../shared/constants/Constants';
import { getRefreshToken } from '../../shared/utils/utils';

/**
 * @Component
 * @name ScheduleMeeting
 * @desc Component that render the schedule meeting form.
 */
const ScheduleMeeting = () => {
  const [inputs, setInputs] = useState({});

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

  /**
   * @function
   * @name addMeeting
   * @desc function that create/schedule a meeting on the zoom with user provided input data.
   *
   * @param event - returns the event object.
   * @returns {object} returns the object of added meeting data like meeting id, agenda, start time,
   * join URL etc. if API succeed otherwise returns error object.
   */
  const addMeeting = (event) => {
    event.preventDefault();
    const reqParam = {
      ...inputs,
      start_time: new Date(
        `${inputs.startDate} ${inputs.startTime}`
      ).toISOString(),
      duration: 40,
    };
    const zoomToken = sessionStorage.getItem('zoomToken');
    const zoomRefreshToken = sessionStorage.getItem('zoomRefreshToken');
    fetch(`${NODE_API_END_POINT}${SCHEDULE_MEETING}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: zoomToken,
      },
      body: JSON.stringify(reqParam),
    })
      .then((res) => res.json())
      .then((response) => {
        if (
          response?.code === ZOOM_ERROR_CODE &&
          response?.message === ACCESS_TOKEN_EXPIRED
        ) {
          getRefreshToken(zoomRefreshToken);
        } else {
          window.location.replace('/');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="App">
        <PageTitle title={'Schedule Meeting'} />
        <form onSubmit={addMeeting}>
          <div className="meeting-container">
            <HelperText description="**Please fill all the detail before schedule the meeting." />

            <div className="meeting-grid">
              <TextField
                labelTitle="Topic"
                labelFor="topic"
                id="topic"
                placeHolder="Meeting topic"
                value={inputs.topic || ''}
                name="topic"
                onChange={handleChange}
                isRequired={true}
              />
            </div>
            <div className="meeting-grid">
              <TextField
                labelTitle="Agenda"
                labelFor="agenda"
                id="agenda"
                placeHolder="Meeting agenda"
                value={inputs.agenda || ''}
                name="agenda"
                onChange={handleChange}
                isRequired={true}
              />
            </div>

            <div className="meeting-grid">
              <TextField
                labelTitle="Schedule Date"
                labelFor="start_date"
                id="startDate"
                placeHolder="mm/dd/yyyy"
                value={inputs.agenda || ''}
                name="startDate"
                onChange={handleChange}
                isRequired={true}
              />
            </div>

            <div className="meeting-grid">
              <TextField
                labelTitle="Schedule time"
                labelFor="start_time"
                id="startTime"
                placeHolder="HH:mm"
                value={inputs.agenda || ''}
                name="startTime"
                onChange={handleChange}
                isRequired={true}
              />
            </div>
          </div>
          <div className="action-container">
            <Button
              className="join-meeting-button"
              type="submit"
              btnTxt="Schedule Meeting"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleMeeting;

ScheduleMeeting.defaultProps = {};

ScheduleMeeting.propTypes = {};
