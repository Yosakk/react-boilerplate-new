export default {
  phoneNumber: "Mohon ketikkan nomor telepon anda. Kami akan kirimkan pesan melalui Whatsapp",
  email: "Mohon ketikkan email anda. Kami akan kirimkan pesan melalui email",
  method: {
    email: "Lupa sandi via email",
    phoneNumber: "Lupa sandi via nomor telepon",
    whatsapp: "Cara lain? Kirim via Whatsapp",
    sms: "Cara lain? Kirim via SMS",
  },
  otp: {
    sms: "Kode OTP Anda telah dikirim melalui SMS Anda. Silakan periksa SMS Anda.",
    whatsapp: "Silakan masukkan Kode OTP yang kami kirim ke WhatsApp Anda.",
    resend: "Kirim ulang OTP",
  },
  createNewPassword: {
    "1": "Buat Kata Sandi Baru",
    "2": "Silakan buat kata sandi yang aman termasuk kriteria berikut di bawah ini",
    "3": "Masukkan kata kunci",
    "4": "Silakan masukkan kata sandi Anda",
    "5": "Konfirmasi Kata sandi",
    "6": "Silakan konfirmasi kata sandi Anda",
    "7": "Kata sandi harus berisi:",
    "8": "Karakter spesial",
    "9": "Huruf besar dan huruf kecil",
    "10": "Angka",
    "11": "Panjang minimal 8 karakter",
  },
  success: {
    title: "Berhasil!",
    text: "Selamat! Kata sandi baru telah berhasil dibuat.",
  },
  successSendEmail: {
    title: "Hoorayy!",
    text: "Kami telah mengirimkan email verifikasi kepada Kamu",
  },
} as const;
