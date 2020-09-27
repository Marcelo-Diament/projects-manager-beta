window.onload = () => {

  const projetoSelect = document.querySelector('#projetoSelect'),
    temaSelect = document.querySelector('#temaSelect'),
    orderPorSelect = document.querySelector('#orderPorSelect'),
    ascInput = document.querySelector('#ascInput'),
    descInput = document.querySelector('#descInput'),
    filterButton = document.querySelector('#filterResultsBtn'),
    resulstsContainer = document.querySelector('#resultsContainer')

  const showGrupos = (grupos, title, description) => {
    let html = `
      <div>
        <h2 class="mx-2 mt-3">${title}</h2>
        <p class="mx-2 mb-3">${description}</p>
    `
    for (let grupo of grupos) {
      html += `
        <article style="border-left: 8px solid ${grupo.corGrupo};" class="bg-light rounded-lg m-2 p-3">
          <header>
            <small><b>#${grupo.id}</b></small>
            <h3>${grupo.nome}</h3>
          </header>
          <div>
            <small>Atualizado em: ${new Date(grupo.updatedAt).toLocaleDateString()}</small>
            <small>Criado em: ${new Date(grupo.createdAt).toLocaleDateString()}</small>
          </div>
          <div>
            <small>Tema: ${grupo.tema}</small>
            <small>Status: ${grupo.status}</small>
            <small>Integrantes:</small>
            <ul class="list-unstyled">
      `;
      for (let integrante in grupo.integrantes) {
        html += `
          <li class="ml-0">
            <p>
              ${integrante.nome} ${integrante.sobrenome}
              <a href="${integrante.github}" target="_blank" rel="noopener noreferrer" title="Acessar Github de ${integrante.nome} ${integrante.sobrenome}"><i class="fab fa-github"></i></a>
              <a href="${integrante.linkedin}" target="_blank" rel="noopener noreferrer" title="Acessar Linked In de ${integrante.nome} ${integrante.sobrenome}"><i class="fab fa-linkedin"></i></a>
            </p>
          </li>
        `;
      }
      html += `
            </ul>
          </div>
        </article>
      `;
    }
    html += `
        </div>
      `;
    resulstsContainer.innerHTML = html
  }

  const filterResults = e => {
    e.preventDefault()
    alert('Botão Filtrar OK!')
  }

  const init = () => {
    filterButton.addEventListener('click', filterResults, true)
  }

  init()
}