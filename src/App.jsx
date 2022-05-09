/* eslint-disable max-len */
import React, { useState } from 'react';

import BillForm from './components/BillForm.jsx';
import Form from './components/Form.jsx';
import NewBill from './components/NewBill.jsx';

export default function App() {
  const [bill, setBill] = useState({});
  const [items, setItems] = useState([]);
  const [people, setPeople] = useState([]);

  const createBill = (newBill) => {
    console.log('bill created');
    setBill({ ...bill, ...newBill });
  };

  const createItemList = (newItem) => {
    console.log('new item added');
    const newBill = { ...bill };
    newBill.total += Number(newItem.price);
    setItems([...items, newItem]);
    setBill({ ...bill, ...newBill });
  };

  const createPersonList = (newPerson) => {
    console.log('new person added');
    setPeople([...people, newPerson]);
  };

  const updatePersonList = (newList) => {
    console.log('people list updated');
    setPeople(newList);
  };

  // element when user first lands on page
  if (Object.keys(bill).length === 0) {
    return (
      <BillForm createBill={createBill} />
    );
  }

  return (
    <div id="splitter-container" className="container-sm">
      <div className="text-center">
        <h2>
          Bill Splitter For:
          {' '}
          {bill.name}
        </h2>
      </div>
      <div id="form-container" className="container-sm">
        <Form createItem={createItemList} createPerson={createPersonList} />
      </div>
      <div id="new-bill-container" className="container-sm">
        <NewBill items={items} people={people} updatePeopleList={updatePersonList} bill={bill} createBill={createBill} />
      </div>
    </div>
  );
}
