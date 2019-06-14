const Promise = window.TrelloPowerUp.Promise

const BLACK_ROCKET_ICON = 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421'

const local = navigator.language || navigator.userLanguage || 'en';
const translationsFile = `translations/${local.substring(0,2)}.json`;
const allowedLocales = ['en', 'fr'];

const getTranslations = () => allowedLocales.includes(local.substring(0,2))
  ? fetch(translationsFile, {method: 'GET'}).then(response => response.json())
  : fetch(`translations/en.json`, {method: 'GET'}).then(response => response.json())

const askAuthorization = t => t.get('organization', 'shared', 'translations')
  .then(translations => ({
    title: translations.authorize_to_continue,
    icon: BLACK_ROCKET_ICON,
    content: {
      type: 'iframe',
      url: t.signUrl('./authorize.html'),
      height: 110
    }
  })
)

const renderHistory = t => t.get('organization', 'shared', 'translations')
  .then(translations => ({
    title: translations.history,
    icon: BLACK_ROCKET_ICON,
    content: {
      type: 'iframe',
      url: t.signUrl('./history.html'),
      height: 250
    }
  })
)

window.TrelloPowerUp.initialize({
  'card-back-section': (t, options) =>  getTranslations()
    .then(translations => t.set('organization', 'shared', 'translations', translations))
    .then(() => t.getRestApi()
      .isAuthorized()
      .then(isAuthorized => isAuthorized
        ? renderHistory(t)
        : askAuthorization(t)
      ),
    )
}, {
  appKey: '3fdd940c3f6ea9c4f8ed0817a71b1a4c',
  appName: 'KNP Trello History',
})
