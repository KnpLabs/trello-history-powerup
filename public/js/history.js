const success = data => console.warn(data)
const error = data => console.warn(data)

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

window.Trello.get('/cards/CNcJLRUB', success, error);
