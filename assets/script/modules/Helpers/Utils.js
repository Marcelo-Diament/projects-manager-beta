const debugMode = true

let body = document.querySelector('body'),
  searchContainer = document.querySelector('#searchContainer'),
  root = document.querySelector('#root'),
  searchAndFilterForm = document.querySelector('#searchAndFilterForm'),
  formBusca = document.querySelector('#formBusca'),
  formOrdenar = document.querySelector('#formOrdenar'),
  formBtns = document.querySelector('#formBtns'),
  resultsContainer = document.querySelector('#resultsContainer'),
  modais = document.querySelector('#modais')

const mainVariables = {
  body,
  root,
  searchContainer,
  searchAndFilterForm,
  formBusca,
  formOrdenar,
  formBtns,
  resultsContainer,
  modais
}

const appendHTML = async (html, container = body, refresh = false) => {
  let response
  response = refresh === true ? container.innerHTML = html : response = container.innerHTML += html
  return await response
}

export { debugMode, mainVariables, appendHTML }