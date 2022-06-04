export default function initLeaveController(db) {
  // get leave balance of member
  const getLeaveBalance = async (request, response) => {
    try {
      const user = request.body;
      const leaveBalance = await db.Leave.findOne({
        where: {
          userId: user.id,
        },
      });
      response.send({ leaveBalance });
    } catch (error) {
      console.log(error);
    }
  };

  // get leave balance of Team members
  const getTeamBalance = async (request, response) => {
    try {
      const user = request.body;
      const teamBalance = await db.sequelize.query(
        `SELECT leaves.id, leaves.user_id, users.name, users.picture, leaves.balance, relationships.approver_id FROM leaves INNER JOIN relationships ON leaves.user_id = relationships.member_id INNER JOIN users ON leaves.user_id = users.id WHERE relationships.approver_id = ${user.id}`,
      );
      response.send({ teamBalance });
    } catch (error) {
      console.log(error);
    }
  };

  // create new leave request for member
  const postRequest = async (request, response) => {
    try {
      const newLeaveRequest = request.body;

      // find approver of member from Relationship DB
      const approver = await db.Relationship.findOne({
        where: {
          memberId: newLeaveRequest.user.id,
        },
      });

      // create request into Requests DB
      const createLeaveRequest = await db.Request.create({
        userId: newLeaveRequest.user.id,
        approverId: approver.approverId,
        dates: newLeaveRequest.date,
        leaveType: newLeaveRequest.leaveType,
        comments: newLeaveRequest.comment,
        status: 1,
      });

      // update leave balance in Leaves DB
      const leaveAccount = await db.Leave.findOne({
        where: {
          userId: newLeaveRequest.user.id,
        },
      });
      const newLeaveBalance = { ...leaveAccount.balance };

      newLeaveBalance[newLeaveRequest.leaveType] -= 1;
      await leaveAccount.update(
        { balance: newLeaveBalance },
      );

      response.send({ createLeaveRequest });
    } catch (error) {
      console.log(error);
    }
  };

  // retrieve all requests for member
  const getRequests = async (request, response) => {
    try {
      const user = request.body;
      const allExistingRequests = await db.sequelize.query(
        `SELECT requests.id, requests.user_id, requests.approver_id, requests.dates, requests.leave_type AS leaveType, requests.comments, requests.status FROM requests WHERE requests.user_id = ${user.id}`,
      );
      response.send({ allExistingRequests });
    } catch (error) {
      console.log(error);
    }
  };

  // retrieve all requests routed to Leader
  const getLeaderRequests = async (request, response) => {
    try {
      const user = request.body;
      const allExistingRequests = await db.sequelize.query(
        `SELECT requests.id, requests.user_id, requests.approver_id, requests.dates, requests.leave_type AS leaveType, requests.comments, requests.status, users.name FROM requests INNER JOIN users ON requests.user_id = users.id WHERE requests.approver_id = ${user.id}`,
      );
      response.send({ allExistingRequests });
    } catch (error) {
      console.log(error);
    }
  };

  // delete request of member
  const deleteRequest = async (request, response) => {
    try {
      const toRemove = request.body.leaveRequest;

      // remove leave request from Requests Table
      await db.Request.destroy({
        where: {
          id: toRemove.id,
        },
      });

      // update leave balance in Leaves Table
      if (toRemove.status < 3) {
        const leaveAccount = await db.Leave.findOne({
          where: {
            userId: toRemove.user_id,
          },
        });
        const newLeaveBalance = { ...leaveAccount.balance };

        newLeaveBalance[toRemove.leavetype] += 1;
        await leaveAccount.update(
          { balance: newLeaveBalance },
        );
      }

      response.send('Record Deleted');
    } catch (error) {
      console.log(error);
    }
  };

  //  update request of member
  const updateRequest = async (request, response) => {
    try {
      const toUpdate = request.body.leaveRequest;
      const { newStatus } = request.body;

      // only action when there is a change in leave status
      if (toUpdate.status !== newStatus) {
      // update leave status in Requests Table
        await db.Request.update(
          { status: newStatus },
          { where: { id: toUpdate.id } },
        );

        // update leave balance in Leaves Table
        const leaveAccount = await db.Leave.findOne({
          where: {
            userId: toUpdate.user_id,
          },
        });
        const newLeaveBalance = { ...leaveAccount.balance };
        if (newStatus === 3) {
          newLeaveBalance[toUpdate.leavetype] += 1;
        } else if (newStatus === 2) {
          newLeaveBalance[toUpdate.leavetype] -= 1;
        }

        await leaveAccount.update(
          { balance: newLeaveBalance },
        );
      }
      response.send('Record Updated');
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getLeaveBalance,
    getTeamBalance,
    postRequest,
    getRequests,
    deleteRequest,
    getLeaderRequests,
    updateRequest,
  };
}
