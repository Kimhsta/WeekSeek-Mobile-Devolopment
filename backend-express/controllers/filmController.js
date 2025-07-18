const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// untuk haopus
const fs = require('fs');
const path = require('path');

exports.createFilm = async (req, res) => {
    try {
      const { title, description, genre, release_year, duration } = req.body;
  
      const film = await prisma.film.create({
        data: {
          title,
          description,
          genre,
          releaseYear: parseInt(release_year),
          duration: parseInt(duration),
          posterUrl: req.file ? req.file.filename : null,
          uploadedBy: req.user.id,
        }
      });
  
      res.status(201).json({ message: 'Film berhasil ditambahkan', film });
    } catch (err) {
      console.error('Create film error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  exports.updateFilm = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, genre, release_year, duration } = req.body;
  
      // Ambil film lama dulu
      const existingFilm = await prisma.film.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!existingFilm) {
        return res.status(404).json({ message: 'Film tidak ditemukan' });
      }
  
      const updateData = {
        title,
        description,
        genre,
        releaseYear: parseInt(release_year),
        duration: parseInt(duration),
      };
  
      // Jika ada file baru
      if (req.file) {
        // Hapus poster lama jika ada
        if (existingFilm.posterUrl) {
          const oldPosterPath = path.join(__dirname, '../uploads', existingFilm.posterUrl);
          if (fs.existsSync(oldPosterPath)) {
            fs.unlinkSync(oldPosterPath);
          }
        }
  
        updateData.posterUrl = req.file.filename;
      }
  
      // Update film
      const updated = await prisma.film.update({
        where: { id: parseInt(id) },
        data: updateData,
      });
  
      res.json({ message: 'Film berhasil diupdate', film: updated });
    } catch (err) {
      console.error('Update film error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  exports.getAllFilms = async (req, res) => {
    try {
      const films = await prisma.film.findMany({
        include: {
          uploader: {
            select: { username: true }
          }
        }
      });
  
      res.json(films);
    } catch (err) {
      console.error('Get all films error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  exports.getFilmById = async (req, res) => {
    try {
      const film = await prisma.film.findUnique({
        where: { id: parseInt(req.params.id) },
        include: {
          uploader: {
            select: { username: true }
          }
        }
      });
  
      if (!film) return res.status(404).json({ message: 'Film not found' });
  
      res.json(film);
    } catch (err) {
      console.error('Get film by ID error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  exports.deleteFilm = async (req, res) => {
    try {
      const { id } = req.params
      const film = await prisma.film.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!film) {
        return res.status(404).json({ message: 'Film tidak ditemukan' });
      }
  
      if (film.posterUrl) {
        const filePath = path.join(__dirname, '../uploads', film.posterUrl);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); // atau gunakan await fs.promises.unlink(filePath);
        }
      }
  
      // Hapus film dari database
      await prisma.film.delete({
        where: { id: parseInt(id) },
      });
  
      res.json({ message: 'Film berhasil dihapus beserta poster-nya' });
    } catch (err) {
      console.error('Delete film error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  