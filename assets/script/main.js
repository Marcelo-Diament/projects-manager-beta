import getProjetos from './modules/Projetos/Projetos.js'
import getRepo from './modules/Repo/Repo.js'
import Helpers from './modules/Helpers/Helpers.js'

window.onload = () => {

  getProjetos(true)
  getProjetos()

  const projetoSelect = document.querySelector('#projetoSelect'),
    temaSelect = document.querySelector('#temaSelect'),
    orderPorSelect = document.querySelector('#orderPorSelect'),
    ascInput = document.querySelector('#ascInput'),
    descInput = document.querySelector('#descInput'),
    filterResultsProjetosBtn = document.querySelector('#filterResultsProjetosBtn'),
    resulstsContainer = document.querySelector('#resultsContainer'),
    projetosLinksMenu = document.querySelector('#projetosLinksMenu'),
    temasLinksMenu = document.querySelector('#temasLinksMenu')

  const prepareOptions = () => {
    let projetos = getProjetos()
    const getProjetoOptions = Helpers.options.get(projetos, 'nome')
    Helpers.options.show('#projetoSelect', getProjetoOptions)
    Helpers.options.show('#projetosLinksMenu', getProjetoOptions, true)
    const getTemaOptions = Helpers.options.get(projetos, 'tema')
    Helpers.options.show('#temaSelect', getTemaOptions)
    Helpers.options.show('#temasLinksMenu', getTemaOptions, true)
    const orderPorOptions = Helpers.params(projetos)
    const orderPorOptionsDisponiveis = orderPorOptions.filter(e => (e !== 'corProjeto' && e !== 'descricao' && e !== 'integrantes' && e !== 'logo' && e !== 'repositorio'))
    Helpers.options.show('#orderPorSelect', orderPorOptionsDisponiveis)
  }

  const getProjetoByNome = nome => {
    let projetos = getProjetos()
    let results = []
    results = Helpers.search(projetos, 'nome', 'Asc', nome)
    showProjetos(results, `Projeto ${nome}`, `Resultados para busca de projeto por nome ${nome}`)
  }

  const getProjetoByTema = tema => {
    let projetos = getProjetos()
    let results = []
    results = Helpers.search(projetos, 'tema', 'Asc', tema)
    showProjetos(results, `Tema ${tema}`, `Resultados para busca de projeto por tema ${tema}`)
  }

  const prepareOptionsActions = () => {
    for (let projetoLink of projetosLinksMenu.children) {
      let nome = projetoLink.getAttribute('data-option')
      projetoLink.addEventListener('click', () => getProjetoByNome(nome))
    }

    for (let temaLink of temasLinksMenu.children) {
      let tema = temaLink.getAttribute('data-option')
      temaLink.addEventListener('click', () => getProjetoByTema(tema))
    }
  }

  const makeFilterParams = () => {
    let temas = [...temaSelect.children],
      temaSelected = temas.filter(e => e.selected)[0].value

    let projetos = [...projetoSelect.children],
      projetoSelected = projetos.filter(e => e.selected)[0].value

    let orderPorOptions = [...orderPorSelect.children],
      orderPorOptionsSelected = orderPorOptions.filter(e => e.selected)[0].value

    // let getStatusOptions = Helpers.options.get(projetos, 'status'),
    //   status = [...getStatusOptions],
    //   statusSelected = projetos.filter(e => e.selected)[0].value

    return {
      tema: temaSelected ? temaSelected : undefined,
      projeto: projetoSelected ? projetoSelected : undefined,
      orderPor: orderPorOptionsSelected ? orderPorOptionsSelected : 'id',
      order: descInput.checked ? 'Desc' : 'Asc'
    }
  }

  const updateSearchHistory = lastSearchParams => {
    if (localStorage.getItem('searchHistory') !== null) {
      let searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
      searchHistory.push(lastSearchParams)
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
    } else {
      let searchHistory = []
      searchHistory.push(lastSearchParams)
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
    }
    localStorage.setItem('lastSearchParams', JSON.stringify(lastSearchParams))
  }

  const showProjetos = (projetos, title, description) => {
    let html = `
      <div>
        <h2 class="mx-2 mt-3">${title}</h2>
        <p class="mx-2 mb-3">${description}</p>
    `
    for (let projeto of projetos) {

      let modalBody = `<p class="mt-2">${projeto.descricao}</p>
      <small>Integrantes:</small>
      <ul class="list-unstyled d-flex flex-row flex-wrap justify-content-between align-items-start">
      `;
      for (let integrante of projeto.integrantes) {
        modalBody += `
          <li class="ml-0">
            <small>
              ${integrante.nome} ${integrante.sobrenome}
              <a href="${integrante.github}" target="_blank" rel="noopener noreferrer" title="Acessar Github de ${integrante.nome} ${integrante.sobrenome}"><i class="fab fa-github"></i></a>
              <a href="${integrante.linkedin}" target="_blank" rel="noopener noreferrer" title="Acessar Linked In de ${integrante.nome} ${integrante.sobrenome}"><i class="fab fa-linkedin"></i></a>
            </small>
          </li>
        `;
      }
      modalBody += `
        </ul>
      `;
      let modal = `
        <div class="modal fade" id="modalProjeto${projeto.id}" tabindex="-1" aria-labelledby="modalProjeto${projeto.id}Label" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 id="modalProjeto${projeto.id}Label" class="modal-title">#0${projeto.id} | ${projeto.nome}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
      `;
      modal += `${modalBody}`;
      modal += `
              </div>
              <div class="modal-footer">
                <a href="${projeto.repositorio}" target="_blank" rel="noopener noreferrer" title="Ver repositório do projeto ${projeto.nome}" class="btn btn-info">Ver Repositório</a>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
              </div>
            </div>
          </div>
        </div>
      `;
      document.querySelector('#modais').innerHTML += modal

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
            <button type="button" class="btn btn-info mt-3" data-toggle="modal" data-target="#modalProjeto${projeto.id}">Info</button>
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

    let filterParams = makeFilterParams()
    updateSearchHistory()

    let results = [],
      projetos = getProjetos(),
      params = Helpers.params(projetos)

    for (let param of params) {
      if (!filterParams[param] || filterParams[param] !== undefined) {
        results = results.length
          ? Helpers.search(results, param, filterParams.order, filterParams[param])
          : Helpers.search(projetos, param, filterParams.order, filterParams[param])
      }
    }

    if (!results.length) {
      alert('Ops! Estamos sem resultados para sua busca...\nConfira outros resultados!')
      results = getProjetos()
    }

    results = Helpers.search(results, filterParams.orderPor, filterParams.order)
    localStorage.setItem('lastSearchResults', JSON.stringify(results))
    showProjetos(results, 'Projetos Encontrados', 'Projetos encontrados a partir da busca realizada')
    resulstsContainer.scrollIntoView()
    return results
  }

  const getRepos = projetos => {
    let reposInfos = []
    for (let projeto of projetos) {
      let repoInfo = getRepo(projeto.repositorio)
      reposInfos.push(repoInfo)
    }
    return reposInfos
  }

  const init = () => {
    let projetos = getProjetos()

    filterResultsProjetosBtn.addEventListener('click', filterResultsProjetos, true)

    showProjetos(projetos, 'Projetos Integradores', 'Todos os projetos ordenados por id')

    getRepos(projetos)

  }

  setTimeout(() => {
    getProjetos()
    prepareOptions()
    init()
    prepareOptionsActions()
  }, 1500)
}