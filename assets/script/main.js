import Repo from './modules/APIs/Github/Repo'
import Aluno from './modules/Aluno/Aluno'
import Projetos from './modules/Projetos/Projetos'
import Projeto from './modules/Projeto/Projeto'
// import { appendHTML } from './modules/Helpers/Utils'

// Testing Repo refactored
Repo(`https://github.com/LuanCSV/pets-social-network-DH`)

// Testing Aluno
Aluno(5).then((aluno) => console.log(aluno))

// Testing Projetos
Projetos().then((projetos) => console.log(projetos))

// Testing Projeto
Projeto(3).then((projeto) => console.log(projeto))
