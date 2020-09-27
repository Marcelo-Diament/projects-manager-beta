window.onload = () => {

  const nomeInput = document.querySelector('#nomeInput'),
    sobrenomeInput = document.querySelector('#sobrenomeInput'),
    sexoFemininoInput = document.querySelector('#sexoFemininoInput'),
    sexoMasculinoInput = document.querySelector('#sexoMasculinoInput'),
    areaProfissionalSelect = document.querySelector('#areaProfissionalSelect'),
    orderPorSelect = document.querySelector('#orderPorSelect'),
    ascInput = document.querySelector('#ascInput'),
    descInput = document.querySelector('#descInput'),
    resulstsContainer = document.querySelector('#resultsContainer')

  const filterResults = e => {
    e.preventDefault()
    alert('Botão Filtrar OK!')
  }

  const init = () => {
    document.querySelector('#filterResultsBtn').addEventListener('click', filterResults, true)
  }

  init()
}