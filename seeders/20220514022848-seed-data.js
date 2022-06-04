module.exports = {
  async up(queryInterface, Sequelize) {
    const user = [
      {
        name: 'Spiderman',
        password: 'testing',
        role: 1,
        picture: 'spiderman.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Hulk',
        password: 'testing',
        role: 1,
        picture: 'hulk.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Ironman',
        password: 'testing',
        role: 2,
        picture: 'ironman.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Groot',
        password: 'testing',
        role: 1,
        picture: 'groot.png',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('users', user);

    const leave = [
      {
        user_id: 1,
        balance: JSON.stringify({
          AL: 18,
          SL: 10,
          ML: 4,
          CL: 5,
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        balance: JSON.stringify({
          AL: 10,
          SL: 5,
          ML: 0,
          CL: 0,
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        balance: JSON.stringify({
          AL: 36,
          SL: 10,
          ML: 0,
          CL: 0,
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('leaves', leave);

    const request = [
      {
        user_id: 1,
        approver_id: 3,
        dates: '2022-07-10',
        leave_type: 'AL',
        comments: 'Clearing Leave',
        status: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        approver_id: 3,
        dates: '2022-07-07',
        leave_type: 'CL',
        comments: 'My kid is starting school',
        status: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        approver_id: 3,
        dates: '2022-07-12',
        leave_type: 'AL',
        comments: 'Chill time',
        status: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        approver_id: 3,
        dates: '2022-07-12',
        leave_type: 'AL',
        comments: 'I need a break',
        status: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        approver_id: 3,
        dates: '2022-08-12',
        leave_type: 'SL',
        comments: 'Down with Covid',
        status: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('requests', request);

    const relationship = [
      {
        member_id: 1,
        approver_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        member_id: 2,
        approver_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        member_id: 4,
        approver_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('relationships', relationship);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('leaves', null, {});
    await queryInterface.bulkDelete('requests', null, {});
    await queryInterface.bulkDelete('relationships', null, {});
  },
};
