export default function initPeopleController(db) {
  const updatePeople = async (request, response) => {
    try {
      console.log('request.body', request.body);
      const ID = request.body.billID;
      const payers = [...request.body.people];
      payers.forEach((payer) => {
        payer.billId = ID;
      });
      console.log('payers', payers);
      const updatePayer = await db.Person.bulkCreate(payers);
      response.send({ updatePayer });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    updatePeople,
  };
}
