/* 封装localStorage */
class LoCache {
  set(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  get(key: string) {
    const strVal = window.localStorage.getItem(key);
    if (strVal) return JSON.parse(strVal);
  }
  remove(key: string) {
    window.localStorage.removeItem(key);
  }
  clear() {
    window.localStorage.clear();
  }
  /* 把传入的fnKeys对应的函数做成字符串再存储，避免丢失 */
  saferSet(key: string, value: any, fnKeys: string[]) {
    if (Array.isArray(value)) {
      for (const obj of value) {
        for (const fnKey of fnKeys) obj[fnKey] = obj[fnKey].toString();
      }
    } else if (typeof value === 'object') {
      for (const fnKey of fnKeys) value[fnKey] = value[fnKey].toString();
    }
    this.set(key, value);
  }
  /* 对应saferSet，将对应的字符串转回函数 */
  saferGet(key: string, fnKeys: string[]) {
    const value = this.get(key);
    if (!value) return value;
    if (Array.isArray(value)) {
      for (const obj of value) {
        for (const fnKey of fnKeys) obj[fnKey] = eval('(' + obj[fnKey] + ')');
      }
    } else if (typeof value === 'object') {
      for (const fnKey of fnKeys) value[fnKey] = eval('(' + value[fnKey] + ')');
    }
    return value;
  }
}

export default new LoCache();
