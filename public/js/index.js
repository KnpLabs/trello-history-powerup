const Promise = TrelloPowerUp.Promise

const BLACK_ROCKET_ICON = 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421'
const API_KEY = '3fdd940c3f6ea9c4f8ed0817a71b1a4c'

window.TrelloPowerUp.initialize({
	'card-buttons': (t, options) =>
		// t.set("member", "shared", "hello", "world")
		t.getRestApi()
			.getToken()
			.then(token => getCardHistory(token))
			.then(history => {
				console.warn(history);

				return [{
		      icon: BLACK_ROCKET_ICON,
		 		  text: 'History',
		      callback: t => t.popup({
						title: "History",
		        url: 'history.html',
		      }),
				}];
		})
}, {
	appKey: API_KEY,
	appName: 'KNP Trello Extension',
})

// getCardHistory :: String -> Promise
const getCardHistory = token => new Promise((resolve, reject) => {
	const xhr = new XMLHttpRequest()
	// TODO: make this dynamic
	const cardId = 'CNcJLRUB'

	xhr.open('GET', `https://api.trello.com/1/cards/${cardId}/actions?filter=updateCard:desc&key=${API_KEY}&token=${token}`)

	xhr.onload = () => (xhr.status >= 200 && xhr.status < 300)
				? resolve(JSON.parse(xhr.response))
				: reject(xhr.statusText)

	xhr.onerror = () => reject(xhr.statusText)

	xhr.send()
})
