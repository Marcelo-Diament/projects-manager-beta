const integranteHTML = (integrante) => {
  let result = `
  <li class="col-12 col-md-6 col-lg-auto ml-0 mx-lg-auto">
    <small>
      ${integrante.nome} ${integrante.sobrenome}
  `;
  if (integrante.github && integrante.github !== '' && integrante.github !== undefined) {
    result += `
      <a href="${integrante.github}" target="_blank" rel="noopener noreferrer" title="Acessar Github de ${integrante.nome} ${integrante.sobrenome}"><i class="fab fa-github"></i></a>
    `;
  }
  if (integrante.linkedin && integrante.linkedin !== '' && integrante.linkedin !== undefined) {
    result += `
      <a href="${integrante.linkedin}" target="_blank" rel="noopener noreferrer" title="Acessar Linked In de ${integrante.nome} ${integrante.sobrenome}"><i class="fab fa-linkedin"></i></a>
    `;
  }
  result += `
    </small>
  </li>
  `;
  return result
}

const makeIntegrantes = integrantes => {
  let result = ``
  for (let integrante of integrantes) {
    result += integranteHTML(integrante)
  }
  return result
}

const buildProjectModalCollapseSobre = projeto => {
  let integrantes = makeIntegrantes(projeto.integrantes)
  let modalCollapseSobre = `
    <div class="mb-2 collapse show" id="collapseSobre-${projeto.id}">
      <small><b>Projeto</b></small><br/>
      <small>${projeto.descricao}</small><br/>
      <small><b>Integrantes</b></small>
      <ul class="list-unstyled row">
  `;
  modalCollapseSobre += integrantes
  modalCollapseSobre += `
      </ul>
    </div>
  `;
  return modalCollapseSobre
}

const buildProjectModal = projeto => {
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
  modal += buildProjectModalCollapseSobre(projeto)
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
  return modal
}

const buildModals = (projetos) => {
  let modais = ``
  for (let projeto of projetos) {
    modais += buildProjectModal(projeto)
  }
  return modais
}

const buildProjetoCard = projeto => `
  <div id="projectCardContainer-${projeto.id}" class="col-12 col-lg-6 col-xl-4 my-2 px-0 py-0 px-sm-2">
    <article style="border-left: 8px solid ${projeto.corProjeto};" class="bg-light rounded-lg mx-0 my-2 my-lg-0 p-3 d-flex flex-column flex-nowrap justify-content-between h-100" id="projectCard-${projeto.id}">
      <header class="mt-3 d-flex flex-column flex-nowrap">
        <div class="projeto-id"><span class="ml-auto px-2 py-1 badge badge-pill badge-dark">PROJETO #0${projeto.id}</span></div>
        <div class="d-flex flex-row flex-nowrap justify-content-between align-items-start">
          <img src="./${projeto.logo}" height="80" width="80" class="my-2 rounded-circle border-info">
          <div class="my-2 d-flex flex-column flex-nowrap col">
            <h4>${projeto.nome}</h4>
            <small>Tema: ${projeto.tema}</small>
            <small>Status: ${projeto.status}</small>
            <!--<small>Sprint: ${projeto.sprint}</small>-->
          </div>
        </div>
      </header>
      <div class="d-flex flex-column flex-nowrap">
        <!-- <small>Criado em: ${new Date(projeto.createdAt).toLocaleDateString()} | Atualizado em: ${new Date(projeto.updatedAt).toLocaleDateString()}</small>-->
        <button type="button" class="btn btn-info" data-toggle="modal" data-target="#modalProjeto${projeto.id}">Info</button>
      </div>
    </article>
  </div>
`

const buildProjetos = (projetos, title, description) => {
  let html = `
    <div class="row mx-0">
      <h2 class="col-12 px-1 mx-0 mt-3">${title}</h2>
      <p class="col-12 px-1 mx-0 mb-3">${description}</p>
  `
  for (let projeto of projetos) {
    html += buildProjetoCard(projeto)
  }
  html += `</div>`;
  return html
}

const HTMLTemplates = {
  projetos: buildProjetos,
  modais: buildModals
}

export default HTMLTemplates