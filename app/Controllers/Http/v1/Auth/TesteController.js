'use strict';

class TesteController {
  async teste({ request, auth, response }) {

    let user = await auth.user.userEmails().fetch();

    console.log(user.toJSON());
  }
}

module.exports = TesteController;
