const knex = require('../database/knex')

const getFiltered = async () => {
  const offers = await knex.table('offers')
  return offers
}

module.exports = {
  getFiltered,
}
