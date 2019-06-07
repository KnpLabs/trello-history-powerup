/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var BLACK_ROCKET_ICON = 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421';

TrelloPowerUp.initialize({
  // Start adding handlers for your capabilities here!
	'card-buttons': (t, options) =>
		t.set("member", "shared", "hello", "world")
		.then(() => [{
	      icon: BLACK_ROCKET_ICON,
	 		  text: 'History',
	      callback: t => t.popup({
					title: "History",
	        url: 'estimate.html',
	      }),
		}])
});
