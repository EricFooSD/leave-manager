/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

// form to create new Bill
export default function Item({ people, item, updatePeopleList }) {
  const [personSelected, setPersonSelected] = useState();
  const [payerList, setPayerList] = useState([]);

  const handleSelectPerson = (event) => {
    const newPerson = event.target.value;
    setPersonSelected(newPerson);
  };

  const addPayerForItem = () => {
    console.log('personSelected', personSelected);
    if (personSelected !== 'Select a Person' && !payerList.includes(personSelected)) {
      // calculate old price per person
      let oldCostPerPerson = 0;
      if (payerList.length !== 0) {
        oldCostPerPerson = Number(item.price) / payerList.length;
      }

      // handle adding new payer
      const newPayer = personSelected;
      const newPayerList = [...payerList, newPayer];

      // calculate new price per person
      const costPerPerson = Number(item.price) / newPayerList.length;

      // update main people list
      const newPeopleList = [...people];
      newPeopleList.forEach((payer) => {
        if (newPayerList.includes(payer.name)) {
          if (payerList.includes(payer.name)) {
            payer.amount -= oldCostPerPerson;
          }
          payer.amount += costPerPerson;
        }
      });
      updatePeopleList(newPeopleList);
      setPayerList([...payerList, newPayer]);
    }
  };

  // return of React component
  return (
    <div id="item-container" className="container-sm">
      <div className="row" id="item">
        <div className="col text-center">
          <h4>
            {item.name}
            : $
            {item.price}
          </h4>
        </div>
      </div>
      <div className="row" id="item-people">
        <div className="input-group">
          <select className="form-select" id="select-person" onChange={handleSelectPerson}>
            <option>Select a Person</option>
            {people.map((element, index) => (
              <option key={index}>{element.name}</option>
            ))}
          </select>
          <button className="btn btn-success" type="button" onClick={addPayerForItem}>Add Person</button>
        </div>
      </div>
      <div className="row" id="item-people-list">
        <div className="col">
          <ul className="list-group list-group-numbered">
            {payerList.map((element, index) => (
              <li key={index} className="list-group-item list-group-item-secondary">
                {index + 1}
                .
                {' '}
                {element}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
