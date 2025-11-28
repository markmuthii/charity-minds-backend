export const validateUserRegistration = (req, res, next) => {
  const {
    firstName,
    lastName,
    username,
    email,
    phone,
    dob,
    gender,
    password,
    confirmPassword,
  } = req.body;

  try {
    if (
      !username.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !dob.trim() ||
      !gender.trim()
    ) {
      throw new Error("All fields are required");
    }

    // email: john@doe.com
    // emailArray: ["john", "doe.com"]
    // const emailArray = email.split("@");

    // if (!emailArray[0] || !emailArray[1]) {
    //   res.status(400).json({
    //     message: "Email is invalid",
    //   });
    //   return;
    // }

    // // second part: doe.com
    // // emailSecondPart: ["doe", "com"]
    // const emailSecondPart = emailArray[1].split(".");

    // if (!emailSecondPart[0] || !emailSecondPart[1]) {
    //   res.status(400).json({
    //     message: "Email is invalid 2",
    //   });
    //   return;
    // }

    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error("Email is invalid");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    // Force the user to use a password that is at least 6 characters long, and contains a number, small letter, and capital letter
    // Eg, Passw0 is a valid password

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const validateUserLogin = (req, res, next) => {
  // Validate the login request data here

  console.log("Validating user login");
  next();
};
