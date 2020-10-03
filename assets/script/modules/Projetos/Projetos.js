import Fetch from '../Helpers/Fetch'
import Aluno from '../Aluno/Aluno'
import { debugMode } from '../Helpers/Utils'

const Projetos = () => Fetch(`./data/projetos.json`)
  .then(projetos => {
    let result = []
    // debugMode && console.log(projetos)
    for (let projeto of projetos) {
      let integrantes = getIntegrantes(projeto)
      projeto.integrantes = integrantes
      result.push(projeto)
    }
    // debugMode && console.log(result)
    return result
  })

const getIntegrantes = projeto => {
  let integrantes = []
  for (let integrante of projeto.integrantes) {
    integrantes.push(Aluno(integrante))
  }
  return integrantes
}

export default Projetos