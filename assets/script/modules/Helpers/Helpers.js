const getParams = arr => {
  let results = []
  for (let param in arr[0]) {
    results.push(param)
  }
  return results
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
  filter: filterItems,
  sort: sortItems,
  search: makeSearch
}
export default Helpers