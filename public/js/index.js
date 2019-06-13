const Promise = window.TrelloPowerUp.Promise

const BLACK_ROCKET_ICON = 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421'
const API_KEY = '3fdd940c3f6ea9c4f8ed0817a71b1a4c'

const openAuthorizeIframe = t => t.popup({
  title: 'Authorize to continue',
  url: 'authorize.html'
})

const askAuthorization = t => ({
  title: 'Authorize to continue',
  icon: BLACK_ROCKET_ICON,
  content: {
    type: 'iframe',
    url: t.signUrl('./authorize.html'),
    height: 110
  }
})

const renderHistory = t => t.getRestApi()
  .getToken()
  .then(getCardHistory(t.getRestApi().appKey, t.getContext().card))
  .then(history => t.set('card', 'shared', 'history', history))
  .then(() => ({
    title: 'History',
    icon: BLACK_ROCKET_ICON,
    content: {
      type: 'iframe',
      url: t.signUrl('./history.html'),
      height: 250
    }
  }))
  .catch(error => openAuthorizeIframe(t))

window.TrelloPowerUp.initialize({
  'card-back-section': (t, options) => t.getRestApi()
    .isAuthorized()
    .then(isAuthorized => isAuthorized
      ? renderHistory(t)
      : askAuthorization(t)
    ),
}, {
  appKey: API_KEY,
  appName: 'KNP Trello Extension',
})

// getCardHistory :: (String, String) -> String -> Promise
const getCardHistory = (key, cardId) => token => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()

  xhr.open('GET', `https://api.trello.com/1/cards/${cardId}/actions?filter=updateCard:desc&key=${key}&token=${token}`)

  xhr.onload = () => (xhr.status >= 200 && xhr.status < 300)
    ? resolve(JSON.parse(xhr.response))
    : reject(xhr.statusText)

  xhr.onerror = () => reject(xhr.statusText)
  xhr.send()
})
