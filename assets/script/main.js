import getProjetos from './modules/Projetos/Projetos'
import Helpers from './modules/Helpers/Helpers'

window.onload = () => {

  getProjetos(true)
  getProjetos()

  const projetoSelect = document.querySelector('#projetoSelect'),
    temaSelect = document.querySelector('#temaSelect'),
    orderPorSelect = document.querySelector('#orderPorSelect'),
    ascInput = document.querySelector('#ascInput'),
    descInput = document.querySelector('#descInput'),
    filterResultsProjetosBtn = document.querySelector('#filterResultsProjetosBtn'),
    resulstsContainer = document.querySelector('#resultsContainer')

  const prepareOptions = () => {
    let projetos = getProjetos()
    const getProjetoOptions = Helpers.options.get(projetos, 'nome')
    Helpers.options.show('#projetoSelect', getProjetoOptions)
    const getTemaOptions = Helpers.options.get(projetos, 'tema')
    Helpers.options.show('#temaSelect', getTemaOptions)
    const orderPorOptions = Helpers.params(projetos)
    const orderPorOptionsDisponiveis = orderPorOptions.filter(e => (e !== 'corProjeto' && e !== 'descricao' && e !== 'integrantes' && e !== 'logo' && e !== 'repositorio') )
    Helpers.options.show('#orderPorSelect', orderPorOptionsDisponiveis)
  }

  const showProjetos = (projetos, title, description) => {
    let html = `
      <div>
        <h2 class="mx-2 mt-3">${title}</h2>
        <p class="mx-2 mb-3">${description}</p>
    `
    for (let projeto of projetos) {
      html += `
        <article style="border-left: 8px solid ${projeto.corProjeto};" class="bg-light rounded-lg m-2 p-3">
          <header class="my-3 d-flex flex-column flex-nowrap">
            <div class="projeto-id"><span class="ml-auto px-2 py-1 badge badge-pill badge-dark">PROJETO #0${projeto.id}</span></div>
            <div class="d-flex flex-row flex-nowrap justify-content-between align-items-start">
              <img src="${projeto.logo}" height="96" width="96" class="my-2 circle border-info">
              <div class="my-2 d-flex flex-column flex-nowrap col">
                <h4>${projeto.nome}</h4>
                <small>Tema: ${projeto.tema}</small>
                <small>Status: ${projeto.status}</small>
                <small>Sprint: ${projeto.sprint}</small>
              </div>
            </div>
          </header>
          <div class="d-flex flex-column flex-nowrap">
            <small>Criado em: ${new Date(projeto.createdAt).toLocaleDateString()} | Atualizado em: ${new Date(projeto.updatedAt).toLocaleDateString()}</small>
            <p class="mt-2">${projeto.descricao}</p>
            <small>Integrantes:</small>
            <ul class="list-unstyled d-flex flex-row flex-wrap justify-content-between align-items-start">
      `;
      for (let integrante of projeto.integrantes) {
        html += `
          <li class="ml-0">
            <small>
              ${integrante.nome} ${integrante.sobrenome}
              <a href="${integrante.github}" target="_blank" rel="noopener noreferrer" title="Acessar Github de ${integrante.nome} ${integrante.sobrenome}"><i class="fab fa-github"></i></a>
              <a href="${integrante.linkedin}" target="_blank" rel="noopener noreferrer" title="Acessar Linked In de ${integrante.nome} ${integrante.sobrenome}"><i class="fab fa-linkedin"></i></a>
            </small>
          </li>
        `;
      }
      html += `
            </ul>
            <a href="${projeto.repositorio}" target="_blank" rel="noopener noreferrer" title="Ver repositório do projeto ${projeto.nome}" class="btn btn-info">Ver Repositório</a>
          </div>
        </article>
      `;
    }
    html += `
        </div>
      `;
    resulstsContainer.innerHTML = html
  }

  const filterResultsProjetos = e => {
    e.preventDefault()
    let results = []
    results = getProjetos()
    showProjetos(results, 'Projetos Encontrados', 'Projetos encontrados a partir da busca realizada')
    resulstsContainer.scrollIntoView()
  }

  const init = () => {
    filterResultsProjetosBtn.addEventListener('click', filterResultsProjetos, true)
  }

  getProjetos()
  prepareOptions()
  init()
}