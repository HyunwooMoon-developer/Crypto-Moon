interface UserInterface {
  fname: string;
  lname: string;
  email: string;
  password: string;
  balance: number;
  comparePassword: (password: string) => boolean;
}

export default UserInterface;
