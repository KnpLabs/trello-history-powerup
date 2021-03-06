const t = window.TrelloPowerUp.iframe({
  appKey: '3fdd940c3f6ea9c4f8ed0817a71b1a4c',
  appName: 'History Power-Up'
})

t.render(() => t.get('organization', 'shared', 'translations')
  .then(renderHistory(t))
)

// renderHistory :: Object -> String -> _
const renderHistory = t => translations => t.getRestApi().getToken()
  .then(R.pipeP(
    getCardHistory(t.getRestApi().appKey, t.getContext().card),
    response => response.json(),
    R.tap(() => document.getElementById('history').innerHTML = ''),
    R.tap(() => toggleHistory(translations)),
    R.ifElse(
      R.compose(R.gt(2), R.length),
      R.tap(() => noHistory(translations)),
      // drop the first element as it is exactly the same as the description
      R.compose(R.map(renderCard), R.drop(1)),
    ),
  ))
  .catch(error => openAuthorizeIframe(t))

const toggleHistory = translations => {
  document.querySelector('button.load').innerHTML = translations.show_history;
  document.querySelector('button.load').style.display = 'block';

  document.querySelector('button.load').addEventListener('click', () => {
    const historyVisible = document.getElementById('history').style.display === 'block';

    document.querySelector('button.load').innerHTML = historyVisible 
      ? translations.show_history 
      : translations.hide_history
    ;
    document.querySelector('button.load').classList.remove(historyVisible ? 'float' : 'middle');
    document.querySelector('button.load').classList.add(historyVisible ? 'middle' : 'float');
    document.getElementById('history').style.display = historyVisible ? 'none' : 'block';
  });
}

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

// openAuthorizeIframe :: Object -> _
const openAuthorizeIframe = t => t.popup({
  title: 'Authorize to continue',
  url: 'authorize.html'
})

// noHistory :: String -> _
const noHistory = translations =>
  document.getElementById('history').innerHTML = `
    <span class="no-history">${translations.no_history}</span>
  `

// renderCard :: Card -> _
const renderCard = card => R.pipe(
  R.tap(article => article.innerHTML = createHistory(card)),
  R.tap(article => document.getElementById('history').appendChild(article)),
)(document.createElement('article'))

// createHistory :: Card -> String
const createHistory = card => `
  <div class="header">
    ${createAvatar(card)}
    <span class="member-name">${card['memberCreator']['fullName']}</span>
    <br>
    <span class="date">${formatDate(card['date'])}</span>
    <h4 class="title">${card['data']['card']['name']}</h4>
  </div>
  <div class="content">
    <div class="desc">${(new showdown.Converter()).makeHtml(card['data']['card']['desc'])}</div>
  </div>
`

// createAvatar :: Card -> String
const createAvatar = card => card['memberCreator']['avatarUrl'] !== null
  ? `<img
      class="member-avatar"
      src="${card['memberCreator']['avatarUrl']}/30.png"
      srcset="${card['memberCreator']['avatarUrl']}/30.png 1x"
      title="${card['memberCreator']['fullName']} (${card['memberCreator']['username']})"
    >`
  : `<div class="phenom-creator">
      <div class="member js-show-mem-menu" idmember="${card['memberCreator']['id']}">
        <span
          class="member-initials"
          title="${card['memberCreator']['fullName']} (${card['memberCreator']['username']})"
        >
          ${card['memberCreator']['initials']}
        </span>
      </div>
    </div>`

// formatDate :: String -> String
const formatDate = isoDate => (new Date(isoDate)).toLocaleString()
