const Promise = window.TrelloPowerUp.Promise

const BLACK_ROCKET_ICON = 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421'

const askAuthorization = t => ({
  title: 'Authorize to continue',
  icon: BLACK_ROCKET_ICON,
  content: {
    type: 'iframe',
    url: t.signUrl('./authorize.html'),
    height: 110
  }
})

const renderHistory = t => ({
  title: 'History',
  icon: BLACK_ROCKET_ICON,
  content: {
    type: 'iframe',
    url: t.signUrl('./history.html'),
    height: 250
  }
})

window.TrelloPowerUp.initialize({
  'card-back-section': (t, options) => t.getRestApi()
    .isAuthorized()
    .then(isAuthorized => isAuthorized
      ? renderHistory(t)
      : askAuthorization(t)
    ),
}, {
  appKey: '3fdd940c3f6ea9c4f8ed0817a71b1a4c',
  appName: 'KNP Trello Extension',
})
