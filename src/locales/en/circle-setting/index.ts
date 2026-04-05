export default {
  popUpCircle: {
    option1: "Edit Circle",
    option2: "Delete Circle",
    option3: "Report Circle",
    option4: "Leave Circle",
    option5: "Share Circle",
    share: {
      text1: "Check out this circle!",
      text2: "Share not supported. Link copied instead!",
    },
  },
  popUpPost: {
    option1: "Edit Post",
    option2: "Report Post",
    option3: "Delete Post",
  },
  deleteCircle: {
    popUpDelete: {
      title: "Delete",
      subtitle1: "Are you sure you want to delete this circle?",
      subtitle2:
        "If you delete this circle, you will permanently lose all data",
      button1: "Cancel",
      button2: "Delete Circle",
    },
    popUpDeleteCircle: {
      title: "Circle has been deleted",
      subtitle: "Please join other interesting circles",
    },
  },
  reportCirlce: {
    title: "Report Circle",
    subtitle1: "This circle will be reported",
    subtitle2: "Why are you reporting this circle?",
    option1: "Spam",
    option2: "Nudity or sexual Activity",
    option3: "Hate speech or symbols",
    option4: "Bullying or harassment",
    option5: "I do not like it",
    option6: "Scam or fraud",
    option7: "Something else",
    popUp: {
      title: "The report has been submitted",
      subtitle: "Thank you for helping us",
    },
  },
  leaveCircle: {
    title: "Leave",
    subtitle: "Are you sure want to leave this circle?",
    button1: "Cancel",
    button2: "Leave Circle",
    popUp: {
      title: "Successfully leaving the Circle",
      subtitle: "Please join other interesting circles.",
    },
  },
} as const;
