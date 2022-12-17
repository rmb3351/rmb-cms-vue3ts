import useLogin from './login/login';
import pinia from '.';
// 这里不传pinia实例会导致main.ts无法正常调用initStore
const loginStore = useLogin(pinia);
/**
 * @function 用于用户刷新页面后同步原有store的数据
 */
export function syncStore() {
  loginStore.syncLocalData();
}
