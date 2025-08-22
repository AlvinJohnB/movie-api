const express = require("express");
const movieController = require("../controllers/movieController.js");
const router = express.Router();
const { verify, verifyAdmin } = require("../middlewares/authMiddleware.js");

router.post("/addMovie", verify, verifyAdmin, movieController.createMovie);
router.patch(
  "/updateMovie/:id",
  verify,
  verifyAdmin,
  movieController.updateMovie
);
router.delete(
  "/deleteMovie/:id",
  verify,
  verifyAdmin,
  movieController.deleteMovie
);

router.get("/getMovies", movieController.getAllMovies);
router.get("/getMovie/:id", movieController.getMovieById);

// Comments
router.patch("/addComment/:id", verify, movieController.addComment);
router.get("/getComments/:id", verify, movieController.getComments);

module.exports = router;
