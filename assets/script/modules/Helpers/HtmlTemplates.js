// const buildModal = projeto => {

// }

const buildProjetoCard = projeto => `
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
`

const buildProjetos = (projetos, title, description) => {
  let html = `
    <div>
      <h2 class="mx-2 mt-3">${title}</h2>
      <p class="mx-2 mb-3">${description}</p>
  `
  for (let projeto of projetos) {
    html += buildProjetoCard(projeto)
  }
  html += `</div>`;
}

const HtmlTemplates = {
  projetos: buildProjetos
}

export default HtmlTemplates