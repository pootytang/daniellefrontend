type RetrievedUser = {
    id: string
    name: string
    email: string
    role: string
    access_token: string
    refresh_token: string
  }

type ReturnedObject = {
  user: RetrievedUser
  status: number //200|400|401|403
  message: string
}