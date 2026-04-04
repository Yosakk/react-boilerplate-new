export default {
  label: {
    name: "Name",
    dateOfBirth: "Date of Birth",
    email: "Your New Email",
    phone: "Your New Telephone Number",
  },
  placeholder: {
    name: "Enter Your Name",
    dateOfBirth: "Enter Your Birth Date",
    email: "example@mail.com",
    phoneNumber: "Please enter your phone number",
    successMessage: "Congratulations! The new password has been successfully created.",
    successTitle: "Success!",
    seedsTag: "@seedstag",
    referralCode: "Referral Code",
  },
  error: {
    required: {
      email: "Email is required, please enter your email!",
    },
    format: {
      email: "Please enter your email address in format yourname@example.com",
    },
  },
  phone: "Phone Number",
  email: "Email",
  birthDate: "Birth Date",
  type: {
    email: "Email",
    password: "Input Password",
    rePassword: "Confirm Password",
    phoneNumber: "Phone Number",
    name: "Name",
    seedsTag: "Seeds Tag",
    referralCode: "Referral Code",
    optional: "(optional)",
  },
  poll: {
    optionPlaceholder: "{{index}}. Enter an option",
    endDateLabel: "Set ending date",
    multivoteLabel: "Multivote",
    allowNewOptionLabel: "Allow new options",
  },
} as const;
