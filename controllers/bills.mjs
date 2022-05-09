export default function initBillsController(db) {
  const createBill = async (request, response) => {
    try {
      console.log('request.body', request.body);
      const bill = await db.Bill.create(request.body.bill);
      response.send({ bill });
    } catch (error) {
      console.log(error);
    }
  };
  return {
    createBill,
  };
}
