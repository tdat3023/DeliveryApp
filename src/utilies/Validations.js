export const isValidUsername = (stringPhone) => {
  return /^(0[0-9]{9})$/.test(stringPhone);
};

//validate password
export const isValidPassword = (stringPassword) => stringPassword.length >= 3;
