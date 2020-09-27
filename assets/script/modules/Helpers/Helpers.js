const getParams = arr => {
  let results = []
  for (let param in arr[0]) {
    results.push(param)
  }
  return results
}

const getOptions = (arr, filterProp = 'tema') => {
  let results = []
  for (let item of arr) {
    results.push(item[filterProp])
  }
  results = new Set([...results])
  results = [...results]
  return results
}

const showOptions = (select, options) => {
  let optionsSelect = document.querySelector(select)
  for (let option of options.sort()) {
    let optionTag = document.createElement('OPTION')
    optionTag.setAttribute('id', `${select.substr(1).replace(/\s/g, '-')}_${option.replace(/\s/g, '-')}`)
    optionTag.setAttribute('class', `${select.substr(1).replace(/\s/g, '-').replace(/select/gi, '-option')}`)
    optionTag.setAttribute('value', option.toString())
    let optionText = document.createTextNode(option.toString())
    optionTag.appendChild(optionText)
    optionsSelect.appendChild(optionTag)
  }
}

const sortItems = (arr, filterProp = 'id', order = 'Asc') => {
  let results = []
  if (arr && arr !== undefined) {
    results = arr.sort((a, b) => {
      if (filterProp === 'createdAt' || filterProp === 'updatedAt') {
        if (order === 'Asc') {
          if (new Date(a[filterProp]) < new Date(b[filterProp])) {
            return -1;
          } else if (new Date(a[filterProp]) > new Date(b[filterProp])) {
            return 1;
          } else {
            return 0;
          }
        } else {
          if (new Date(a[filterProp]) > new Date(b[filterProp])) {
            return -1;
          } else if (new Date(a[filterProp]) < new Date(b[filterProp])) {
            return 1;
          } else {
            return 0;
          }
        }
      } else {
        if (order === 'Asc') {
          if (a[filterProp] < b[filterProp]) {
            return -1;
          } else if (a[filterProp] > b[filterProp]) {
            return 1;
          } else {
            return 0;
          }
        } else {
          if (a[filterProp] > b[filterProp]) {
            return -1;
          } else if (a[filterProp] < b[filterProp]) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    })
  }
  return results
}

const filterItems = (arr, filterProp = 'id', filterValue = undefined) => {
  let results = []
  if (arr && arr !== undefined && filterValue && filterValue !== undefined)
    results = arr.filter(item => item[filterProp] === filterValue)
  return results
}

const makeSearch = (arr, filterProp = 'id', order = 'Asc', filterValue = undefined) => {
  let results = []
  filterValue !== undefined
    ? results = filterItems(arr, filterProp, filterValue)
    : results = sortItems(arr, filterProp, order)
  return results
}

const Helpers = {
  params: getParams,
  options: {
    get: getOptions,
    show: showOptions
  },
  filter: filterItems,
  sort: sortItems,
  search: makeSearch
}
export default Helpers