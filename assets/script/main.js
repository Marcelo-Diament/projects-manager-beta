window.onload = () => {

  const filterResults = e => {
    e.preventDefault()
    alert('Botão Filtrar OK!')
  }

  const init = () => {
    document.querySelector('#filterResultsBtn').addEventListener('click', filterResults, true)
  }

  init()
}