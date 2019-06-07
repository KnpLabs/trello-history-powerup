var Promise = TrelloPowerUp.Promise;

var BLACK_ROCKET_ICON = 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421';

// Connect to trello API
const authenticationSuccess = () => console.log('Successful authentication')
const authenticationFailure = () => console.log('Failed authentication')

window.Trello.authorize({
		type: 'popup',
		name: 'KNP Trello Extension',
		scope: {
	    read: 'true',
	    write: 'true'
		},
		expiration: 'never',
		success: authenticationSuccess,
		error: authenticationFailure,
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
