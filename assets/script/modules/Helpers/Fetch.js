/**
 * @function Fetch
 * @param {String} url - endpoint URL where the request will be sent
 * @param {Object} callbackFunction - the callback function to be applied to the API response
 * @returns object from json got through Fetch API method using async/await
 */
const Fetch = async (url, callbackFunction) => {
  let response = await fetch(url)
  let json = await response.json()
  return await callbackFunction(json)
}

export default Fetch