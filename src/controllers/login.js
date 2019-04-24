const https = require("https");

const getGitHub = url => {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "user-agent": "starsuit" } }, response => {
        let allTheData = "";
        response.on("data", chunk => {
          allTheData += chunk;
        });
        response.on("end", () => {
          // console.log(allTheData);
          try {
            resolve(JSON.parse(allTheData));
          } catch (e) {
            reject(`There was an error with the JSON: ${e}`);
          }
        });
      })
      .on("error", err => reject(`There was an error: ${err}`));
  });
};

// renders login form on the page
const get = (req, res) => {
  res.render("login");
};

// processes the data submitted in the form, and adds it to the session variables
// once "name" is added to the session variables in the browser, it's available throughout the app
// so when we redirect to "/", req.session.name is still available
const post = (req, res) => {
  const username = req.body.name;
  getGitHub(`https://api.github.com/users/${username}`).then(response => {
    req.session.image = response.avatar_url;
    req.session.name = response.login;
    res.redirect("/");
  });
};

module.exports = { get, post };
