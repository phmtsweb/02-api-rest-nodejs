import fastify from 'fastify'
import { randomUUID } from 'node:crypto'
import { knex } from './database'
import { env } from './env'

const app = fastify()

app.get('/hello', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: randomUUID(),
      title: 'Test Transaction',
      amount: 2000,
    })
    .returning('*')

  return transaction
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => console.log('HTTP Server is running'))
