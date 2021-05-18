const Event = use('Event');

Event.on('new::user', async (user) => {
  /*
  await Mail.send('new.user', user, (message) => {
    message.to(user.email);
    message.from('from@email');
  });
  */
});

Event.on('forgot::password', ['User.ForgotPassword']);
