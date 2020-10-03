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
      let repoInfos
      if (projeto.repositorio && projeto.repositorio !== undefined && projeto.repositorio !== '') repoInfos = getRepo(projeto.repositorio)

      let modalBody = `
      <div class="mb-2 collapse show" id="collapseSobre-${projeto.id}">
        <small><b>Projeto</b></small><br/>
        <small>${projeto.descricao}</small><br/>
        <small><b>Integrantes</b></small>
        <ul class="list-unstyled row">
      `;
      for (let integrante of projeto.integrantes) {
        modalBody += `
          <li class="ml-0 col-6">
            <small>
              ${integrante.nome} ${integrante.sobrenome}
        `;
        if (integrante.github && integrante.github !== '' && integrante.github !== undefined) {
          modalBody += `
                <a href="${integrante.github}" target="_blank" rel="noopener noreferrer" title="Acessar Github de ${integrante.nome} ${integrante.sobrenome}"><i class="fab fa-github"></i></a>
          `;
        }
        if (integrante.linkedin && integrante.linkedin !== '' && integrante.linkedin !== undefined) {
          modalBody += `
                <a href="${integrante.linkedin}" target="_blank" rel="noopener noreferrer" title="Acessar Linked In de ${integrante.nome} ${integrante.sobrenome}"><i class="fab fa-linkedin"></i></a>
          `;
        }
        modalBody += `
            </small>
          </li>
        `;
      }
      modalBody += `
        </ul>
      </div>
      `;
      if (repoInfos) {
        modalBody += `
          <div class="mb-2 collapse" id="collapseRepo-${projeto.id}">
            <small><b>Repositório</b></small><br/>
            <small>Id: ${repoInfos.id}</small><br/>
            <small>Criado em ${new Date(repoInfos.created_at).toLocaleDateString()}</small><br/>
            <small>Atualizado em ${new Date(repoInfos.updated_at).toLocaleDateString()}</small><br/>
            <small>Nome do repositório: ${repoInfos.name}</small><br/>
            <small>Links <a href="${repoInfos.html_url}" rel="noopener noreferrer" target="_blank" title="Repositório do projeto ${projeto.nome}">Repositório</a> | <a href="${projeto.repositorio}/blob/master/README.md" rel="noopener noreferrer" target="_blank" title="README do projeto ${projeto.nome}">README.md</a></small><br/>
            <small>Descrição: ${repoInfos.description}</small><br/>
          </div>
        `;
      }
      modalBody += `
      <div class="mb-2 collapse" id="collapseSprints-${projeto.id}">
        <small><b>Sprints | 01. Front</b></small>
        <ul class="list-unstyled row">
          <li class="my-3 col-10 offset-1 done">
            <small><b>01.01. Planejamento Inicial <span class="float-right">01/10/20</span></b></small><br/>
            <small><b>Entrega: link do repositório com todos os colaboradores definidos, link do Trello.</b></small><br/>
            <small class="text-black-50"><i>Escopo previsto, referências, features principais, fluxo de trabalho (gitflow e gestão do projeto - como Trello) e definições gerais.</i></small><br/>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">100%</div>
            </div>
          </li>
          <li class="my-3 col-10 offset-1 doing">
            <small><b>01.02. Arquitetura de Informações e UX <span class="float-right">08/10/20</span></b></small><br/>
            <small><b>Entrega: link do Pull Request final.</b></small><br/>
            <small class="text-black-50"><i>Padrões de layout, estilo, estrutura HTML (semântica de preferência) definidos E aplicados em uma ou mais páginas de exemplo com: Formulário, Tabela, Lista, Carrossel de Imagens.</i></small><br/>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">30%</div>
            </div>
          </li>
          <li class="my-3 col-10 offset-1">
            <small><b>01.03. Front | Usuário Deslogado <span class="float-right">15/10/20</span></b></small><br/>
            <small><b>Entrega: link do Pull Request final.</b></small><br/>
            <small class="text-black-50"><i>Layouts (HTML, CSS e JS - com ou sem Bootstrap) da Home, página institucional ('Sobre'), página de Contato, vitrine (como 'Categoria de Produtos' ou 'Feed de Posts') e página de Detalhe (do 'Post', 'Serviço' ou 'Produto', por exemplo).</i></small><br/>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-secondary" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
            </div>
          </li>
          <li class="my-3 col-10 offset-1">
            <small><b>01.04. Front | Administrador <span class="float-right">22/10/20</span></b></small><br/>
            <small><b>Entrega: link do Pull Request final.</b></small><br/>
            <small class="text-black-50"><i>Layouts (HTML, CSS e JS - com ou sem Bootstrap) das páginas administrativas (lista - ou tabela - de usuários, formulário de edição de usuários, lista - ou tabela - de categorias, formulário de edição de categoria, lista de produtos/serviços, formulário de edição de produtos/serviços).</i></small><br/>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-secondary" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
            </div>
          </li>
          <li class="my-3 col-10 offset-1">
            <small><b>01.05. Front | Usuário Logado e Revisão <span class="float-right">29/10/20</span></b></small><br/>
            <small><b>Entrega: link do Pull Request final.</b></small><br/>
            <small class="text-black-50"><i>Layouts (HTML, CSS e JS - com ou sem Bootstrap) das páginas do usuário logado (formulário de edição de usuários, lista - ou tabela - de histórico (de pedidos ou posts, por exemplo). Revisão do front como um todo (HTML, CSS e JS).</i></small><br/>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-secondary" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
            </div>
          </li>
          <li class="my-3 col-10 offset-1">
            <small><b>01.06. Front | React.js - Componentização e Rotas <span class="float-right">05/11/20</span></b></small><br/>
            <small><b>Entrega: link do Pull Request final.</b></small><br/>
            <small class="text-black-50"><i>Transição do projeto para o framework React.js considerando o desmembramento dos elementos em componentes e as rotas (GET).</i></small><br/>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-secondary" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
            </div>
          </li>
        </ul>
        <br/>
        <ul class="list-unstyled row">
          <li class="my-3 col-10 offset-1">
            <small><b>Apresentação 01 (opcional) | Front End v1 <span class="float-right">11/11/20</span></b></small><br/>
          </li>
        </ul>
        <br/>
        <small><b>Sprints | 02. Dados</b></small>
        <ul class="list-unstyled row">
          <li class="my-3 col-10 offset-1">
            <small><b>02.01. Dados | Estrutura do Banco <span class="float-right">12/11/20</span></b></small><br/>
            <small><b>Entrega: mapeamento dos dados (e possível protótipo).</b></small><br/>
            <small class="text-black-50"><i>Definição da estrutura do banco de dados - quais tabelas serão criadas, quais campos cada uma delas terá e como se relacionam os dados. Revisão do front para adequação ao banco de dados.</i></small><br/>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-secondary" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
            </div>
          </li>
          <li class="my-3 col-10 offset-1">
            <small><b>02.02. Dados | Migration <span class="float-right">19/11/20</span></b></small><br/>
            <small><b>Entrega: link do Pull Request final.</b></small><br/>
            <small class="text-black-50"><i>Criação das migrations - que são como scripts que criam as tabelas e relacionamentos para nós.</i></small><br/>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-secondary" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
            </div>
          </li>
          <li class="my-3 col-10 offset-1">
            <small><b>02.03. Dados | Seeds  + Read (CRUD) <span class="float-right">26/11/20</span></b></small><br/>
            <small><b>Entrega: link do Pull Request final.</b></small><br/>
            <small class="text-black-50"><i>Criação dos seeds (que populam o banco para nós) e consumo dos dados do banco no front.</i></small><br/>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-secondary" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
            </div>
          </li>
        </ul>
        <br/>
        <ul class="list-unstyled row">
          <li class="my-3 col-10 offset-1">
            <small><b>Apresentação 02 (opcional) | Front End v2 <span class="float-right">11/11/20</span></b></small></b></small><br/>
          </li>
        </ul>
        <br/>
        <small><b>Sprints | 03. Back</b></small>
        <ul class="list-unstyled row">
          <li class="my-3 col-10 offset-1">
            <small><b>03.01. Back | Create (CRUD) <span class="float-right">03/12/20</span></b></small><br/>
            <small><b>Entrega: link do Pull Request final.</b></small><br/>
            <small class="text-black-50"><i>Definição das operações de Criação (cadastro de usuário, produto, serviço e/ou post).</i></small><br/>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-secondary" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
            </div>
          </li>
          <li class="my-3 col-10 offset-1">
            <small><b>03.02. Back | Update e Delete (CRUD) <span class="float-right">10/12/20</span></b></small><br/>
            <small><b>Entrega: link do Pull Request final.</b></small><br/>
            <small class="text-black-50"><i>Criação das migrations - que são como scripts que criam as tabelas e relacionamentos para nós.</i></small><br/>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-secondary" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
            </div>
          </li>
        </ul>
        <small><b>Sprints | 04. Revisão Final</b></small>
        <ul class="list-unstyled row">
          <li class="my-3 col-10 offset-1">
            <small><b>04.01. Revisão | Extras <span class="float-right">12/01/21</span></b></small><br/>
            <small><b>Entrega: link do Pull Request final.</b></small><br/>
            <small class="text-black-50"><i>Implantação de features extras, otimizar código (como SEO e microdados) e preparação de cenários para a apresentação.</i></small><br/>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-secondary" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
            </div>
          </li>
          <li class="my-3 col-10 offset-1">
            <small><b>04.02. Revisão | Refatoração <span class="float-right">19/01/21</span></b></small><br/>
            <small><b>Entrega: link do Pull Request final.</b></small><br/>
            <small class="text-black-50"><i>Revisão do projeto, otimização do código, da arquitetura, de performance e conteúdo mais próximo do final.</i></small><br/>
            <div class="progress" style="height: 24px;">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-secondary" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
            </div>
          </li>
        </ul>
        <br/>
        <ul class="list-unstyled row">
          <li class="my-3 col-10 offset-1">
            <small><b>Apresentação 03 | Back End <span class="float-right">21/01/21</span></b></small></b></small><br/>
          </li>
        </ul>
        <ul class="list-unstyled row">
          <li class="my-3 col-10 offset-1 final">
            <small><b>Apresentação Final | Front End v2 <span class="float-right">26/01/21</span></b></small></b></small><br/>
          </li>
        </ul>
        <br/>
      </div>
      `;
      let modal = `
        <div class="modal fade" id="modalProjeto${projeto.id}" tabindex="-1" aria-labelledby="modalProjeto${projeto.id}Label" aria-hidden="true">
          <div class="modal-dialog modal-xl">
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
                <a class="btn btn-info" title="Ver informações sobre o projeto ${projeto.nome}" data-toggle="collapse" href="#collapseSobre-${projeto.id}" role="button" aria-expanded="true" aria-controls="collapseSobre-${projeto.id}">Sobre</a>
                <a class="btn btn-info" title="Ver informações sobre o andamento do projeto ${projeto.nome}"  data-toggle="collapse" href="#collapseSprints-${projeto.id}" role="button" aria-expanded="false" aria-controls="collapseSprints-${projeto.id}">Sprints</a>
                <a class="btn btn-info" title="Ver informações sobre o repositório do projeto ${projeto.nome}"  data-toggle="collapse" href="#collapseRepo-${projeto.id}" role="button" aria-expanded="false" aria-controls="collapseRepo-${projeto.id}">Repositório</a>
                <a href="${projeto.repositorio}" target="_blank" rel="noopener noreferrer" title="Ir para o repositório do projeto ${projeto.nome}" class="btn btn-info">Visitar Repositório</a>
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