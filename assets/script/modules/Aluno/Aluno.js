import Fetch from '../Helpers/Fetch.js'

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
    return aluno
  } else {
    selectedAluno = undefined
    return `Não encontramos nenhum aluno com id ${id}`
  }
}

export default Aluno