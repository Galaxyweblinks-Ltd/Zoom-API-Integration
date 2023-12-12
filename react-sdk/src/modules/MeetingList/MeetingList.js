import { useEffect, useState } from 'react';
import TableList from '../../shared/components/TableList/TableList';
import { MEETING_LIST } from '../../shared/constants/ApiConstant';
import {
  ACCESS_TOKEN_EXPIRED,
  NODE_API_END_POINT,
  ZOOM_ERROR_CODE,
} from '../../shared/constants/Constants';
import { getRefreshToken } from '../../shared/utils/utils';
import './MeetingList.css';

/**
 * @Component
 * @name MeetingList
 * @desc Component that render the zoom meetings.
 */
const MeetingList = () => {
  const [meetingList, setMeetingList] = useState([]);

  /**
   * @function
   * @name getAllMeetings
   * @desc function that returns the meeting data array from API response.
   */
  const getAllMeetings = () => {
    const zoomToken = sessionStorage.getItem('zoomToken');
    const zoomRefreshToken = sessionStorage.getItem('zoomRefreshToken');
    fetch(`${NODE_API_END_POINT}${MEETING_LIST}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: zoomToken,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response?.meetings?.length) {
          setMeetingList(response?.meetings);
        } else if (
          response?.code === ZOOM_ERROR_CODE &&
          response?.message === ACCESS_TOKEN_EXPIRED
        ) {
          setMeetingList([]);
          getRefreshToken(zoomRefreshToken);
        }
      })
      .catch((error) => {
        setMeetingList([]);
        console.error(error);
      });
  };

  useEffect(() => {
    if (!meetingList.length) {
      getAllMeetings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingList]);

  return (
    <>
      <div className="table_div">
        <TableList
          list={meetingList}
          startMeetingTxt="Start meeting"
          noRecordFoundTxt="No record found"
        />
      </div>
    </>
  );
};
export default MeetingList;

MeetingList.defaultProps = {};

MeetingList.propTypes = {};
