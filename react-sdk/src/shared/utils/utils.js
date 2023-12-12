import {
  AUTHORIZE,
  GET_REFRESH_TOKEN,
  REDIRECT,
} from '../constants/ApiConstant';
import { NODE_API_END_POINT } from '../constants/Constants';

/**
 * @function
 * @name noop
 * @desc function that return empty object.
 *
 *
 */
// eslint-disable-next-line no-empty-function
export const noop = () => {};

/**
 * @function
 * @name isEmptyObject
 * @desc function that check the object is empty or not.
 *
 * @param obj - objects
 *
 */
export const isEmptyObject = (obj) => {
  return obj && !Object.keys(obj).length;
};

/**
 * @function
 * @name getAuthorizeUrl
 * @desc function that authorize url of zoom.
 *
 */
export const getAuthorizeUrl = () => {
  window.location.replace(`${NODE_API_END_POINT}${AUTHORIZE}`);
};

/**
 * @function
 * @name getAccessToken
 * @desc function that returns the zoom access token, refresh token and expire in time.
 *
 * @param zoomCode: string that contain the zoom code for access token
 * @returns {string} zoom access token, refresh token and expire in time.
 */
export const getAccessToken = (zoomCode) => {
  fetch(`${NODE_API_END_POINT}${REDIRECT}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: zoomCode,
    }),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log('response == ', response);
      sessionStorage.setItem('zoomToken', response.access_token);
      sessionStorage.setItem('zoomRefreshToken', response.refresh_token);
      sessionStorage.setItem('expireIn', response.expires_in);
      window.location.replace('/');
    })
    .catch((error) => {
      console.error('error == ', error);
    });
};

/**
 * @function
 * @name getRefreshToken
 * @desc function that returns the zoom access token and refresh token
 *
 * @param zoomRefreshToken: string that contain the zoom refresh token.
 * @returns {string} zoom access token and refresh token
 */
export const getRefreshToken = (zoomRefreshToken) => {
  fetch(`${NODE_API_END_POINT}${GET_REFRESH_TOKEN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      refreshToken: zoomRefreshToken,
    }),
  })
    .then((res) => res.json())
    .then((response) => {
      sessionStorage.setItem('zoomToken', response.access_token);
      sessionStorage.setItem('zoomRefreshToken', response.refresh_token);
      window.location.replace('/');
    })
    .catch((error) => {
      console.error(error);
    });
};

/**
 * @function
 * @name dateFormat
 * @desc function that returns the required date string from date object
 *
 * @param date: object that contain the date object.
 * @returns {string} formatted date string after conversion.
 */
export const dateFormat = (date) => {
  let dateString =
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '/' +
    ('0' + date.getDate()).slice(-2) +
    '/' +
    date.getFullYear() +
    ' ' +
    formatAMPM(date);
  return dateString;
};

/**
 * @function
 * @name formatAMPM
 * @desc function that returns the formatted time with AM/PM.
 *
 * @param date: object that contain the date object.
 * @returns {string} formatted date string after conversion.
 */
export const formatAMPM = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? (hours < 10 ? '0' + hours : hours) : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};
