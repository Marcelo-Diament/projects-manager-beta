import Projetos from './modules/Projetos/Projetos.js'
import { appendHTML, mainVariables } from './modules/Helpers/Utils.js'
import HTMLTemplates from './modules/Helpers/HTMLTemplates.js'

Projetos()
  .then(projetos => {
    let modais = HTMLTemplates.modais(projetos)
    let html = HTMLTemplates.projetos(projetos, 'Projetos TN09', 'Confira a seguir os projetos integradores da turma TN09')
    return ({ html, modais })
  })
  .then(response => {
    appendHTML(response.html, mainVariables.resultsContainer)
    appendHTML(response.modais, mainVariables.modais)
  })
  .catch(err => console.trace(err))
