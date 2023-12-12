import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { dateFormat } from '../../utils/utils';
import './TableList.css';

/**
 * @Component
 * @name MeetingList
 * @desc Component that render the zoom meetings.
 */
const TableList = ({ list, startMeetingTxt, noRecordFoundTxt }) => {
  return (
    <>
      <table border="1">
        <thead>
          <tr>
            <th>Meeting Id</th>
            <th>Topic</th>
            <th>Agenda</th>
            <th>Duration</th>
            <th>Start Time</th>
            <th>Action</th>
          </tr>
        </thead>
        {list?.length ? (
          list.map((item) => (
            <Fragment key={item?.uuid}>
              <tbody>
                <tr>
                  <td>{item?.id}</td>
                  <td>{item?.topic}</td>
                  <td>{item?.agenda || '-'}</td>
                  <td>{item?.duration} mins</td>
                  <td>{dateFormat(new Date(item?.start_time))}</td>
                  <td>
                    <a
                      href={item?.join_url}
                      target="_blank"
                      rel="noreferrer"
                      className="start-meeting-button"
                    >
                      {startMeetingTxt}
                    </a>
                  </td>
                </tr>
              </tbody>
            </Fragment>
          ))
        ) : (
          <tbody>
            <tr>
              <td colSpan={6} className="text-align-center">
                {noRecordFoundTxt}
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </>
  );
};
export default TableList;

Button.defaultProps = {
  list: [],
  startMeetingTxt: '',
  noRecordFoundTxt: '',
};

Button.propTypes = {
  list: PropTypes.array,
  startMeetingTxt: PropTypes.string,
  noRecordFoundTxt: PropTypes.string,
};
