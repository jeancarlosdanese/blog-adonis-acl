'use strict'

const Permission = use('Permission')

class PermissionController {
  async index () {
    const permissions = await Permission.all()

    return permissions
  }

  async store ({ request, response }) {
    const data = request.only(['name', 'slug', 'description'])

    const permission = await Permission.create(data)

    return response.status(201).json(permission)
  }

  async show ({ params }) {
    const permission = await Permission.findOrFail(params.id)

    return permission
  }

  async update ({ request, params, response }) {
    const permission = await Permission.findOrFail(params.id)

    const data = request.only(['name', 'slug', 'description'])

    permission.merge(data)

    await permission.save()

    return permission
  }

  async destroy ({ params }) {
    const permission = await Permission.findOrFail(params.id)

    permission.delete()
  }
}

module.exports = PermissionController
