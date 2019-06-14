// formatDate :: String -> String
const formatDate = isoDate => (new Date(isoDate)).toLocaleString()

// createHistory :: Card -> String
const createHistory = card => `
  <div class="header">
    <img class="member-avatar" src="${card['memberCreator']['avatarUrl']}/30.png" srcset="${card['memberCreator']['avatarUrl']}/30.png 1x" title="${card['memberCreator']['fullName']} (${card['memberCreator']['username']})">
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

R.map(renderCard, JSON.parse(sessionStorage.getItem('history')))
