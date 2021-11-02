const offerService = require('../../src/services/offer.service')

const buildOffer = ({
  type = 'crypto',
  name,
  coins = [],
  published = false,
  minDeposit = 0,
  starRating = 100,
  websiteUrl,
  dateFounded,
  emailSupport = false,
  headquarters,
  phoneSupport = false,
  paymentMethods = [],
  liveChatSupport = false,
  restrictedStates = [],
  withdrawalMethods = [],
  languagesSupported = [],
} = {}) => ({
  type,
  offer: {
    name,
    coins,
    published,
    minDeposit,
    starRating,
    websiteUrl,
    dateFounded,
    emailSupport,
    headquarters,
    phoneSupport,
    paymentMethods,
    liveChatSupport,
    restrictedStates,
    withdrawalMethods,
    languagesSupported,
  },
})

const seedDB = (offers=[]) => {
  return Promise.all(offers.map(buildOffer).map(offerService.createOffer))
}

describe('Offers Service', () => {

  test('Gets filtered offers', async () => {
    await Promise.all(['test-1', 'test-2'].map((name) => buildOffer({ name })).map(offerService.createOffer))
    const offers = await offerService.getFiltered()
    expect(offers).toHaveLength(2)
  })

  test('Can filter offers by coin', async () => {

    const cases = [
      {
        name: 'test-btc-xtz-eth',
        coins: ['BTC', 'XTZ', 'ETH']
      },
      {
        name: 'test-btc',
        coins: ['BTC']
      }
    ]

    const query = {
      query: {
        coins: 'ETH'
      }
    }

    await seedDB(cases)
    const offers = await offerService.getFiltered(query)

    expect(offers).toHaveLength(1)
    expect((offers[0] || {}).offer?.name).toBe('test-btc-xtz-eth')

  })

  test('Can filter offers by multiple coins', async () => {

    const cases = [
      {
        name: 'test-btc-xtz-eth',
        coins: ['BTC', 'XTZ', 'ETH']
      },
      {
        name: 'test-ada',
        coins: ['ADA']
      },
      {
        name: 'test-eth',
        coins: ['ETH']
      }
    ]

    const query = {
      query: {
        coins: 'XTZ,ETH'
      }
    }

    await seedDB(cases)
    const offers = await offerService.getFiltered(query)

    expect(offers).toHaveLength(2)
    expect(offers.map(({ offer }) => offer.coins).flat()).not.toContain('ADA')

  })

  test('Returns zero for no matching coin', async () => {

    const cases = [
      {
        name: 'test-btc-xtz-eth',
        coins: ['BTC', 'XTZ', 'ETH']
      }
    ]

    const query = {
      query: {
        coins: 'ABCDEF'
      }
    }

    await seedDB(cases)
    const offers = await offerService.getFiltered(query)

    expect(offers).toHaveLength(0)

  })

  test('Filters for only published offers', async () => {

    const cases = [
      {
        name: 'published-test',
        published: true
      },
      {
        name: 'draft-test',
        published: false
      }
    ]

    const query = {
      query: {
        published: '1'
      }
    }

    await seedDB(cases)
    const offers = await offerService.getFiltered(query)

    expect(offers).toHaveLength(1)
    expect((offers[0] || {}).offer?.name).toBe('published-test')

  })

  test('Filters for only draft offers', async () => {

    const cases = [
      {
        name: 'published-test',
        published: true
      },
      {
        name: 'draft-test',
        published: false
      }
    ]

    const query = {
      query: {
        published: '0'
      }
    }

    await seedDB(cases)
    const offers = await offerService.getFiltered(query)

    expect(offers).toHaveLength(1)
    expect((offers[0] || {}).offer?.name).toBe('draft-test')

  })

  test('Filters for the intersection of multiple fields', async () => {

    const cases = [
      {
        name: 'btc-published-test',
        published: true,
        coins: ['BTC', 'XTZ', 'ETH']
      },
      {
        name: 'btc-draft-test',
        published: false,
        coins: ['BTC', 'XTZ', 'ETH']
      }
    ]

    const query = {
      query: {
        published: '1',
        coins: 'BTC'
      }
    }

    await seedDB(cases)
    const offers = await offerService.getFiltered(query)

    expect(offers).toHaveLength(1)
    expect((offers[0] || {}).offer?.name).toBe('btc-published-test')

  })

  test('Gets offers less than minDeposit', async () => {

    const testCases = [
      {
        name: 'deposit-1000-test',
        minDeposit: 1000
      },
      {
        name: 'deposit-500-test',
        minDeposit: 500
      }
    ]

    const query = {
      query: {
        'min-deposit-lt': '750'
      }
    }

    await Promise.all(testCases.map(buildOffer).map(offerService.createOffer))
    const offers = await offerService.getFiltered(query)

    expect(offers).toHaveLength(1)
    expect((offers[0] || {}).offer?.name).toBe('deposit-500-test')

  })

  test('Gets offers greater than minDeposit', async () => {

    const testCases = [
      {
        name: 'deposit-1000-test',
        minDeposit: 1000
      },
      {
        name: 'deposit-500-test',
        minDeposit: 500
      }
    ]

    const query = {
      query: {
        'min-deposit-gt': '750'
      }
    }

    await Promise.all(testCases.map(buildOffer).map(offerService.createOffer))
    const offers = await offerService.getFiltered(query)

    expect(offers).toHaveLength(1)
    expect((offers[0] || {}).offer?.name).toBe('deposit-1000-test')

  })

})