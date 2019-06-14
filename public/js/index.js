const Promise = window.TrelloPowerUp.Promise

const HOURGLASS_ICON = 'https://img.icons8.com/metro/26/000000/historical.png'

const local = navigator.language || navigator.userLanguage || 'en';
const translationsFile = `translations/${local.substring(0,2)}.json`;
const allowedLocales = ['en', 'fr'];

const getTranslations = () => allowedLocales.includes(local.substring(0,2))
  ? fetch(translationsFile, {method: 'GET'}).then(response => response.json())
  : fetch(`translations/en.json`, {method: 'GET'}).then(response => response.json())

const askAuthorization = t => t.get('organization', 'shared', 'translations')
  .then(translations => ({
    title: translations.authorize_to_continue,
    icon: HOURGLASS_ICON,
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
    icon: HOURGLASS_ICON,
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
