const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/github",
  (req, res, next) => {
    if (req.query.redirect) {
      req.session.redirectTo = req.query.redirect;
    }
    next();
  },
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    const redirectTo = req.session.redirectTo || "http://localhost:5173";
    delete req.session.redirectTo;
    res.redirect(redirectTo);
  }
);

router.get("/status", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      isAuthenticated: true,
      user: {
        id: req.user.id,
        username: req.user.username,
        displayName: req.user.displayName,
        profileUrl: req.user.profileUrl,
      },
    });
  } else {
    return res.json({ isAuthenticated: false });
  }
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
});

module.exports = router;
