// Json-server simulates custom api injection middleware.
module.exports = (request, response, next) => {
  if (request.method === 'POST' && request.path === '/login') {
    if (
      request.body.username === 'tinyRipple' &&
      request.body.password === '1'
    ) {
      return response.status(200).json({
        user: {
          token: 'tinyRipple-zhengdonghui'
        }
      });
    } else {
      return response.status(400).json({
        message: 'Username or password is not correct.'
      });
    }
  }
  next();
};
