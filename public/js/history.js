const t = window.TrelloPowerUp.iframe({
  appKey: '3fdd940c3f6ea9c4f8ed0817a71b1a4c',
  appName: 'History Power-Up'
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

t.render(
  () => t.getRestApi().getToken()
  .then(getCardHistory(t.getRestApi().appKey, t.getContext().card))
  .then(response => response.json())
  .then(R.ifElse(
    R.compose(R.equals(0), R.length),
    R.tap(() => document.getElementById('history').innerHTML = `No history for now !`),
    // drop the first element as it is exactly the same as the description
    R.compose(R.map(renderCard), R.drop(1)),
  ))
)

// renderCard :: Card -> _
const renderCard = card => R.pipe(
  R.tap(article => article.innerHTML = createHistory(card)),
  R.prop('outerHTML'),
  R.tap(article => document.getElementById('history').innerHTML = article),
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
