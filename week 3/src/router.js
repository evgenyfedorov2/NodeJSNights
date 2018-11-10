'use strict'

const Router = require('koa-router')
const dogs = require('./dogs')
const { validate } = require('./utils/validation')
const log = require('./logger')

const router = new Router()

const schema = {
  type: 'Object',
  required: true,
  properties: {
    id: {
      type: 'integer',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    breed: {
      type: 'string',
      required: true,
    },
    birthYear: {
      type: 'number',
    },
    photo: {
      type: 'string',
      format: 'url',
    },
  },
}

router.get('/', ctx => {
  ctx.body = 'Hello world from Router'
})

router.get('/dogs', ctx => {
  ctx.body = dogs
})

router.get('/dogs/:id', ctx => {
  const dog = dogs.find(item => item.id === Number(ctx.params.id))

  if (!dog) {
    ctx.status = 404

    log.warn('No dog found')

    return
  }

  ctx.body = dog
})

router.post('/dogs', ctx => {
  const validation = validate(ctx.request.body, schema)
  if (!validation.valid) {
    ctx.status = 400
    ctx.body = {
      errors: validation.errors,
    }
    return
  }

  dogs.push(ctx.request.body)
  ctx.body = ctx.request.body
  ctx.status = 204
})

router.del('/dogs/:id', ctx => {
  const dog = dogs.find(item => item.id === Number(ctx.params.id))
  if (!dog) {
    ctx.status = 404

    log.warn('No dog found')

    return
  }
  dogs.splice(dogs.indexOf(dog), 1)
  ctx.status = 204
})

router.put('/dogs/:id', ctx => {
  const validation = validate(ctx.request.body, schema)
  if (!validation.valid) {
    ctx.status = 400
    ctx.body = {
      errors: validation.errors,
    }
    return
  }
  const dog = dogs.find(item => item.id === Number(ctx.params.id))
  if (!dog) {
    ctx.status = 404

    log.warn('No dog found')

    return
  }
  dogs[dogs.indexOf(dog)] = ctx.request.body
  ctx.body = ctx.request.body
})

module.exports = router.routes()
