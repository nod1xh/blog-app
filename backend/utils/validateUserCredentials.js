function validateUserCredentials(username, password) {
  if (username.length > 15 || username.length < 3) {
    return {
      success: false,
      message: "Username must be between 3 and 20 characters.",
      field: "username",
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters long.",
      field: "password",
    };
  }

  return { success: true };
}

module.exports = validateUserCredentials;
