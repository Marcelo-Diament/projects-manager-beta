import Repo from './modules/APIs/Github/Repo'
import Aluno from './modules/Aluno/Aluno'
import { appendHTML } from './modules/Helpers/Utils'

// Testing Repo refactored
Repo(`https://github.com/LuanCSV/pets-social-network-DH`)

// Testing Aluno
Aluno(2)