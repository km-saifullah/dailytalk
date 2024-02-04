// regex
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

let error = "";

export const emailValidation = (userEmail) => {
  if (!userEmail) {
    error = "📧 You Forget to Enter Email Address";
    return error;
  } else if (!emailRegex.test(userEmail)) {
    error = "📧 Please Enter a Valid Email Address";
    return error;
  } else {
    error = false;
    return error;
  }
};

export const passwordValidation = (userPassword) => {
  if (!userPassword) {
    error = "You Forget to Enter Password";
    return error;
  } else if (!passwordRegex.test(userPassword)) {
    error =
      "Password Must Contain 8 Characters, 1 uppercase, 1 lowercase & 1 special character";
    return error;
  } else {
    error = false;
    return error;
  }
};

export const confirmPasswordValidation = (confirmPassword, userPassword) => {
  if (!confirmPassword) {
    error = "You Forget to Enter Confirm Password";
    return error;
  } else if (!passwordRegex.test(confirmPassword)) {
    error =
      "Password Must Contain 8 Characters, 1 uppercase, 1 lowercase & 1 special character";
    return error;
  } else if (confirmPassword != userPassword) {
    error = "Password Does Not Match!";
    return error;
  } else {
    error = false;
    return error;
  }
};
