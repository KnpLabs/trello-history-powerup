const success = data => console.warn(data)
const error = data => console.warn(data)

window.Trello.get('/cards/CNcJLRUB', success, error);
