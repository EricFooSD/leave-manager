/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';

// form to create new Bill
export default function Form({
  user, toggleForm, updateRequestList, updateBalance,
}) {
  // ================================
  //             STATES
  // ================================
  const [date, setDate] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [comment, setComment] = useState('');

  // ================================
  //          HELPER FUNCTIONS
  // ================================

  const handleChangeDate = (event) => {
    const newDate = event.target.value;
    setDate(newDate);
  };

  const handleChangeLeaveType = (event) => {
    const newLeaveType = event.target.value;
    setLeaveType(newLeaveType);
  };

  const handleChangeComment = (event) => {
    const newComment = event.target.value;
    setComment(newComment);
  };

  // AJAX calls when creating a new leave request
  const createRequest = () => {
    axios
    // posting into request DB
      .post('/postRequest', {
        user, date, leaveType, comment,
      })
      .then((response) => {
        console.log('request created in DB');
        toggleForm();
        // get updated list of requests
        axios
          .post('/getRequests', user)
          .then((response2) => {
            updateRequestList(response2.data.allExistingRequests[0]);
            // get updated leave balance
            axios
              .post('/getLeavebalance', user)
              .then((response3) => {
                updateBalance({ ...response3.data.leaveBalance.balance }); });
          });
      })
      .catch((error) => { console.log(error); });
  };

  // ================================
  //       RENDERING OF COMPONENT
  // ================================
  return (
    <div id="create-request-container" className="container-sm">
      <div className="row" id="item-price-form">
        <div className="input-group">
          <input id="date-input" type="date" className="form-control" value={date} onChange={handleChangeDate} />
        </div>
        <div className="input-group">
          <select id="leave-input" type="text" placeholder="Type of Leave" className="form-select" value={leaveType} onChange={handleChangeLeaveType}>
            <option>Please Choose Type of Leave</option>
            <option value="AL">Annual Leave</option>
            <option value="SL">Sick Leave</option>
            <option value="ML">Marriage Leave</option>
            <option value="CL">Childcare Leave</option>
          </select>
        </div>
        <div className="input-group">
          <input id="comment-input" type="text" placeholder="Comments" className="form-control" value={comment} onChange={handleChangeComment} />
        </div>
        <div className="input-group">
          <button className="btn btn-success" type="button" onClick={createRequest}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
