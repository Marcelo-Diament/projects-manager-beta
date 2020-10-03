import Projetos from '../Projetos/Projetos'
import { debugMode } from '../Helpers/Utils'

/**
 * @function Projeto
 * @param {Number} id - the student ID
 * @returns the student info based on its ID - this function assumes that the student ID is the same of its Alunos array index
 */
const Projeto = async id => {
  let projetos = await Projetos()
  if (id < projetos.length) {
    // debugMode && console.log(projetos[id])
    return await projetos[id]
  } else {
    debugMode && console.log(`Não encontramos nenhum projeto com id ${id}`)
    return undefined
  }
}

export default Projeto