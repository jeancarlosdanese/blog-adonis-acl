class AuthController {
  async authenticate ({ auth, request, response }) {
    const { email, password } = request.all()

    const token = await auth
      .attempt(email, password)

    return response.send(token)
  }
}

module.exports = AuthController
