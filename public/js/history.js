// // Connect to trello API
// const authenticationSuccess = () => console.log('Successful authentication')
// const authenticationFailure = () => console.log('Failed authentication')
//
// window.Trello.authorize({
// 		type: 'popup',
// 		name: 'KNP Trello Extension',
// 		scope: {
// 	    read: 'true',
// 	    write: 'true'
// 		},
// 		expiration: 'never',
// 		success: authenticationSuccess,
// 		error: authenticationFailure,
// })
//
// // Get card history
// const success = data => console.warn(data)
// const error = data => console.warn(data)
// // TODO: dynamically get card id
// const cardId = 'CNcJLRUB';
//
// window.Trello.get(`/cards/${cardId}`, success, error);

const t = window.TrelloPowerUp.iframe();

t.get('card').then(a => console.warn(a))
