// Register Validation
export const validateRegister = ({ name, email, password }) => {
  const errors = {};

  if (!name?.trim()) {
    errors.name = "Name is required";
  }

  if (!email?.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Invalid email format";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

// Login Validation
export const validateLogin = ({ email, password }) => {
  const errors = {};

  if (!email?.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Invalid email format";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  return errors;
};

// Task Validation
export const validateTask = ({ title, description }) => {
  const errors = {};

  if (!title?.trim()) {
    errors.title = "Title is required";
  }

  if (!description?.trim()) {
    errors.description = "Description is required";
  }

  return errors;
};

// Utility Function
export const isValid = (errors) => {
  return Object.keys(errors).length === 0;
};