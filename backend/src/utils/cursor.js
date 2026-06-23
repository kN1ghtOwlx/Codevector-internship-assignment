function encodeCursor(payload) {
    return Buffer.from(JSON.stringify(payload)).toString("base64url");
  }
  
  function decodeCursor(cursor) {
    const raw = Buffer.from(cursor, "base64url").toString("utf8");
    return JSON.parse(raw);
  }
  
  module.exports = {
    encodeCursor,
    decodeCursor,
  };