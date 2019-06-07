var Promise = TrelloPowerUp.Promise;

var BLACK_ROCKET_ICON = 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421';

// Connect to trello API
Trello.authorize({
		type: "popup",
		name: "KNP Trello Extension",
		expiration: "never",
		success: () => console.warn("Successfully authorized to Trello API."),
		error: () =>  console.error("An error occured during Trello authorization. Please try again."),
})

TrelloPowerUp.initialize({
	'card-buttons': (t, options) =>
		t.set("member", "shared", "hello", "world")
		.then(() => [{
	      icon: BLACK_ROCKET_ICON,
	 		  text: 'History',
	      callback: t => t.popup({
					title: "History",
	        url: 'history.html',
	      }),
		}])
});



// var creationSuccess = function (data) {
//   console.log('Card created successfully.');
//   console.log(JSON.stringify(data, null, 2));
// };
//
// var newCard = {
//   name: 'New Test Card',
//   desc: 'This is the description of our new card.',
//   // Place this card at the top of our list
//   idList: 1,
//   pos: 'top'
// };
//
// const getCards = () => window.Trello.post('/cards/', newCard, creationSuccess)
