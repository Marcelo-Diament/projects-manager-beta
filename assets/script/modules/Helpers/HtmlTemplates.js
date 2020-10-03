// const buildModal = projeto => {

// }

const buildProjetoCard = projeto => `
  <div id="projectCardContainer-${projeto.id}" class="col-12 col-lg-6 col-xl-4 my-2 px-0 py-0 px-sm-2">
    <article style="border-left: 8px solid ${projeto.corProjeto};" class="bg-light rounded-lg mx-0 my-2 my-lg-0 p-3 d-flex flex-column flex-nowrap justify-content-between h-100" id="projectCard-${projeto.id}">
      <header class="mt-4 d-flex flex-column flex-nowrap">
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
  projetos: buildProjetos
}

export default HTMLTemplates