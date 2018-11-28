'use strict'

const errors = require('../utils/errors')
const database = require('./../database')

async function findAll() {
  const query = await database.query('select * from users')
  return query.row.map(row => userFromRow(row))
}

async function findById(id) {
  const query = await database.query('select * from users where id=$1', { id })
  const row = query.rows[0]
  if (!row) {
    throw new errors.NotFoundError()
  }
  return userFromRow(row)
}

async function findByEmail(email) {
  const query = await database.query('select * from users where email=$1', { email })
  const row = query.rows[0]
  if (!row) {
    throw new errors.NotFoundError()
  }
  return userFromRow(row)
}

async function create(attributes) {
  const insertInstruction = `
  INSERT INTO users(email, name, password, disabled, created_at, updated_at)
  VALUES ($1, $2, $3, $4, NOW(), NOW())
  RETURNING *
  `

  const query = await database.query(
    insertInstruction,
    [
      attributes.email,
      attributes.name,
      attributes.password,
      attributes.disabled,
    ],
  )

  return userFromRow(query.rows[0])
}

function userFromRow(row) {
  return {
    id: row.id,
    name: row.name,
    password: row.password,
    disabled: row.disabled,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  }
}

module.exports = {
  findAll,
  findById,
  findByEmail,
  create,
}
