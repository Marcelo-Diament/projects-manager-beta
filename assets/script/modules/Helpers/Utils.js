const debugMode = true

const body = document.querySelector('body'),
  searchContainer = document.querySelector('#searchContainer'),
  root = document.querySelector('#root'),
  searchAndFilterForm = document.querySelector('#searchAndFilterForm'),
  formBusca = document.querySelector('#formBusca'),
  formOrdenar = document.querySelector('#formOrdenar'),
  formBtns = document.querySelector('#formBtns'),
  resultsContainer = document.querySelector('#resultsContainer'),
  modais = document.querySelector('#modais'),
  projetoSelect = document.querySelector('#projetoSelect'),
  temaSelect = document.querySelector('#temaSelect'),
  orderPorSelect = document.querySelector('#orderPorSelect'),
  ascInput = document.querySelector('#ascInput'),
  descInput = document.querySelector('#descInput'),
  filterResultsProjetosBtn = document.querySelector('#filterResultsProjetosBtn'),
  resulstsContainer = document.querySelector('#resultsContainer'),
  projetosLinksMenu = document.querySelector('#projetosLinksMenu'),
  temasLinksMenu = document.querySelector('#temasLinksMenu')

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
  let response = refresh === true ? container.innerHTML = html : response = container.innerHTML += html
  return await response
}

export { debugMode, mainVariables, appendHTML }