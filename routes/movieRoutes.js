const express = require("express");
const movieController = require("../controllers/movieController.js");
const router = express.Router();
const { verify, verifyAdmin } = require("../middlewares/authMiddleware.js");

router.post("/", verify, verifyAdmin, movieController.createMovie);
router.patch("/:id", verify, verifyAdmin, movieController.updateMovie);
router.delete("/:id", verify, verifyAdmin, movieController.deleteMovie);

router.get("/", movieController.getAllMovies);
router.get("/:id", movieController.getMovieById);

// Comments
router.post("/:id/comments", verify, movieController.addComment);
router.get("/:id/comments", verify, movieController.getComments);

module.exports = router;
