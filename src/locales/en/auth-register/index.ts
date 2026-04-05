export default {
  authOTP: {
    title1: "Input OTP Code",
    title2: "We have sent the OTP code via ",
    title3: " to",
    resend: "Resend OTP Code",
    otherMethod1: "Didn't get the code? ",
    otherMethod3: "Try",
    otherMethod4: " sending it by",
    validation: "Incorrect OTP. Please Try again.",
  },
  authPersonalData: {
    title: "Your Personal Data",
    name: "Your Name",
    namePlaceholder: "Enter your name",
    dob: "Date of Birth",
    day: "DD",
    month: "MM",
    year: "YYYY",
    seedsTag: "Seedstag is a unique username on our seeds apps",
    validation: {
      seedsTag: "SeedsTag already used",
      regex: "SeedsTag cannot contain spaces or symbols, please delete!",
      dob: "Minimun  age 12 Years old",
    },
    validationVer2: {
      phone: {
        required: "Phone number is required",
        taken: "Phone number is already registered",
        invalidOrUsed: "Phone number is invalid or already used",
      },
      email: {
        required: "Email is required",
        invalidFormat: "Invalid email format",
        taken: "Email is already registered",
        invalidOrUsed: "Email is invalid or already used",
      },
      name: {
        required: "Name is required",
        min: "Minimum {{min}} characters",
        max: "Maximum {{max}} characters",
      },
      seedsTag: {
        required: "Please enter your username",
        taken: "This username is already taken",
        regex:
          "Username can only include letters, number, and the symbols ( _ ) or ( . ).",
        length: "Invalid username format (must contain 3-15 character).",
        invalidOrUsed: "Username is invalid or already used",
      },
      refCode: {
        notFound: "Referral code not found",
        invalid: "Referral code is invalid",
      },
      password: {
        required: "Password is required",
        rules:
          "Password must be at least 8 characters and include uppercase and lowercase letters",
      },
      confirmPassword: {
        required: "Password confirmation is required",
        mismatch: "Password confirmation does not match",
      },
      dob: {
        minAge: "Minimum age is 12 years old",
      },
      tnc: {
        required: "You must agree to the Terms & Policy",
      },
    },
  },
  authRef: {
    title1: "Input Referral Code",
    title2: "To get exciting prizes",
    referral: "Referral Code",
    referralPlaceholder: "Input referral code",
    skip: "Skip",
    confirm: "Confirm",
    validation: "Invalid referral code",
  },
  authGuard: {
    modal: {
      title: "Finish Onboarding First",
      desc: "You need to complete the onboarding before creating an account. Let’s continue now.",
      cancel: "Cancel",
      goOnboarding: "Go to Onboarding",
    },
  },
} as const;
