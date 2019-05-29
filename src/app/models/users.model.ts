export class User {
  id?: string;
  email: string;
  isAdmin: boolean;
  name: string;
  imageName: string;

  constructor(email: string) {
    this.email = email;
    this.isAdmin = false;
    this.name = email.split('@')[0];
    this.imageName = 'profile.png';
  }
}
