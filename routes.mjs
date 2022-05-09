import { resolve } from 'path';
import db from './models/index.mjs';
import initBillsController from './controllers/bills.mjs';
import initPeopleController from './controllers/people.mjs';

export default function routes(app) {
  const BillsController = initBillsController(db);
  const PeopleController = initPeopleController(db);
  // Root route renders Webpack-generated main.html file
  app.get('/', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
  // post new bill
  app.post('/postNewBill', BillsController.createBill);

  // update list of people in DB
  app.post('/updatePeopleAmounts', PeopleController.updatePeople);
}
