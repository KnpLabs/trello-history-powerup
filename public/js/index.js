const Promise = window.TrelloPowerUp.Promise

const HOURGLASS_ICON = 'https://img.icons8.com/metro/26/000000/historical.png'
const locale = navigator.language || navigator.userLanguage || 'en';

window.TrelloPowerUp.initialize({
  'card-back-section': (t, options) => getTranslations(locale)
    .then(response => response.json())
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

// getTranslations :: String -> Promise
const getTranslations = R.pipe(
  locale => locale.substring(0, 2),
  R.unless(
    R.contains(R.__, ['en', 'fr']),
    R.always('en'),
  ),
  locale => `translations/${locale}.json`,
  translationFile => fetch(translationFile, { method: 'GET' }),
)

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
    },
  })
)
