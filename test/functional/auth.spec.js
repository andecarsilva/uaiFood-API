'use strict';

const { test, trait } = use('Test/Suite')('Auth');

const User        = use('App/Models/User');
let refresh_token = null;

trait('Test/ApiClient');

test('Login', async ({ client }) => {
  await User.create(
    {
      username: 'Teste',
      email   : 'teste@teste.com',
      password: '123',
    },
  );

  const response = await client.post('/api/v1/auth/login')
    .send(
      {
        type    : 'access_token',
        email   : 'teste@teste.com',
        password: '123',
      },
    )
    .end();

  response.assertStatus(200);

  refresh_token = response.body.data.refreshToken || null;
});

test('Refresh Token', async ({ client, assert }) => {

  const response = await client.post('/api/v1/auth/login')
    .send(
      {
        type         : 'refresh_token',
        refresh_token: refresh_token,
      },
    )
    .end();

  response.assertStatus(200);
  assert.containsAllKeys(response.body.data, ['type', 'token', 'refreshToken'], 'O retorno está errado');
});
