const t = window.TrelloPowerUp.iframe({
  appKey: '3fdd940c3f6ea9c4f8ed0817a71b1a4c',
  appName: 'History Power-Up'
});

const authorize = () =>
  t.getRestApi()
    .authorize({ scope: 'read,write' })
    .then(() => console.warn('Success!'))
    .catch(TrelloPowerUp.restApiError.AuthDeniedError, () => console.warn('Error !'))

t.render(() => document.querySelector('button')
  .addEventListener('click', authorize)
);
