// import Repo from './modules/APIs/Github/Repo'
// import Aluno from './modules/Aluno/Aluno'
import Projetos from './modules/Projetos/Projetos'
// import Projeto from './modules/Projeto/Projeto'
import { appendHTML, mainVariables } from './modules/Helpers/Utils'
import HTMLTemplates from './modules/Helpers/HTMLTemplates'

// Testing Repo refactored
// Repo(`https://github.com/LuanCSV/pets-social-network-DH`)

// // Testing Aluno
// Aluno(0).then((aluno) => console.log(aluno))
// // Testing Aluno
// Aluno(1).then((aluno) => console.log(aluno))
// // Testing Aluno
// Aluno(2).then((aluno) => console.log(aluno))
// // Testing Aluno
// Aluno(3).then((aluno) => console.log(aluno))
// // Testing Aluno
// Aluno(4).then((aluno) => console.log(aluno))
// // Testing Aluno
// Aluno(5).then((aluno) => console.log(aluno))
// // Testing Aluno
// Aluno(6).then((aluno) => console.log(aluno))
// // Testing Aluno
// Aluno(7).then((aluno) => console.log(aluno))
// // Testing Aluno
// Aluno(8).then((aluno) => console.log(aluno))

Projetos()
  .then(projetos => HTMLTemplates.projetos(projetos, 'Projetos TN09', 'Confira a seguir os projetos integradores da turma TN09'))
  .then(projetosHTML => appendHTML(projetosHTML,mainVariables.resultsContainer))
  .catch(err => console.log(err))
