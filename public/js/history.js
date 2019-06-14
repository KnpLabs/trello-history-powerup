// formatDate :: String -> String
const formatDate = isoDate => (new Date(isoDate)).toLocaleString()

// createHistory :: Card -> String
const createHistory = card => `
  <div class="header">
    <img
      class="member-avatar"
      src="${card['memberCreator']['avatarUrl']}/30.png"
      srcset="${card['memberCreator']['avatarUrl']}/30.png 1x"
      title="${card['memberCreator']['fullName']} (${card['memberCreator']['username']})"
    />
    <span class="member-name">${card['memberCreator']['fullName']}</span>
    <br>
    <span class="date">${formatDate(card['date'])}</span>
  </div>
  <div class="content">
    <h4 class="title">${card['data']['card']['name']}</h4>
    <div class="desc">
      ${(new showdown.Converter()).makeHtml(card['data']['card']['desc'])}
    </div>
  </div>
`

// renderCard :: Card -> _
const renderCard = card => R.pipe(
  R.tap(article => article.innerHTML = createHistory(card)),
  R.tap(article => document.getElementById('history').appendChild(article)),
)(document.createElement('article'))

R.ifElse(
  R.compose(R.equals(0), R.length),
  R.tap(() => document.getElementById('history').innerHTML = `No history for now !`),
  // drop the first element as it is exactly the same as the description
  R.compose(R.map(renderCard), R.drop(1)),
)(JSON.parse(sessionStorage.getItem('history')))
