export default {
  setting: {
    title: "Settings",
    accountInfo: {
      title: "Account Information",
      name: "Name",
      edit: "Edit Image",
      DoB: "Date of Birth",
    },
    accountSecure: {
      title: "Account Security Center",
      titleCard1: "Security Setting",
      label1Card1: "Phone Number",
      blank1Card1: "add your phone number",
      label2Card1: "Password",
      blank2Card1: "Create a new password",
      label3Card1: "Email",
      blank3Card1: "add your email",
      titleCard2: "Associated Account",
      titleCard3: "Delete Account",
      descriptionCard3:
        "Deleting your account will delete all of your information.",
      confirm: "Confirm",
      titleMail1: "Let's, add your Email!",
      titleMail2: "For security purposes verify add your email first",
      titleChangeMail1: "Let's, Change your Email!",
      titleChangeMail2: "Enter your new email",
      placeholderMail: "Input your email",
      titleNumber1: "Let's, Add Phone Number!",
      titleNumber2: "Enter your new phone number",
      titleChangeNumber1: "Let's, Change Phone Number!",
      titleChangeNumber2: "Enter your new phone number",
      validationNumber1: "Oops, Phone Number already used",
      validationNumber2: "Your phone number contains at least 6 digits",
      validationEmail: "Oops,  Your email already registered",
      prevent: {
        title: "Account Security Update",
        password: "Please bind your account with a phone number first",
        unlink:
          "Please bind your account with a phone number and password first",
      },
      delete: {
        title1: "Are you sure to delete this account?",
        title2:
          "If you select ‘yes’, your account data will be deleted in 30 days",
        yes: "Yes",
        no: "No",
      },
      modalUnlink: {
        title1: "Input Your Password",
        title2: "For security purposes confirmation your password",
        validation: "Your password is wrong",
      },
      settingPassword: {
        title1: "Create New Password",
        title2: "Let’s create a secure password",
        title3: "Input New Password",
        title4: "Let’s Change Password",
        createPassword: {
          label: "Create a New Password",
          placeholder: "Please create password",
        },
        matchPassword: {
          label: "Confirm New Password",
          placeholder: "Please confirm password",
        },
        newPassword: {
          label: "New Password",
          placeholder: "Please create password",
          validation:
            "Password must contain 8 digit with upper case and lower case",
        },
        oldPassword: {
          label: "Current Password",
          placeholder: "Please input password",
          validation: "Oops, current password is wrong",
        },
      },
    },
    createPin: {
      title: "Create PIN",
    },
    changePin: {
      title: "Change PIN",
    },
    language: {
      title: "Language",
    },
    savedPost: {
      title: "Saved Post",
      info: "Information",
      infoMessage: "This page contains your previous saved post.",
      noData: "Ups, belum ada postingan tersimpan",
      noDataMessage:
        "Jelajahi postingan di halaman sosial dan simpan yang terbaik!",
    },
    currency: {
      title: "Currency",
    },
    block: {
      title: "Block List",
    },
    legal: {
      title: "Legal",
    },
    faq: {
      title: "FAQ & Help",
    },
    rate: {
      title: "Rate Apps",
    },
    chat: {
      title: "Chat With Seedy",
    },
    logout: {
      title: "Log Out",
    },
  },
  changeAvatar: {
    title: "Gallery",
    content: {
      title: "Choose your Avatar",
      subTitle: "Create an avatar that describes yourself!",
      male: "Male",
      female: "Female",
      or: "Or upload from local",
      upload: "Upload Image",
      hint: "*Image max size is 5MB only supported: JPG, JPEG, PNG, HEIC, HEIF",
    },
  },
} as const;
