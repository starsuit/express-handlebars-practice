// clears the current session and removes stored data
// redirects to the login page
const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return console.log(err);
  });
  res.redirect("/login");
};

module.exports = logout;
