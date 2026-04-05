export default {
  authOTP: {
    title1: "Yuk, Masukan Kode OTP",
    title2: "Kode-nya kami kirim ke ",
    title3: "",
    resend: "Kirim ulang kode OTP",
    otherMethod1: "Belum dapet kodenya? ",
    otherMethod3: "Coba",
    otherMethod4: " lewat",
    validation: "Yah, OTPmu salah, yuk coba lagi",
  },
  authPersonalData: {
    title: "Data Diri Kamu",
    name: "Nama Kamu",
    namePlaceholder: "Tuliskan nama kamu",
    dob: "Tanggal Lahir",
    day: "HH",
    month: "BB",
    year: "TTTT",
    seedsTag: "Seedstag adalah unique username Anda di aplikasi Seeds kami",
    validation: {
      seedsTag: "SeedsTag sudah dipakai, nih",
      regex: "SeedsTag tidak boleh berisi spasi atau simbol, harap dihapus!",
      dob: "Kamu harus berusia minimal 12 tahun",
    },
    validationVer2: {
      phone: {
        required: "Nomor HP wajib diisi",
        taken: "Nomor HP sudah terdaftar",
        invalidOrUsed: "Nomor HP tidak valid atau sudah digunakan",
      },
      email: {
        required: "Email wajib diisi",
        invalidFormat: "Format email tidak valid",
        taken: "Email sudah terdaftar",
        invalidOrUsed: "Email tidak valid atau sudah digunakan",
      },
      name: {
        required: "Nama wajib diisi",
        min: "Minimal {{min}} karakter",
        max: "Maksimal {{max}} karakter",
      },
      seedsTag: {
        required: "Silakan masukkan username Anda",
        taken: "Username ini sudah digunakan",
        regex:
          "Username hanya boleh berisi huruf, angka, serta simbol ( _ ) atau ( . ).",
        length: "Format username tidak valid (harus 3-15 karakter).",
        invalidOrUsed: "Username tidak valid atau sudah digunakan",
      },
      refCode: {
        notFound: "Kode referral tidak ditemukan",
        invalid: "Kode referral tidak valid",
      },
      password: {
        required: "Password wajib diisi",
        rules:
          "Password minimal 8 karakter dan harus mengandung huruf besar & huruf kecil",
      },
      confirmPassword: {
        required: "Konfirmasi password wajib diisi",
        mismatch: "Konfirmasi password tidak cocok",
      },
      dob: {
        minAge: "Usia minimal 12 tahun",
      },
      tnc: {
        required: "Anda harus menyetujui Syarat & Kebijakan",
      },
    },
  },
  authRef: {
    title1: "Masukan Kode Referralnya",
    title2: "Dan dapetin hadiah menarik",
    referral: "Kode Referral",
    referralPlaceholder: "Masukan kode referralnya",
    skip: "Lewati",
    confirm: "Konfirmasi",
    validation: "Kode referralmu nggak valid, nih",
  },
  authGuard: {
    modal: {
      title: "Selesaikan Onboarding Dulu",
      desc: "Kamu perlu menyelesaikan onboarding sebelum mendaftar akun. Yuk lanjutkan sekarang.",
      cancel: "Batal",
      goOnboarding: "Pergi ke Onboarding",
    },
  },
} as const;
