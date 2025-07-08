const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {

  // Hash password untuk admin dan user
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);
  const hashedUserPassword = await bcrypt.hash('user123', 10);

  // Buat admin
  const admin = await prisma.user.create({
    data: {
      profile: 'admin.jpg',
      username: 'Hana Rima',
      email: 'rimaums@gmail.com',
      password: hashedAdminPassword, 
      role: 'admin',
    },
  });

  // Buat user biasa
  const user = await prisma.user.create({
    data: {
      profile: 'user.jpg',
      username: 'Kiki Mahesta',
      email: 'kim@gmail.com',
      password: hashedUserPassword,
      role: 'user',
    },
  });

  // Film 1
  const film1 = await prisma.film.create({
    data: {
      title: 'Inception',
      description: 'A thief enters dreams...',
      genre: 'Sci-Fi',
      releaseYear: 2010,
      duration: 148,
      rating: 0,
      views: 0,
      posterUrl: 'https://example.com/inception.jpg',
      trailerUrl: 'https://youtube.com/watch?v=YoHD9XEInc0',
      uploadedBy: admin.id,
    },
  });

  // Film 2
  const film2 = await prisma.film.create({
    data: {
      title: 'Interstellar',
      description: 'A journey through space and time...',
      genre: 'Sci-Fi',
      releaseYear: 2014,
      duration: 169,
      rating: 0,
      views: 0,
      posterUrl: 'https://example.com/interstellar.jpg',
      trailerUrl: 'https://youtube.com/watch?v=zSWdZVtXT7E',
      uploadedBy: admin.id,
    },
  });

  // Watch log (user menonton film1 dan film2)
  await prisma.watchLog.create({
    data: {
      userId: user.id,
      filmId: film1.id,
    },
  });

  await prisma.watchLog.create({
    data: {
      userId: user.id,
      filmId: film2.id,
    },
  });

  console.log('✅ Seed selesai!');
}

main()
  .catch((e) => {
    console.error('❌ Error saat seeding:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
