const creationSuccess = (data) => {
  console.log(':ah:');
  console.log(JSON.stringify(data, null, 2));
};

const newCard = {
  name: 'New Test Card',
  desc: 'This is the description of our new card.',
  idList: "5cfa2939e3877865b4f93be0",
  pos: 'top'
};

Trello.post('/cards/', newCard, creationSuccess);
