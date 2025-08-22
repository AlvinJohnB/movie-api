const Movie = require("../models/Movie.js");

module.exports.createMovie = async (req, res, next) => {
  const { title, director, year, description, genre } = req.body;
  if (!title || !director || !year || !description || !genre) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const movie = new Movie({
      title,
      director,
      year,
      description,
      genre,
      comments: [],
    });
    await movie.save();
    res.status(201).send({ movie });
  } catch (error) {
    next(error);
  }
};
module.exports.updateMovie = async (req, res, next) => {
  const { id } = req.params;
  const { title, director, year, description, genre } = req.body;

  try {
    const movie = await Movie.findByIdAndUpdate(
      id,
      { title, director, year, description, genre },
      { new: true }
    );
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res
      .status(200)
      .json({ message: "Movie updated successfully", updatedMovie: movie });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).send({ message: "Movie deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({ movies });
  } catch (error) {
    next(error);
  }
};

module.exports.getMovieById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).send({ movie });
  } catch (error) {
    next(error);
  }
};

// Comments
module.exports.addComment = async (req, res, next) => {
  const { id } = req.params;
  const { comment } = req.body;
  const { id: userId } = req.user;

  if (!comment) {
    return res.status(400).json({ error: "Comment text is required" });
  }

  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    movie.comments.push({ user: userId, comment });
    await movie.save();

    res
      .status(201)
      .json({ message: "Comment added successfully", updatedMovie: movie });
  } catch (error) {
    next(error);
  }
};

module.exports.getComments = async (req, res, next) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({ comments: movie.comments });
  } catch (error) {
    next(error);
  }
};
