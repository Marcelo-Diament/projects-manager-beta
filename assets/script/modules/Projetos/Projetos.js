import Fetch from '../Helpers/Fetch.js'

const Projetos = () => Fetch(`./data/projetos.json`)
  .then(projetos => projetos)
  .catch(err => console.trace(err))

export default Projetos