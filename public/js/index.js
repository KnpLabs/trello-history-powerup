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
  .then(R.pipeP(
    getCardHistory(t.getRestApi().appKey, t.getContext().card),
    response => response.json(),
    saveHistoryInLocaleDB,
    () => ({
      title: 'History',
      icon: BLACK_ROCKET_ICON,
      content: {
        type: 'iframe',
        url: t.signUrl('./history.html'),
        height: 250
      }
    })
  ))
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
const getCardHistory = (key, cardId) => token =>
  fetch(R.join('', [
    `https://api.trello.com/1/cards/${cardId}/actions`,
    `?filter=updateCard:desc`,
    `&key=${key}`,
    `&token=${token}`,
  ]), {
    method: 'GET',
  })

// saveHistoryInLocaleDB :: Object -> Promise
//
// Trello natively use t.set() and t.get() methods to pass data a long different
// scripts involved in running the power up, but it has a 4096 characters limit,
// which is not enough to carry history data.
//
// See https://developers.trello.com/docs/getting-and-setting-custom-data
//
// The following function is used to bypass this limit: it compress and stores
// history data in the session storage.
//
const saveHistoryInLocaleDB = R.pipe(
  R.compose(LZString.compress, JSON.stringify),
  R.tap(history => sessionStorage.setItem('history', history)),
  R.tap(history => new Promise(resolve => resolve(history)))
)
