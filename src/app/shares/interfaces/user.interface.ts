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

export interface UserProfile {
  profile: {
    following: string,
    image: string,
    username: string
  }
}
