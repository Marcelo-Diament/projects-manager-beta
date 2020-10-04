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
  temasLinksMenu = document.querySelector('#temasLinksMenu'),
  prazoProjeto = '01/26/2021'

const mainVariables = {
  body,
  searchContainer,
  root,
  searchAndFilterForm,
  formBusca,
  formOrdenar,
  formBtns,
  resultsContainer,
  modais,
  projetoSelect,
  temaSelect,
  orderPorSelect,
  ascInput,
  descInput,
  filterResultsProjetosBtn,
  resulstsContainer,
  projetosLinksMenu,
  temasLinksMenu,
  prazoProjeto
}

const appendHTML = async (html, container = body, refresh = false) => {
  let result
  if (refresh === true) {
    container.innerHTML = await html
  } else {
    result = container.innerHTML += await html
  }
  return result
}

const dateDiff = date => {
  let prazo = new Date(date).getTime()
  let hj = new Date().getTime()
  let diferenca = Math.ceil((prazo - hj) / 86400000)
  return diferenca
}

export { debugMode, mainVariables, appendHTML, dateDiff }