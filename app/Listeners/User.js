'use strict';

const Config      = use('Config');
const querystring = require('querystring');
const Mail        = use('Mail');
const Env = use('Env');


const User = exports = module.exports = {};

User.method = async () => {
};

User.ForgotPassword = async (payload) => {
  console.log('ForgotPassword listener');
  const tokenEscaped = querystring.escape(payload.token);
  console.log(tokenEscaped);

  const user = payload.user;

  const url_reset = `${Env.get('RESET_PASS_URL')}/reset?token=${tokenEscaped}`;

  console.log(user.email);
  try {
    const appName = Config.get('app.name');
    await Mail.send('emails.forgot_password', {user, url_reset }, (message) => {
      message
        .to(user.email)
        .from('nao_responder@uaifood.com')
        .subject(appName);
    });

  } catch (error) {
    console.log(error);
  }

};
