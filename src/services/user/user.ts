class User {
  public email: string;
  public username: string;
  public avatar: string;
  private autorize = false;
  public birth_day: string;
  public real_name: string;
  public real_surname: string;
  public sex: string;

  public set(obj: {
    'email': string,
    'username': string,
    'avatar': string,
    'birth_day': string,
    'real_name': string,
    'real_surname': string,
    'sex': string,
  }): void {
    const { email, avatar, username, birth_day, real_name, real_surname, sex } = obj;
    this.email = email || this.email;
    this.username = username || this.username;
    this.avatar = avatar || this.avatar;
    this.birth_day = birth_day || this.birth_day;
    this.autorize = true;
    this.real_name = real_name || this.real_name;
    this.real_surname = real_surname || this.real_surname;
    this.sex = sex || this.sex;
  }

  public delete(): void {
    this.email = undefined;
    this.username = undefined;
    this.avatar = undefined;
    this.birth_day = undefined;
    this.autorize = false;
    this.real_name = undefined;
    this.real_surname = undefined;
    this.sex = undefined;
  }

  public isAutorize(): boolean {
    return this.autorize;
  }
}

export default new User();
