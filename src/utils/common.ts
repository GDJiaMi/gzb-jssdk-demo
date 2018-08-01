/**
 * 帮助方法
 */
import history from 'browserHistory'
import qs from 'qs'

export function parse(res: string | object) {
  if (typeof res === 'string') {
    return JSON.parse(res)
  }
  return res
}

export function getSearch(search: string) {
  if (search[0] === '?') {
    return qs.parse(search.slice(1))
  }
  return qs.parse(search)
}

export function deserial() {
  return getSearch(history.location.search)
}

export function serial(params: object) {
  const orgSearch = getSearch(history.location.search)
  const { pathname } = history.location
  const all = { ...orgSearch, ...params }
  history.push(`${pathname}?${qs.stringify(all)}`)
}
