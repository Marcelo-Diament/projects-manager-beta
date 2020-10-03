const setProjetos = json => {
  localStorage.setItem('projetos', JSON.stringify(json))
  return JSON.parse(localStorage.getItem('projetos'))
}

const fetchProjetos = () => {
  fetch('./data/projetos.json')
    .then(response => response.json())
    .then(json => setProjetos(json))
    .catch(err => console.log(err))
}

const getProjetos = (refresh = false) => {
  if (localStorage.getItem('projetos') === null || refresh === true) {
    return fetchProjetos()
  } else {
    return JSON.parse(localStorage.getItem('projetos'))
  }
}

export default getProjetos