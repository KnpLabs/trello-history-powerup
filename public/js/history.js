const t = window.TrelloPowerUp.iframe();

// formatDate = String -> String
const formatDate = isoDate => (new Date(isoDate)).toLocaleString()

// renderCard :: Card -> _
const renderCard = card => {
  const historyElement = document.createElement('article')

  historyElement.innerHTML = `
    <article>
        <div>
            <img class="member-avatar" src="${card['memberCreator']['avatarUrl']}/30.png" srcset="${card['memberCreator']['avatarUrl']}/30.png 1x" title="${card['memberCreator']['fullName']} (${card['memberCreator']['username']})">
            <span>${card['memberCreator']['fullName']}</span>
            <br>
            <span>${formatDate(card['date'])}</span>
        </div>
        <div>
            <h4>${card['data']['card']['name']}</h4>
            <div>${card['data']['card']['desc']}</div>
        </div>
    </article>
  `

  document.getElementById('history').appendChild(historyElement)
}

t.get('card', 'shared', 'history').then(cards => cards.map(renderCard))
