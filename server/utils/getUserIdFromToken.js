const jwt = require('jsonwebtoken');

function getUserIdFromToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    // Handle the error (invalid token) as per your application's requirements.
    // For example, you could throw an error, return null, or return a default value.
    throw error;
  }
}

module.exports = getUserIdFromToken;
