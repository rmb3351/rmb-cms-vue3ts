const checkAccount = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入账号'));
  }
  if (!/^[a-zA-Z0-9]{6,10}$/.test(value)) {
    callback(new Error('请输入6~10位英文或数字'));
  } else {
    callback();
  }
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入密码'));
  }
  if (!/^[a-zA-Z0-9]{6,16}$/.test(value)) {
    callback(new Error('请输入6~16位英文或数字'));
  } else {
    callback();
  }
};
export const rules = {
  account: [{ validator: checkAccount, trigger: 'blur', required: true }],
  password: [{ validator: validatePass, trigger: 'blur', required: true }]
};
