'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  async up () {
    await this.raw(
      "CREATE TYPE \"post_type\" AS ENUM ('public', 'private');"
    ) // ENUM {public: 'Publico', private: 'Privado'}
    await this.create('posts', (table) => {
      table.increments()
      table.string('title', 254).notNullable()
      table.text('content').notNullable()
      table.specificType('type', 'post_type').notNullable() // ENUM = ['public', 'private'])
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
