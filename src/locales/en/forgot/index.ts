export default {
  phoneNumber:
    "Please enter your phone number. We will send you a message via WhatsApp",
  email: "Please enter your email. We will send you a message via Email",
  method: {
    email: "Forgot password via email",
    phoneNumber: "Forgot password via phone number",
    whatsapp: "Another way? Send via Whatsapp",
    sms: "Another way? Send via SMS",
  },
  otp: {
    sms: "Your OTP code has been sent on your SMS. Please check your SMS.",
    whatsapp: "Please enter the OTP Code that we sent to your WhatsApp.",
    resend: "Resend OTP",
  },
  createNewPassword: {
    "1": "Create New Password",
    "2": "Please create a secure password including the following criteria below",
    "3": "Enter Password",
    "4": "Please enter your password",
    "5": "Confirm Password",
    "6": "Please confirm your password",
    "7": "Password Must Contain:",
    "8": "Special characters",
    "9": "Uppercase and lowecase",
    "10": "Numbers",
    "11": "Minimum length of 8 characters",
  },
  success: {
    title: "Success!",
    text: "Congratulations! The new password has been successfully created.",
  },
  successSendEmail: {
    title: "Hoorayy!",
    text: "We have sent you an email to verify you are the owner",
  },
} as const;
