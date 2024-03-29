# Investoo Tech Challenge

The aim of this challenge is to introduce query parameter filtering to our API.

The code you have been sent is a heavily stripped down replication of our monolith API. Inside, you'll see an endpoint that returns all offers from the database. We'd like to be able to filter data coming back from the API, depending on the context in which it's requested.

For example, we may only want to return offers where the `minDeposit` property has a value higher than `100`. Or only show offers that support `BTC`.

Once you've done this, please take a look at the below questions and have a go at answering them.

**Please, do not spend hours on this challenge. If you've spent more than 2 hours working on this, I'd much prefer you to stop where you are, and write some notes detailing what your next steps would have been. No one likes a long test!**

### Requirements
* Implement query parameter filtering for your API. Think about where you'd perform this filtering, it's syntax, and usability. Below are some examples, **but you do not need to implement all of these!**
  * property is greater/less than/equal to X
  * property has date earlier/later than X
  * property contains/does not contain X (if the property is an array)
  * property is/is not set
  * property is "like" (similar to `.includes`)
* Refactor this project in whatever way you'd prefer
* Write test(s) for this filtering system

### Questions
* If you'd had more time, what you have changed?
* How would you improve the performance of this API?

### Project Setup
* Install docker if you haven't already got it
* Go into the project `cd investo-tech-challenge/`
* Build, create, start, and attach to containers `docker-compose up -d`
* Install dependencies `docker-compose run --rm offers npm i`
* Run migrations `docker-compose run --rm offers npm run knex:migrate:latest`
* Run seeds `docker-compose run --rm offers npm run knex:seed`
* Expose App logs `docker-compose logs -f`
* The API is exposed on port `3000` by default