const t = window.TrelloPowerUp.iframe();

const authorize = () =>
  t.getRestApi()
    .authorize({ scope: 'read,write' })
    .then(() => console.warn('Success!'))
    .catch(TrelloPowerUp.restApiError.AuthDeniedError, () => console.warn('Error !'))

t.render(() => document.querySelector('button')
  .addEventListener('click', authorize)
);
