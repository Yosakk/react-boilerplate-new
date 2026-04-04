export default {
  leaderBoard: {
    title: "Circle Leaderboard",
    description: "Find or create a Circle that matches your interests in Seeds.",
    join: "Joined",
    sort: "Sort by:",
  },
  list: {
    title: "Circle List",
    description:
      "Explore our list of communities, find the ones that match with your interest, or create one.",
  },
  banner: {
    title1: "Withdraw Profit",
    title2: "Transcation History",
    title3: "Circle Balance",
  },
  create: {
    title: "Create Circle",
    cover: "Add Cover",
    image: "Add Image",
    name: {
      label: "Circle Name",
      placeholder: "type circle name",
      error: "Input Circle Name",
      duplicate1: "The name",
      duplicate2: "is already in use!",
    },
    hashtag: {
      label: "Hashtag",
      placeholder: "#",
      error: "Input Hashtag",
    },
    description: {
      label: "Description",
      placeholder: "Type Description",
      error: "Input Description",
    },
    rules: {
      label: "Rules",
      placeholder: "type rules",
      error: "Input rules",
    },
    type: {
      label: "Membership Types",
      placeholder: "Set Your Membership type",
      error: "Set Your Membership type",
    },
    tnc: {
      label: "I agree with the Terms and Conditions*",
      error: "Make sure you agree with the terms and condition",
    },
  },
  typePopUp: {
    title: "Membership Types",
    subtitle: "Set your circle to free or premium for more access",
    option: {
      free: {
        title: "Free",
        subtitle: "Create an Investment Circle easily and for free",
      },
      premium: {
        title: "Premium",
        subtitle: "Create a Premium Circle for various benefits",
      },
    },
    button: "Continue",
  },
  settingMember: {
    title: "Add your members",
    add: "Add your members",
    subtitle: "You can add members by searching for the name or using the share link later.",
    button: "Create Circle",
  },
  success: {
    title: "Success!",
    subtitle:
      "Congratulations! The new Circle has been successfully created. Share your Circle Now!",
  },
  empty: {
    title: "Sorry",
    subtitle: "The data you were looking for does not exist",
  },
  failed: {
    title: "Failed!",
    subtitle: "Sorry, the new Circle creation has been failed. Please try again!",
  },
  exist: {
    title: "Oops!",
    subtitle: "The circle name is already exists, please try with another name.",
  },
  premium: {
    mainTitle: "Setting Circle Premium",
    title: "Premium Circle Choice",
    subtitle: "Set your circle premium to Lifetime Membership or Subscription.",
    option: {
      title1: "Lifetime Membership",
      subtitle1: "Member only need to pay one time to have access to the circle.",
      title2: "Subscription",
      subtitle2: "Member need to pay subscription every month/3 month/6month/12 month",
    },
    button: "Done",
  },
  fee: {
    title: "Set Circle Membership Fee",
    title2: "Set Fee Membership",
    placeholder: "Minimum membership fee IDR. 20,000",
    line: "or input manual",
    note: "Seeds will directly take a 20% discount from every membership fee transaction.",
  },
  withdraw: {
    method: {
      title: "Withdraw Method",
      input: "Input Withdrawal Nominal",
      method: {
        label: "Withdraw Method",
        placeholder: "Select your withdraw method",
      },
      bankRekening: {
        label: "Bank Account",
        placeholder: "Select your bank account",
      },
      numberRekening: {
        label: "Account Number",
        placeholder: "Input Bank account number",
      },
      nameRekening: {
        label: "Account Name",
        placeholder: "Your Bank account name",
      },
      button: "Continue",
      popUp: {
        title1: "Bank Transfer",
        title2: "E-Wallet",
        subtitle1: "Transfer via Bank",
        subtitle2: "Transfer via E-Wallet",
      },
    },
    pin: {
      title: "Enter Your PIN",
      subtitle: "Please enter your PIN number correctly",
      wrong: {
        title: "Enter Your PIN",
        subtitle1: "Please enter your PIN number correctly",
        subtitle2: "Please make sure you have the right PIN and try again.",
      },
    },
    success: {
      title: "Successful",
      subtitle1: "Your request has been made!",
      subtitle2: "The withdrawal request would take one business day.",
    },
    history: {
      title: "Transaction History",
      tab1: "Income",
      tab2: "Outcome",
      sortBy: {
        option1: "Success",
        option2: "Pending",
        option3: "Failed",
        option4: "On Progress",
      },
    },
  },
  payment: {
    paymentMethod: "Payment Method",
    virtualNumber: "Your Virtual Account Number",
    pendingPaidCircle: "Pending Paid Membership",
    circleFee: "Membership Fee",
    adminFee: "Admin Fee",
    serviceFee: "Service Fee",
    discountFee: "Discount Fee",
    totalAmount: "Total Amount",
    idTransaction: "ID Transaction",
    close: "Close",
    paymentSuccessful: "Successful",
    paymentSuccessDescription: "Your premium circle payment has been successfully processed",
    paymentFailed: "Payment Failed",
    paymentFailedDescription:
      "We can’t process your payment, Check your internet connection and try again.",
    paymentFailedWarning: "Payment Failed Circle Premium",
    getAccessToUnlock: "Get Access to unlock your membership",
    enjoyUnlimitedAccess: "Enjoy unlimited access to all premium content from various experts.",
    getFullAccess: "Get full access by paying once for a lifetime",
  },
} as const;
