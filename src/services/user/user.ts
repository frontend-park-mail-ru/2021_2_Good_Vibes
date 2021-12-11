class User {
  public email: string;

  public username: string;

  public avatar: string;

  private autorize = false;

  public set(obj: {
    'email': string,
    'username': string,
    'avatar': string,
  }): void {
    const { email, avatar, username } = obj;
    this.email = email || this.email;
    this.username = username || this.username;
    this.avatar = avatar || this.avatar;
    this.autorize = true;
  }

  public delete(): void {
    this.email = undefined;
    this.username = undefined;
    this.avatar = undefined;
    this.autorize = false;
  }

  public isAutorize(): boolean {
    return this.autorize;
  }
}

export default new User();
