/* eslint-disable consistent-return */
export default function initUsersController(db) {
  const attemptLogin = async (request, response) => {
    console.log('login attempted');
    try {
      // run the query into User DB
      const user = await db.User.findOne({
        where: {
          name: request.body.name,
        },
      });
      // set default response obj
      const responseObj = { status: false, user: {} };

      if (user != null && user.dataValues.password === request.body.password) {
        console.log('login succesful');
        // change response object
        responseObj.status = true;
        responseObj.user = user;
        return response.send(responseObj);
      }
      response.send(responseObj);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    attemptLogin,
  };
}
