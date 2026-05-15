interface IMediator {
  sendMessage(userId: string, message: string): void;
}

interface IUser {
  readonly id: string;
  receiveMessage(message: string): void;
}

class User implements IUser {
  readonly id: string;
  private name: string;
  private mediator: IMediator;

  constructor(id: string, name: string, mediator: IMediator) {
    this.id = id;
    this.name = name;
    this.mediator = mediator;
  }

  sendMessage(message: string): void {
    console.log(`${this.name} sends message: ${message}`);
    this.mediator.sendMessage(this.id, message);
  }

  receiveMessage(message: string): void {
    console.log(`${this.name} receives message: ${message}`);
  }
}

class Group implements IMediator {
  private users: IUser[] = [];

  addUser(observer: IUser): void {
    this.users.push(observer);
  }

  removeUser(observer: IUser): void {
    this.users = this.users.filter((o) => o !== observer);
  }

  sendMessage(senderId: string, message: string): void {
    console.log(`Group receives message: ${message}`);
    this.notifyObservers(senderId, message);
  }

  private notifyObservers(senderId: string, message: string): void {
    this.users.forEach((observer) => {
      if (observer.id !== senderId) {
        observer.receiveMessage(message);
      }
    });
  }
}

const group = new Group();

const user1 = new User("1", "João", group);
const user2 = new User("2", "Maria", group);
const user3 = new User("3", "José", group);

group.addUser(user1);
group.addUser(user2);
group.addUser(user3);

user1.sendMessage("Olá, pessoal!");
user2.sendMessage("Oi, João!");
user3.sendMessage("Olá, João e Maria!");

