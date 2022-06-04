/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable max-len */
import React, { useState } from 'react';
import moment from 'moment';

import LoginForm from './components/LoginForm.jsx';
import Account from './components/Account.jsx';
import Form from './components/Form.jsx';
import Table from './components/Table.jsx';
import LeaderAccount from './components/LeaderAccount.jsx';

moment().format();

export default function App() {
  // ================================
  //             STATES
  // ================================

  // States to store data
  const [user, setUser] = useState({});
  const [balance, setBalance] = useState({});
  const [requests, setRequests] = useState([]);
  const [teamBalance, setTeamBalance] = useState([]);

  // States to show / hide Create Request Form component
  const [showCreate, setShowCreate] = useState(false);

  // ================================
  //          HELPER FUNCTIONS
  // ================================

  // to toggle show / hide form
  const toggleForm = () => {
    setShowCreate(!showCreate);
  };

  // check to determine if to show the Create Request button
  const renderCreateButton = () => {
    // only show button then user is a Member
    if (Object.keys(user).length !== 0 && user.role === 1) {
      return (
        <div className="d-grid gap-2">
          <button className="btn btn-dark" type="button" onClick={toggleForm}>
            Create Request
          </button>
        </div>
      );
    }
  };

  // update User state that is used to store data on logged in user details
  const updateUser = (userInfo) => {
    console.log('user details stored in State');
    // console.log('userInfo', userInfo);
    setUser({ ...user, ...userInfo });
  };

  // update Balance state that is used to store data on leave balance of Member
  const updateBalance = (balanceInfo) => {
    console.log('balance details stored in State');
    setBalance({ ...balance, ...balanceInfo });
  };

  // update Team Balance state that is used to store data all leave balances of Leader's team
  const updateTeamBalance = (teamInfo) => {
    console.log('Team balance stored in State');
    teamInfo.sort((a, b) => ((b.id < a.id) ? 1 : -1));
    setTeamBalance([...teamInfo]);
  };

  // update Request state that is used to store data on all requests
  const updateRequestList = (existingRequests) => {
    existingRequests.sort((a, b) => ((b.dates < a.dates) ? 1 : -1));
    console.log('updating request list', existingRequests);
    setRequests([...existingRequests]);
  };

  // to determing which account dashboard component to render (Leader or Member)
  const renderAccount = () => {
    if (user.role === 1) {
      return (
        <div>
          <h4>
            Leave entitlement
          </h4>
          <div className="col-12 col-md-6 col-lg-4 col-xl-3">
            <Account user={user} balance={balance} />
          </div>
        </div>
      );
    } if (user.role === 2) {
      return (<LeaderAccount user={user} teamBalance={teamBalance} />);
    }
    return (<div>Error</div>);
  };

  // ================================
  //       RENDERING OF COMPONENT
  // ================================

  // if user is not logged in, display login component
  if (Object.keys(user).length === 0) {
    return (
      <LoginForm updateUser={updateUser} updateBalance={updateBalance} updateRequestList={updateRequestList} updateTeamBalance={updateTeamBalance} />
    );
  }

  return (
    <div id="main-container" className="container-sm">
      <div className="text-center">
        <img
          src={`/images/${user.picture}`}
          className="rounded-circle img-fluid"
          height="90"
          width="90"
        />
      </div>
      <div id="dashboard-container" className="container-sm">
        {renderAccount()}
      </div>
      <div id="form-container" className="container-sm">
        {renderCreateButton()}
        {showCreate ? <Form user={user} toggleForm={toggleForm} updateRequestList={updateRequestList} updateBalance={updateBalance} /> : <></>}
      </div>
      <div id="request-container" className="container-sm">
        <Table user={user} requests={requests} updateRequestList={updateRequestList} updateBalance={updateBalance} updateTeamBalance={updateTeamBalance} />
      </div>
    </div>
  );
}
