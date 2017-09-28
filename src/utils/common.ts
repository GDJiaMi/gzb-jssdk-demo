/**
 * 帮助方法
 */

export function parse(res: string | object) {
  if (typeof res === 'string') {
    return JSON.parse(res)
  }
  return res
}
