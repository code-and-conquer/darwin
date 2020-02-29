import hyperid from 'hyperid';

const hyperIdInstance = hyperid();

export default class GameObject {
  private id: string

  private position: Pos;

  constructor() {
    this.id = hyperIdInstance();
    this.position = {
      x: Math.floor(Math.random() * (21)),
      y: Math.floor(Math.random() * (21)),
    };
  }

  toJSON(): any {
    return Object.assign(this, {
      type: this.constructor.name,
    });
  }
}
