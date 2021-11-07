export interface UserLogin {
  user: {
    email: string,
    password: string,
  }
}

export interface UserRegistration {
  user: {
    username: string,
    email: string,
    password: string
  }
}
