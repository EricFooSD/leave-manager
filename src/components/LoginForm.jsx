/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';

// form to create new Bill
export default function LoginForm({
  updateUser, updateBalance, updateRequestList, updateTeamBalance,
}) {
  // ================================
  //             STATES
  // ================================
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // ================================
  //          HELPER FUNCTIONS
  // ================================

  // change state as user types
  const handleInputName = (event) => {
    const newName = event.target.value;
    setName(newName);
  };

  // change state as user types
  const handleInputPassword = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  // AJAX call to attempt login. if sucessful, return all relevant account info
  const attemptLogin = () => {
    axios
      .post('/attemptLogin', { name, password })
      .then((response) => {
        // retrieve info when logged in user is a Team Member
        if (response.data.status && response.data.user.role === 1) {
          updateUser(response.data.user);
          // get leave balance of member
          axios
            .post('/getLeavebalance', response.data.user)
            .then((response2) => {
              updateBalance({ ...response2.data.leaveBalance.balance });
              // get all requests of member
              axios
                .post('/getRequests', response.data.user)
                .then((response3) => {
                  updateRequestList(response3.data.allExistingRequests[0]);
                });
            });
        }

        // retrieve info when logged in user is a Team Leader
        if (response.data.status && response.data.user.role === 2) {
          updateUser(response.data.user);
          // get leave balance of team
          axios
            .post('/getTeamBalance', response.data.user)
            .then((response2) => {
              updateTeamBalance(response2.data.teamBalance[0]);
              // get all requests routed to Team Leader
              axios
                .post('/getLeaderRequests', response.data.user)
                .then((response3) => {
                  updateRequestList(response3.data.allExistingRequests[0]);
                });
            });
        }
      })
      .catch((error) => { console.log(error); });
  };

  // ================================
  //       RENDERING OF COMPONENT
  // ================================
  return (
    <div id="login-container" className="container-sm">
      <div className="row" id="login-form">
        <div className="input-group">
          <input id="name-input" type="text" placeholder="Name" className="form-control" value={name} onChange={handleInputName} />
          <input id="password-input" type="password" placeholder="Password" className="form-control" value={password} onChange={handleInputPassword} />
          <button className="btn btn-dark" type="button" onClick={attemptLogin}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
