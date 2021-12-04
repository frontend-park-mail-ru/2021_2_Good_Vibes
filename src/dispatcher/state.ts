class State {
  public state = 'homepage';

  public set(state: string) {
    this.state = state;
  }

  public get() {
    return this.state;
  }
}

export default new State();
