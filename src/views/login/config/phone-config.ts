const checkPhone = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入手机号'));
  }
  if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)) {
    callback(new Error('请输入正确的手机号'));
  } else {
    callback();
  }
};

const validateCode = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入验证码'));
  } else {
    callback();
  }
};
export const rules = {
  phone: [{ validator: checkPhone, trigger: 'blur', required: true }],
  code: [{ validator: validateCode, trigger: 'blur', required: true }]
};
