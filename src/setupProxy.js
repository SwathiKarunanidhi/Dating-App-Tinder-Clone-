const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api/createUser", "/api/getUser","/api/updateUser","/api/getCurrentUser","/api/getGenderedUsers","/api/updateMatches","/api/getMatchedUsers","/api/getUserMessages","/api/sendMessages"], createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};