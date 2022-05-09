/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Item from './Item.jsx';

// form to create new Bill
export default function ItemList({ items, people, updatePeopleList }) {
  // return of React component
  return (
    <div id="item-list-container" className="container-sm">
      <div className="row">
        {items.map((element, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3">
            <Item item={element} people={people} updatePeopleList={updatePeopleList} />
          </div>
        ))}
      </div>
    </div>
  );
}
