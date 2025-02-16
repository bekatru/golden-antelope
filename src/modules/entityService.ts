export class EntityService {
  protected state: State;

  constructor(state: State) {
    this.state = Object.assign({}, state);
  }

  getState() {
    this.state.timestamp = Date.now();
    return this.state;
  }
}
