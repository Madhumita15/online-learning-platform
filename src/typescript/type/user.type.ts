export type UserResponseType = {
  userId: string;
   name: string; 
   role: string;
    email: string;
     $id: string

}

export type UserInitialState={
  loading: boolean
  error: string | null
  userList: UserResponseType[]
  
}