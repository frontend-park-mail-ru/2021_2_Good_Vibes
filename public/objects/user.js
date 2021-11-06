class User {
  email;

  username;

  avatar;

  set({ email, username, avatar }) {
    this.email = email;
    this.username = username;
    this.avatar = avatar;
  }

  delete() {
    this.email = undefined;
    this.username = undefined;
    this.avatar = undefined;
  }
}

export default new User();
