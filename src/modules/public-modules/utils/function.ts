import * as constants from '../constants';

export const isPhoneNumberOrEmail = (text) => new RegExp(constants.regexVNPhoneNumberOrEmail).test(text);
export const isEmail = (text) => new RegExp(constants.regexEmail).test(text);
export const isPhoneNumber = (text) => new RegExp(constants.regexPhoneNumber).test(text);
export const isPassword = (text) => new RegExp(constants.regexPassword).test(text);
