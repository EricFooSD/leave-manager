/* eslint-disable react/prop-types */
import React, { useState } from 'react';

// form to create new Bill
export default function BillForm({ createBill }) {
  const [billName, setBillName] = useState('');

  const createNewBill = () => {
    createBill({ name: billName, total: 0 });
    setBillName('');
  };

  const handleChange = (event) => {
    // Retrieve input field value from JS event object.
    const inputName = event.target.value;
    // Log input field value to verify what we typed.
    // console.log(inputName);
    // Only update the input field's value with validation is necessary
    setBillName(inputName);
  };

  // return of React component
  return (
    <div id="create-bill-container" className="container-sm">
      <div className="row" id="submit-bill-form">
        {' '}
        <h1>Create Bill</h1>
        <div className="input-group mb-3">
          <input id="input-bill-name" className="form-control" placeholder="Bill Name" value={billName} onChange={handleChange} />
          <button className="btn btn-dark" type="button" onClick={createNewBill}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
