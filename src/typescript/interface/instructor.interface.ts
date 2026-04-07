export interface InstructorRowInterface {
  experience: string
  skills: string
  $id: string
  name: string
  email: string
  bio: string
  userId: string
  status: string
}

 export type InstructorFormDataType = {
    name: string;
    email: string;
    phone: string;
    skills: string;
    bio: string;
    experience: string;
    image?: FileList | null | undefined
  };

export  type InstructorFormFields = {
    name: string;
    email: string;
    phone: string;
    skills: string;
    bio: string;
    experience: string;
    image?: FileList | null | undefined
    
  }

  export interface InstructorListInterface {
  userId: string;
  name: string;
  email: string;
  bio: string;
  experience: string;
  skills: string;
  status: string;
  $id: string;
  phone: string;
  image: string | undefined;
}