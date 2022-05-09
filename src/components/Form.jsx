/* eslint-disable react/prop-types */
import React, { useState } from 'react';

// form to create new Bill
export default function Form({ createItem, createPerson }) {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [person, setPerson] = useState('');

  // functions for items
  const createItemList = () => {
    createItem({
      name: item,
      price: Number(price),
    });
    setPrice('');
    setItem('');
  };

  const handleChangeItem = (event) => {
    const newItem = event.target.value;
    setItem(newItem);
  };

  const handleChangePrice = (event) => {
    const newPrice = event.target.value;
    setPrice(newPrice);
  };

  // functions for person

  const createPersonList = () => {
    createPerson({
      name: person,
      amount: 0,
    });
    setPerson('');
  };

  const handleChangePerson = (event) => {
    const newPerson = event.target.value;
    setPerson(newPerson);
  };

  // return of React component
  return (
    <div id="create-form-container" className="container-sm">
      <div className="row" id="item-price-form">
        <div className="input-group">
          <input id="item-input" type="text" placeholder="Item Input" className="form-control" value={item} onChange={handleChangeItem} />
          <input id="price-input" type="number" placeholder="Price Input" className="form-control" value={price} onChange={handleChangePrice} />
          <button className="btn btn-dark" type="button" onClick={createItemList}>
            Submit
          </button>
        </div>
      </div>
      <div className="row" id="person-form">
        <div className="input-group">
          <input id="person-input" type="text" placeholder="Person Input" className="form-control" value={person} onChange={handleChangePerson} />
          <button className="btn btn-dark" type="button" onClick={createPersonList}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
