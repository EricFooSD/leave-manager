/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import Account from './Account.jsx';

// form to create new Bill
export default function LeaderAccount({ user, teamBalance }) {
  // ================================
  //       RENDERING OF COMPONENT
  // ================================
  return (
    <div id="container" className="container-sm">
      <div className="row">
        <h3>
          {user.name}
          's Team
        </h3>
      </div>
      <div className="row">
        {teamBalance.map((element, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3">
            <Account user={element} balance={element.balance} />
          </div>
        ))}
      </div>
    </div>
  );
}
