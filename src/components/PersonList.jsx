/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

// form to create new Bill
export default function PersonList({ people, bill }) {
  // return of React component
  return (
    <div id="people-list-container" className="container-sm">
      <div className="row">
        <div className="col-12 text-center">
          <h4>Amount Owed</h4>
        </div>
        <div className="col-12">
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-dark">
                <th scope="col">Name</th>
                <th scope="col">Amount Owed</th>
              </tr>
            </thead>
            <tbody>
              {people.map((element, index) => (
                <tr key={index}>
                  <td>{element.name}</td>
                  <td>
                    $
                    {(Math.round(element.amount * 100) / 100).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="table-warning">
                <td>Total</td>
                <td>
                  $
                  {bill.total}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
