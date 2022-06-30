/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';

// form to create new Bill
export default function Account({ user, balance }) {
  // ================================
  //       RENDERING OF COMPONENT
  // ================================

  // are all user properties always filled out by the user? Is everything required in the db and on the frontend?
  // If no, then you could potentially render more than necessary here.
  return (
    <div id="leave-container" className="container-sm">
      <div className="row">
        <div className="col">
          <h4>
            <img
              src={`/images/${user.picture}`}
              className="rounded-circle img-fluid"
              height="30"
              width="30"
            />
            {'   '}
            {user.name}
          </h4>
          <p>
            Annual Leave:
            {' '}
            {balance.AL}
          </p>
          <p>
            Sick Leave:
            {' '}
            {balance.SL}
          </p>
          <p>
            Marriage Leave:
            {' '}
            {balance.ML}
          </p>
          <p>
            Childcare Leave:
            {' '}
            {balance.CL}
          </p>
        </div>
      </div>
    </div>
  );
}
