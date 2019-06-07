var creationSuccess = function (data) {
  console.log('Card created successfully.');
  console.log(JSON.stringify(data, null, 2));
};

var newCard = {
  name: 'New Test Card',
  desc: 'This is the description of our new card.',
  // Place this card at the top of our list
  idList: "5cfa2939e3877865b4f93be0",
  pos: 'top'
};

window.Trello.post('/cards/', newCard, creationSuccess);
