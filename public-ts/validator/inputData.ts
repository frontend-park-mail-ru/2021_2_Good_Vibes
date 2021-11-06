export default class Validate {
  public static signUp(obj: {
    'username': string,
    'email': string,
    'password': string,
    'repassword': string,
  }): string {
    const {
      username,
      email,
      password,
      repassword,
    } = obj;

    if (
      !password || !repassword
      || !username || !email
    ) {
      return 'Заполните все поля';
    }

    if (!email.match(/@/)) {
      return 'Неверный формат электронной почты';
    }

    if (!password.match(/^\S{4,}$/)) {
      return 'Неверный формат пароля';
    }

    if (password !== repassword) {
      return 'Пароли не одинаковые';
    }

    return undefined;
  }

  public static signIn(obj: {
    'username': string,
    'password': string,
  }): string {
    const {
      username,
      password,
    } = obj;

    if (!username || !password) {
      return 'Заполните все поля';
    }

    if (!password.match(/^\S{4,}$/)) {
      return 'Неверный формат пароля';
    }

    return undefined;
  }
}
