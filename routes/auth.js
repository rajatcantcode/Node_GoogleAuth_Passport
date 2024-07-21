const express = require("express");
const router = express.Router();
const passport = require("passport");

// Route to start Google authentication
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// Google callback route
router.get(
  "auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication
    res.redirect("/profile"); // Redirect to a protected route or profile page
  }
);

module.exports = router;
