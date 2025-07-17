const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Tambah log nonton
const addToWatchLog = async (req, res) => {
  try {
    const userId = req.user.id;
    const filmId = parseInt(req.params.filmId);

    const film = await prisma.film.findUnique({ where: { id: filmId } });
    if (!film) return res.status(404).json({ message: 'Film tidak ditemukan' });

    const log = await prisma.watchLog.create({
      data: {
        userId,
        filmId
      }
    });

    // Tambahkan 1 view ke film
    await prisma.film.update({
      where: { id: filmId },
      data: {
        views: { increment: 1 }
      }
    });

    res.status(201).json({ message: 'Berhasil ditambahkan ke watch log', data: log });
  } catch (err) {
    console.error('Add watch log error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Ambil histori nonton user
const getWatchHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const history = await prisma.watchLog.findMany({
      where: { userId },
      include: { film: true },
      orderBy: { watchedAt: 'desc' }
    });

    res.status(200).json({ message: 'Histori berhasil diambil', data: history });
  } catch (err) {
    console.error('Get watch history error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteWatchLog = async (req, res) => {
  const userId = req.user.id;
  const filmId = parseInt(req.params.filmId);

  try {
    await prisma.watchLog.deleteMany({
      where: {
        userId,
        filmId,
      },
    });
    res.json({ message: 'Watch log deleted for this film' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting watch log' });
  }
};

const clearWatchHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    await prisma.watchLog.deleteMany({
      where: { userId },
    });
    res.json({ message: 'Watch history cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear watch history' });
  }
};


module.exports = {
  addToWatchLog,
  getWatchHistory,
  deleteWatchLog,
  clearWatchHistory
};
