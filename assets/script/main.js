window.onload = () => {

  const projetoSelect = document.querySelector('#projetoSelect'),
    temaSelect = document.querySelector('#temaSelect'),
    orderPorSelect = document.querySelector('#orderPorSelect'),
    ascInput = document.querySelector('#ascInput'),
    descInput = document.querySelector('#descInput'),
    filterButton = document.querySelector('#filterResultsBtn'),
    resulstsContainer = document.querySelector('#resultsContainer')

  const filterResults = e => {
    e.preventDefault()
    alert('Botão Filtrar OK!')
  }

  const init = () => {
    filterButton.addEventListener('click', filterResults, true)
  }

  init()
}