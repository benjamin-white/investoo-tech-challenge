const knex = require('../database/knex')

const getFiltered = async () => {
  const offers = await knex.table('offers')
  // @todo - Filtering goes here
  return offers
}

module.exports = {
  getFiltered,
}
