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
}

export default new LoCache();
