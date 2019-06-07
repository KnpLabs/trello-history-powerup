const t = window.TrelloPowerUp.iframe();

t.get('card', 'shared', 'history').then(a => console.warn(a))
