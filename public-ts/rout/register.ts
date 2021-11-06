import router from './router';

const register: () => void = () => {
  router
    .register('/', 'homepage')
    .register('/profile', 'profile')
    .register('/signin', 'signIn')
    .register('/signup', 'signUp')
    .register('/homepage', 'homepage');
};

export default register;
