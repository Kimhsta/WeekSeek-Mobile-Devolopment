const multer = require('multer');
const path = require('path');

// Fungsi pembatasan tipe gambar (jpg, jpeg, png, webp)
const imageFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp') {
    cb(null, true);
  } else {
    cb(new Error('Hanya gambar (jpg, jpeg, png, webp) yang diperbolehkan'), false);
  }
};

// Storage umum
const generateStorage = (folder = 'uploads') => multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

// === Upload khusus untuk foto profil ===
const uploadProfile = multer({
  storage: generateStorage('uploads/profile'),
  fileFilter: imageFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 1 MB
});

// === Upload khusus untuk poster film ===
const uploadPoster = multer({
  storage: generateStorage('uploads/posters'),
  fileFilter: imageFilter,
  limits: { fileSize: 3 * 1024 * 768 }, // 2 MB
});

module.exports = {
  uploadProfile,
  uploadPoster
};
