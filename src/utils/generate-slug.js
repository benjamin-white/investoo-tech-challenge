module.exports = function generateSlug(...args) {
  return Object.values(args)
    .join(' ')
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^\w\d]/g, ' ')
    .replace(/_/gi, '-')
    .trim()
    .replace(/\s+/g, '-')
}
