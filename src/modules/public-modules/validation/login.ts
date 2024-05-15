import * as yup from 'yup';
import { isPassword, isPhoneNumber, isPhoneNumberOrEmail } from '../utils/function';

const createObject = {
  identity: yup
    .string()
    .required('Vui lòng nhập tên đăng nhập')
    .test(
      'is-phone-number-or-email',
      'Vui lòng nhập đúng định dạng email hoặc số điện thoại',
      isPhoneNumberOrEmail
    ),
  password: yup.string().required('Vui lòng nhập password'),
};

const loginSchema = yup.object().shape(createObject);

export const loginValidator: any = {
  async validator({ field }, value) {
    await loginSchema.validateSyncAt(field, { [field]: value });
  },
};

const register = {
  identity: yup
    .string()
    .required('Vui lòng nhập tên đăng nhập')
    .test(
      'is-phone-number-or-email',
      'Vui lòng nhập đúng định dạng email hoặc số điện thoại',
      isPhoneNumberOrEmail
    ),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .test('is-strong-password', 'Mật khẩu chưa đủ điều kiện', isPassword),
  confirm_password: yup.string().required('Vui lòng nhập lại mật khẩu'),
};

const registerSchema = yup.object().shape(register);

export const registerValidator: any = ({ getFieldValue }) => {
  return {
    async validator({ field }, value) {
      const password = getFieldValue('password');

      if (password !== value && field === 'confirm_password')
        return Promise.reject(new Error('Mật khẩu không trùng khớp'));

      await registerSchema.validateSyncAt(field, { [field]: value });
    },
  };
};

const forgottenPassword = {
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu mới')
    .test('is-strong-password', 'Mật khẩu chưa đủ điều kiện', isPassword),
  confirm_password: yup.string().required('Vui lòng nhập lại mật khẩu mới'),
};

const forgottenPasswordSchema = yup.object().shape(forgottenPassword);

export const forgottenPasswordValidator: any = ({ getFieldValue }) => {
  return {
    async validator({ field }, value) {
      const password = getFieldValue('password');

      if (password !== value && field === 'confirm_password')
        return Promise.reject(new Error('Mật khẩu không trùng khớp'));

      await forgottenPasswordSchema.validateSyncAt(field, { [field]: value });
    },
  };
};
