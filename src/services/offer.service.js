const knex = require('../database/knex')
const generateSlug = require('../utils/generate-slug')

const createOffer = ({ type, offer } = {}) => {
  const slug = generateSlug(offer.name, type)
  return knex.table('offers').insert({ offer: JSON.stringify(offer), slug, type })
}

const getFiltered = async ({ query } = {}) => {

  const offers = await knex.table('offers')
  if (typeof query !== 'object') return offers

  const mode = 'matchAll'

  const validQueries = {

    coins: (offer, value) => {
      const values = value.split(',')
      return offer.coins.filter(item => values.includes(item)).length
    },

    published: (offer, value) => {
      return offer.published === Boolean(Number(value))
    },

    'min-deposit-lt': (offer, value) => {
      return offer.minDeposit < Number(value)
    },

    'min-deposit-gt': (offer, value) => {
      return offer.minDeposit > Number(value)
    }

  }

  const queryParams = Object.entries(query)

  return offers.filter(({ offer }) => {
    const queryMatches = queryParams.filter(([ key, value ]) => {
      if (!validQueries[key] || !validQueries[key](offer, value)) return false
      return true
    })
    return mode === 'matchAll' ? queryMatches.length === queryParams.length : queryMatches.length
  })

}

module.exports = {
  createOffer,
  getFiltered,
}