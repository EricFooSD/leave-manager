/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import ItemList from './ItemList.jsx';
import PersonList from './PersonList.jsx';

// form to create new Bill
export default function NewBill({
  items, people, updatePeopleList, bill, createBill,
}) {
  const postBill = () => {
    axios
    // posting to Bill DB
      .post('/postNewBill', { bill })
      .then((response) => {
        console.log('bill posted to DB');
        console.log('response.data', response.data);
        const billID = response.data.bill.id;
        // after posting to Bill DB, get ID and post to people DB
        axios
          .post('/updatePeopleAmounts', { people, billID })
          .then((response2) => {
            console.log('bill posted to people DB');
            console.log('response.data', response2.data);
            // empty out bill
            createBill({});
          });
      })
      .catch((error) => { console.log(error); });
  };
  // return of React component
  return (
    <div id="new-bill-container" className="container-sm">
      <div className="row">
        <ItemList items={items} people={people} updatePeopleList={updatePeopleList} />
      </div>
      <div className="row">
        <PersonList people={people} bill={bill} />
      </div>
      <div className="row">
        <button className="btn btn-dark" type="button" onClick={postBill}>
          Save Bill
        </button>
      </div>
    </div>
  );
}
