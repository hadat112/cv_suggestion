const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,16}$/g;
const regexVNPhoneNumberOrEmail = /(84|0[35789])\d{8}\b|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
const regexEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
const regexPhoneNumber = /(84|0[35789])\d{8}\b/g;

export const isPhoneNumberOrEmail = (text) => new RegExp(regexVNPhoneNumberOrEmail).test(text);
export const isEmail = (text) => new RegExp(regexEmail).test(text);
export const isPhoneNumber = (text) => new RegExp(regexPhoneNumber).test(text);
export const isPassword = (text) => new RegExp(regexPassword).test(text);
