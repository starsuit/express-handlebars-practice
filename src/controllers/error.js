const missing = (req, res) => {
  res.status(404).end("<h1>404 not found</h1>");
};

const server = (err, req, res, next) => {
  console.log(err);
  res.status(500).end("<h1>500 server error</h1>");
};

module.exports = {
  missing,
  server
};
