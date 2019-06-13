// formatDate :: String -> String
const formatDate = isoDate => (new Date(isoDate)).toLocaleString()

// renderCard :: Card -> _
const renderCard = card => {
  const historyElement = document.createElement('article')

  historyElement.innerHTML = `
    <div class="header">
      <img class="member-avatar" src="${card['memberCreator']['avatarUrl']}/30.png" srcset="${card['memberCreator']['avatarUrl']}/30.png 1x" title="${card['memberCreator']['fullName']} (${card['memberCreator']['username']})">
      <span class="member-name">${card['memberCreator']['fullName']}</span>
      <br>
      <span class="date">${formatDate(card['date'])}</span>
    </div>
    <div class="content">
      <h4 class="title">${card['data']['card']['name']}</h4>
      <div class="desc">${card['data']['card']['desc']}</div>
    </div>
  `

  document.getElementById('history').appendChild(historyElement)
}

const history = JSON.parse(sessionStorage.getItem('history'))

history.map(renderCard)
