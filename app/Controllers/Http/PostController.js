'use strict'

const Post = use('App/Models/Post')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  async index ({ request, auth }) {
    const user = await auth.getUser()

    if (await user.can('read_private_post')) {
      const posts = await Post.all()

      return posts
    }

    const posts = await Post.query()
      .where({ type: 'public' })
      .fetch()

    return posts
  }

  async store ({ request, response }) {
    const { ...data } = request.only([
      'title',
      'content',
      'type'
    ])

    const post = await Post.create(data)

    return response.status(201).json(post)
  }

  async show ({ params, auth, response }) {
    const post = await Post.findOrFail(params.id)

    if (post.type === 'public') {
      return post
    }

    const user = await auth.getUser()

    if (await user.can('read_private_post')) {
      return post
    }

    return response.status(403).send({
      error: {
        message: 'Access forbidden. You are not allowed to this resource.'
      }
    })
  }

  async update ({ params, request }) {
    const { ...data } = request.only([
      'title',
      'content',
      'type'
    ])

    const post = await Post.findOrFail(params.id)

    post.merge(data)

    await post.save()

    return post
  }

  async destroy ({ params, request, response }) {
    const post = await Post.findOrFail(params.id)

    await post.delete()
  }
}

module.exports = PostController
