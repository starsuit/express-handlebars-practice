// renders login form on the page
const get = (req, res) => {
  res.render("login");
};

// processes the data submitted in the form, and adds it to the session variables
// once "name" is added to the session variables in the browser, it's available throughout the app
// so when we redirect to "/", req.session.name is still available
const post = (req, res) => {
  req.session.name = req.body.name;
  req.session.image = req.body.image;
  res.redirect("/");
};

module.exports = { get, post };
