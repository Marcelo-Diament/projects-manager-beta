window.onload = () => {

  const projetoSelect = document.querySelector('#projetoSelect'),
    temaSelect = document.querySelector('#temaSelect'),
    orderPorSelect = document.querySelector('#orderPorSelect'),
    ascInput = document.querySelector('#ascInput'),
    descInput = document.querySelector('#descInput'),
    filterButton = document.querySelector('#filterResultsBtn'),
    resulstsContainer = document.querySelector('#resultsContainer')

  let gruposPlaceholder = [
    {
      "id": 1,
      "nome": "Grupo 01",
      "logo": "https://djament.com.br/favicons/favicon-96x96.png",
      "tema": "eCommerce",
      "status": "Em andamento",
      "sprint": "01 | Arquitetura e Estrutura",
      "descricao": "Exemplo de registro de grupo",
      "repositorio": "https://github.com/Marcelo-Diament/projects-manager-beta",
      "corGrupo": "#8bc34a",
      "createdAt": "09/21/2020",
      "updatedAt": "09/21/2020",
      "integrantes": [
        {
          "nome": "Marcelo",
          "sobrenome": "Diament",
          "github": "https://github.com/marcelo-diament",
          "linkedin": "https://linkedin.com/in/marcelo-diament"
        },
        {
          "nome": "Marcelo",
          "sobrenome": "Diament",
          "github": "https://github.com/marcelo-diament",
          "linkedin": "https://linkedin.com/in/marcelo-diament"
        },
        {
          "nome": "Marcelo",
          "sobrenome": "Diament",
          "github": "https://github.com/marcelo-diament",
          "linkedin": "https://linkedin.com/in/marcelo-diament"
        },
        {
          "nome": "Marcelo",
          "sobrenome": "Diament",
          "github": "https://github.com/marcelo-diament",
          "linkedin": "https://linkedin.com/in/marcelo-diament"
        }
      ]
    },
    {
      "id": 2,
      "nome": "Grupo 02",
      "logo": "https://djament.com.br/favicons/favicon-96x96.png",
      "tema": "Rede Social",
      "status": "Atrasado",
      "sprint": "00 | Definição do Tema",
      "descricao": "Exemplo de registro de grupo",
      "repositorio": "https://github.com/Marcelo-Diament/projects-manager-beta",
      "corGrupo": "#2196f3",
      "createdAt": "09/21/2020",
      "updatedAt": "09/21/2020",
      "integrantes": [
        {
          "nome": "Marcelo",
          "sobrenome": "Diament",
          "github": "https://github.com/marcelo-diament",
          "linkedin": "https://linkedin.com/in/marcelo-diament"
        },
        {
          "nome": "Marcelo",
          "sobrenome": "Diament",
          "github": "https://github.com/marcelo-diament",
          "linkedin": "https://linkedin.com/in/marcelo-diament"
        },
        {
          "nome": "Marcelo",
          "sobrenome": "Diament",
          "github": "https://github.com/marcelo-diament",
          "linkedin": "https://linkedin.com/in/marcelo-diament"
        },
        {
          "nome": "Marcelo",
          "sobrenome": "Diament",
          "github": "https://github.com/marcelo-diament",
          "linkedin": "https://linkedin.com/in/marcelo-diament"
        }
      ]
    }
  ]

  const showGrupos = (grupos, title, description) => {
    let html = `
      <div>
        <h2 class="mx-2 mt-3">${title}</h2>
        <p class="mx-2 mb-3">${description}</p>
    `
    for (let grupo of grupos) {
      html += `
        <article style="border-left: 8px solid ${grupo.corGrupo};" class="bg-light rounded-lg m-2 p-3">
          <header class="my-3 d-flex flex-column flex-nowrap">
            <div class="grupo-id"><span class="ml-auto px-2 py-1 badge badge-pill badge-dark">GRUPO #0${grupo.id}</span></div>
            <div class="d-flex flex-row flex-nowrap justify-content-between align-items-start">
              <img src="${grupo.logo}" height="96" width="96" class="my-2 circle border-info">
              <div class="my-2 d-flex flex-column flex-nowrap col">
                <h4>${grupo.nome}</h4>
                <small>Tema: ${grupo.tema}</small>
                <small>Status: ${grupo.status}</small>
                <small>Sprint: ${grupo.sprint}</small>
              </div>
            </div>
          </header>
          <div class="d-flex flex-column flex-nowrap">
            <small>Criado em: ${new Date(grupo.createdAt).toLocaleDateString()} | Atualizado em: ${new Date(grupo.updatedAt).toLocaleDateString()}</small>
            <p class="mt-2">${grupo.descricao}</p>
            <small>Integrantes:</small>
            <ul class="list-unstyled d-flex flex-row flex-wrap justify-content-between align-items-start">
      `;
      for (let integrante of grupo.integrantes) {
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
            <a href="${grupo.repositorio}" target="_blank" rel="noopener noreferrer" title="Ver repositório do grupo ${grupo.nome}" class="btn btn-info">Ver Repositório</a>
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
    showGrupos(gruposPlaceholder, 'Grupos Encontrados', 'Grupos encontrados a partir da busca realizada')
  }

  const init = () => {
    filterButton.addEventListener('click', filterResults, true)
  }

  init()
}