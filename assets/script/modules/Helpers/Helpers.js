
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

const Helpers = {
  sort: sortItems
}
export default Helpers