const dict = {}

function generateToken(n) {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var token = '';
  for(var i = 0; i < n; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

/**
 * Encodes a URL to a shortened URL.
 *
 * @param {string} longUrl
 * @return {string}
 */
var encode = function(longUrl) {
    const token = generateToken(15);
    dict[token] = longUrl;

    return `http://tinyurl.com/${token}`;
};

/**
 * Decodes a shortened URL to its original URL.
 *
 * @param {string} shortUrl
 * @return {string}
 */
var decode = function(shortUrl) {
    const token = shortUrl.replace('http://tinyurl.com/', '');

    return dict[token];
};

/**
 * Your functions will be called as such:
 * decode(encode(url));
 */

const url = 'Hello world'
console.log(decode(encode(url)))