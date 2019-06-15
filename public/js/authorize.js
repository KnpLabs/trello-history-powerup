const t = window.TrelloPowerUp.iframe({
  appKey: '3fdd940c3f6ea9c4f8ed0817a71b1a4c',
  appName: 'KNP Trello History'
});

// authorize :: () -> _
const authorize = () =>
  t.getRestApi()
    .authorize({ scope: 'read,write' })
    .then(() => console.warn('Success!'))
    .catch(TrelloPowerUp.restApiError.AuthDeniedError, () => console.warn('Error !'))

t.render(
  () => t.get('organization', 'shared', 'translations').then(
    R.pipe(
      R.tap(translations => document.querySelector('p.message').innerHTML = translations.authorization_message),
      R.tap(translations => document.querySelector('button').innerHTML = translations.authorize),
      R.tap(translations => document.querySelector('button').addEventListener('click', authorize)),
    )
  )
);
