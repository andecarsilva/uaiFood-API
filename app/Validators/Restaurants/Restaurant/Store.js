'use strict';

class Store {
  async authorize() {
    return true;
  }

  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name            : 'required|string|unique:restaurants,name',
      description     : 'required|string',
      type_of_food_id : 'required|integer',
      city            : 'required|string',
      state           : 'required|string',
      longitude       : 'required|string',
      latitude        : 'required|string',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages);
  }
}

module.exports = Store;
