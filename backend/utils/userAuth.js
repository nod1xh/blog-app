function userAuth(userEmail, userUsername) {
  if (userEmail && userUsername) {
    return {
      success: false,
      message:
        "This email and username are already associated with an account.",
    };
  } else if (userEmail) {
    return {
      success: false,
      message: "This email is already associated with an account.",
      field: "email",
    };
  } else if (userUsername) {
    return {
      success: false,
      message: "This username is already associated with an account.",
      field: "username",
    };
  }

  return { success: true };
}

module.exports = userAuth;
