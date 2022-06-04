import { resolve } from 'path';
import db from './models/index.mjs';
import initUsersController from './controllers/user.mjs';
import initLeaveController from './controllers/leave.mjs';

export default function routes(app) {
  const UsersController = initUsersController(db);
  const LeaveController = initLeaveController(db);

  // Root route renders Webpack-generated main.html file
  app.get('/', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
  // check login details
  app.post('/attemptLogin', UsersController.attemptLogin);

  // check leave balance
  app.post('/getLeaveBalance', LeaveController.getLeaveBalance);

  // create new leave request
  app.post('/postRequest', LeaveController.postRequest);

  // get all existing leave requests of member
  app.post('/getRequests', LeaveController.getRequests);

  // delete request of member
  app.post('/deleteRequest', LeaveController.deleteRequest);

  // update request of member
  app.post('/updateRequest', LeaveController.updateRequest);

  // get all existing leave requests of member
  app.post('/getLeaderRequests', LeaveController.getLeaderRequests);

  // get all leave balance of Team
  app.post('/getTeamBalance', LeaveController.getTeamBalance);
}
