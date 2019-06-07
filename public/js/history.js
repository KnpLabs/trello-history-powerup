const success = data => console.warn(data)
const error = data => console.warn(data)

Trello.get('/cards/CNcJLRUB', success, error);
