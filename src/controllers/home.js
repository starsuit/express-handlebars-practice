// home will check if we are already logged in - if not, it will redirect to the login page

const home = (req, res) => {
  // the name submitted in the form has been stored in the session variables
  // we just have to get it out and assign it to a variable
  const name = req.session.name;
  if (!name) {
    res.status(302);
    res.redirect("/login");
  } else {
    // puts the 'name' variable into the home template (home.hbs) so it can render our name on the page
    res.render("home", { name });
  }
};

module.exports = home;
