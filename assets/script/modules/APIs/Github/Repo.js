import Fetch from '../../Helpers/Fetch'
import { debugMode, appendHTML } from '../../Helpers/Utils'

/**
 * @function repoShow
 * @param {Object} repo - data generated from Fetch API response formated
 * @description - receives specific Github API repository response properties and returns it as HTML
 * @returns - returns HTML with requested repo data
 */
const repoShow = (async (repo) => {
  // debugMode && console.log(await repo)
  let meuUmRepo = `<p>${repo.name}</p>`
  // console.log(meuUmRepo)
  appendHTML(meuUmRepo)
})

/**
 * @function repoInfos
 * @param {Object} dataObj - the parsed Github Repository API JSON Response
 * @description - clears the data received from the Github API Repository endpoint maintaing just the selected repo properties
 * @returns - specific data (declared in the function body)
 */
const repoInfos = async (dataObj) => {
  const repo = (
    ({ id, name, html_url, description, created_at, updated_at, homepage, stargazers_count, watchers_count, language }) => (
      { id, name, html_url, description, created_at, updated_at, homepage, stargazers_count, watchers_count, language }
    ))(dataObj);
  repo.created_at = new Date(repo.created_at).toLocaleDateString()
  repo.updated_at = new Date(repo.updated_at).toLocaleDateString()
  return await repoShow(repo)
}

/**
 * @function Repo
 * @param {String} url - the Github repository URL (wether the HTML URL or the API one)
 * @description - checks the URL received, formats it if necessary and makes a fetch API request to Github repo endpoint
 * @returns - repository data from Github API
 */
const Repo = async url => {
  if (!url.includes('api')) url = url.replace('github.com', 'api.github.com/repos')
  await Fetch(url, repoInfos)
}

export default Repo