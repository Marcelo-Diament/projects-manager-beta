import Fetch from '../Helpers/Fetch.js'
// import { debugMode } from '../Helpers/Utils.js'

const Alunos = Fetch(`./data/alunos.json`)

/**
 * @function Aluno
 * @param {Number} id - the student ID
 * @returns the student info based on its ID - this function assumes that the student ID is the same of its Alunos array index
 */
const Aluno = async id => {
  let selectedAluno
  let alunos = await Alunos
  if (id < alunos.length) {
    selectedAluno = alunos[id]
    return buildAluno(selectedAluno)
  } else {
    selectedAluno = undefined
    return `Não encontramos nenhum aluno com id ${id}`
  }
}

const buildAluno = async (aluno) => {
  // debugMode && console.log(await aluno)
  // let meuUmAluno = `<p>${aluno.nome}</p>`
  // console.log(meuUmAluno)
  // appendHTML(meuUmAluno)
  return await aluno
}

export default Aluno