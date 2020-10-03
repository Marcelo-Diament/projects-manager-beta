import Repo from './modules/APIs/Github/Repo'
import Aluno from './modules/Aluno/Aluno'

const debugMode = true

// Testing Repo refactored
const meuRepo = Repo(`https://github.com/LuanCSV/pets-social-network-DH`)

// Testing Aluno
const umAluno = Aluno(2)