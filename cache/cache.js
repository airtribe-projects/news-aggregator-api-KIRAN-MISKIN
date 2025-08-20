// Simple in-memory cache using an array
let newsCache = []; // [{ id, data, timestamp }]

const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

function getFromCache(id) {
  const now = Date.now();
  const item = newsCache.find(n => n.id === id);
  if (item) {
    if (now - item.timestamp < CACHE_TTL) {
      return item.data;
    } else {
      // expired
      newsCache = newsCache.filter(n => n.id !== id);
    }
  }
  return null;
}

// function setInCache(id, data) {
//   const now = Date.now();
//   // remove old if exists
//   newsCache = newsCache.filter(n => n.id !== id);
//   newsCache.push({ id, data, timestamp: now });
// }

// function getAllCache() {
//   return newsCache.map(n => n.data);
// }

function clearCache() {
  newsCache = [];
}

module.exports = { getFromCache, clearCache };
