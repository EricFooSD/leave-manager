/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import moment from 'moment';

// form to create new Bill
export default function Table({
  user, requests, updateRequestList, updateBalance, updateTeamBalance,
}) {
// helper functions
  const nameOfLeave = (type) => {
    // I think a switch statement would work a bit nicer or even better an object.
    /* 
      const leaveTypes = {
        AL: 'Annual Leave',
        CL: 'Childcare Leave',
      }

      leaveTypes[type] // if type is AL should be 'Annual Leave', if no match then undefined, which you could make an Error then.
    
    */
    if (type === 'AL') {
      return 'Annual Leave';
    }
    if (type === 'CL') {
      return 'Childcare Leave';
    }
    if (type === 'ML') {
      return 'Marriage Leave';
    }
    if (type === 'SL') {
      return 'Sick Leave';
    }
    return 'Error';
  };

  const statusName = (status) => {
    if (status === 1) {
      return 'Pending';
    }
    if (status === 2) {
      return 'Approved';
    }
    if (status === 3) {
      return 'Rejected';
    }
    return 'Error';
  };

  const deleteRequest = (leaveRequest) => {
    axios
    // posting to Bill DB
      .post('/deleteRequest', { leaveRequest })
      .then((response) => {
        console.log('request deleted');
        axios
          .post('/getRequests', user)
          .then((response2) => {
            console.log('response2.data', response2.data);
            updateRequestList(response2.data.allExistingRequests[0]);
            // get updated leave balance
            axios
              .post('/getLeavebalance', user)
              .then((response3) => {
                updateBalance({ ...response3.data.leaveBalance.balance });
              });
          });
      })
      .catch((error) => { console.log(error); });
  };

  const updateRequest = (leaveRequest, newStatus) => {
    // instead of always importing axios everywhere, you could define a POST, GET, PUT etc. function
    /* const postRequest = async (url, payload) => {
          const response = await axios.post(url, payload);
          return response;
    } 
    That way you avoid repeating yourself over and over.
    */
    axios
    // posting to Bill DB
      .post('/updateRequest', { leaveRequest, newStatus })
      .then((response) => {
        console.log('request updated');
        axios
          .post('/getLeaderRequests', user)
          .then((response2) => {
            console.log('response2.data', response2.data);
            updateRequestList(response2.data.allExistingRequests[0]);
            // get leave balance of team
            axios
              .post('/getTeamBalance', user)
              .then((response3) => {
                updateTeamBalance(response3.data.teamBalance[0]);
              });
          });
      })
      .catch((error) => { console.log(error); });
  };

  // return component when user is a Member
  if (user.role === 1) {
    return (
      <div id="table-container" className="container-sm">
        <div className="row">
          <div className="col-12 text-center">
            <h2>All Requests</h2>
          </div>
          <div className="col-12" id="newtable">
            <table className="table table-striped table-bordered table-hover table-sm align-middle table-responsive">
              <thead>
                <tr className="table-dark">
                  <th scope="col">Request ID</th>
                  <th scope="col">Date</th>
                  <th scope="col">Leave Type</th>
                  <th scope="col">Comments</th>
                  <th scope="col">Status</th>
                  <th scope="col">Delete Request</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((element, index) => (
                  <tr key={index}>
                    <td>{element.id}</td>
                    <td>
                      {moment(element.dates).format('Do MMM YYYY')}
                    </td>
                    <td>
                      {(nameOfLeave(element.leavetype))}
                    </td>
                    <td>
                      {element.comments}
                    </td>
                    <td>
                      {(statusName(element.status))}
                    </td>
                    <td>
                      <button className="btn btn-danger btn-sm" type="button" onClick={() => deleteRequest(element)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // return component when user is a Leader
  if (user.role === 2) {
    return (
      <div id="table-container" className="container-sm">
        <div className="row">
          <div className="col-12 text-center">
            <h2>All Requests</h2>
          </div>
          <div className="col-12" id="newtable">
            {/* Using tables is quite oldschool. Nowadays flex and/or grid is advised */}
            <table className="table table-striped table-bordered table-hover table-sm align-middle table-responsive">
              <thead>
                <tr className="table-dark">
                  <th scope="col">Request ID</th>
                  <th scope="col">Member</th>
                  <th scope="col">Date</th>
                  <th scope="col">Leave Type</th>
                  <th scope="col">Comments</th>
                  <th scope="col">Status</th>
                  <th scope="col">Approve / Reject</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((element, index) => (
                  <tr key={index}>
                    <td>{element.id}</td>
                    <td>{element.name}</td>
                    <td>
                      {moment(element.dates).format('Do MMM YYYY')}
                    </td>
                    <td>
                      {(nameOfLeave(element.leavetype))}
                    </td>
                    <td>
                      {element.comments}
                    </td>
                    <td>
                      {(statusName(element.status))}
                    </td>
                    <td>
                      <button className="btn btn-success btn-sm" type="button" onClick={() => updateRequest(element, 2)}>Approve</button>
                      <button className="btn btn-danger btn-sm" type="button" onClick={() => updateRequest(element, 3)}>Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
