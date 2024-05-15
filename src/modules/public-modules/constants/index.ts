export const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,16}$/g;
export const regexVNPhoneNumberOrEmail =
  /(84|0[35789])\d{8}\b|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
export const regexEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
export const regexPhoneNumber = /(84|0[35789])\d{8}\b/g;
export const passwordRecommendMsg =
  'Mật khẩu phải dài từ 8-16 ký tự, có ít nhất 1 chữ viết hoa, 1 chữ viết thường, 1 chữ số và 1 ký tự đặc biệt (!@#$%^&*)';
export const OTP_TIME = 119;
