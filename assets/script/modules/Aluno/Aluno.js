import Fetch from '../Helpers/Fetch'
import { debugMode } from '../Helpers/Utils'

const Alunos = Fetch(`./data/alunos.json`)

const showAluno = async (aluno) => {
  debugMode && console.log(await aluno)
  return await aluno
}

/**
 * @function Aluno
 * @param {Number} id - the student ID
 * @returns the student info based on its ID - this function assumes that the student ID is the same of its Alunos array index
 */
const Aluno = async id => {
  let selectedAluno
  let alunos = await Alunos
  if (id <= alunos.length) {
    selectedAluno = alunos[id]
  } else {
    selectedAluno = undefined
  }
  return showAluno(selectedAluno)
}

export default Aluno