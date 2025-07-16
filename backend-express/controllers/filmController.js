const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
          releaseYear: parseInt(release_year),
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
  
      const updateData = {
        title,
        description,
        genre,
        release_year: parseInt(release_year),
        duration: parseInt(duration),
      };
  
      if (req.file) {
        updateData.poster_url = req.file.filename;
      }
  
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
  