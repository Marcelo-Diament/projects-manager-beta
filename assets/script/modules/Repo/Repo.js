const setRepo = repo => {
  // TODO: create an array of repos URLs to avoid fetching repeated repos
  let repos
  if (localStorage.getItem('repos') !== null) {
    repos = JSON.parse(localStorage.getItem('repos'))
    for (let storedRepo of repos) {
      if (repo.id === storedRepo.id) {
        return repo
      }
    }
  } else {
    repos = []
  }
  repos.push(repo)
  repos = JSON.stringify(repos)
  localStorage.setItem('repos', repos)
  return repo
}

async function fetchRepo(repoUrl) {
  let url = await repoUrl.replace('github.com/', 'api.github.com/repos/')
  let response = await fetch(`${url}`)
  let repo = await response.json()
  return await setRepo(repo)
}

const getRepo = (repoUrl, refresh = false) => {
  let repo = {}
  if (!localStorage.getItem('repos') || localStorage.getItem('repos') === null || refresh === true) {
    fetchRepo(repoUrl).then(repo)
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