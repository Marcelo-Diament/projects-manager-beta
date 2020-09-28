const setRepo = repo => {
  let repos = []
  if (localStorage.getItem('repos') && localStorage.getItem('repos') !== null) {
    repos = JSON.parse(localStorage.getItem('repos'))
  }
  repos.push(repo)
  localStorage.setItem('repos', JSON.stringify(repos))
  return repo
}

const fetchRepo = repoUrl => {
  let url = repoUrl.replace('github.com/', 'api.github.com/repos/')
  fetch(url)
    .then(response => {
      return response.json()
    })
    .then(json => {
      return setRepo(json)
    })
    .catch(err => console.log(err))
}

const getRepo = (repoUrl, refresh = false) => {
  let repo = {}
  if (!localStorage.getItem('repos') || localStorage.getItem('repos') === null || refresh === true) {
    repo = fetchRepo(repoUrl)
  } else {
    let repos = JSON.parse(localStorage.getItem('repos'))
    for (let repoSaved of repos) {
      if (repoSaved.html_url === repoUrl) {
        repo = repoSaved
      } else {
        repo = fetchRepo(repoUrl)
      }
    }
  }
  return repo
}

export default getRepo