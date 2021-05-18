'use strict';

class Destroy {
  async authorize() {
    const user       = this.ctx.auth.user;
    const authorized = true;

    if (!authorized) {
      this.ctx.response.unauthorized('Not authorized');
      return false;
    }

    return true;
  }

  get rules() {
    return {
      // validation rules
    };
  }
}

module.exports = Destroy;
