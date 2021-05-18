'use strict';

class WelcomeController {
  async index({ request, response, view }) {
    return view.render('welcome');
  }
}

module.exports = WelcomeController;
