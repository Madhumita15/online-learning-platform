export type CourseListResponseType = {
  courses: {
    $id: string;
    title: string;
    description: string;
    categoryId: string;
    instructorId: string;
    price: number;
    image?: string;
    rating: number;
    status: string;
    language?: string;
    duration?: number;
    instructorName: string
    categoryName: string | null
    approveStatus: string

  }[];
  total: number;
};

export type getSingleCourseType = {
   $id: string;
    title: string;
    description: string;
    categoryId: string;
    instructorId: string;
    price: number;
    image?: string;
    rating: number;
    status: string;
    language?: string;
    duration?: number;
    instructorName: string
    categoryName: string | null
    approveStatus: string

}

export type CreateCourseResponse = {
    $id: string,
     title: string;
    description: string;
    categoryId: string;
    price: number;
    image?: string;
    rating: number;
    status: string;
    approveStatus: string

}


export type updateCourseResponseType = {
  $id: string,
  title: string;
  description: string;
  price: number;
  categoryId: string;
  categoryName: string | null;
  status: string
  approveStatus: string
};

export type updateCourseInput = {
  title: string; 
  description: string;
  price: number;
  categoryId: string;
  categoryName?: string | null
  status?: string
  approveStatus?: string
}



export type FormFields = {
  title: string,
  description: string,
  categoryId: string,
  price: number,
}

export type FormInputData = {
  title: string;
  description: string;
  price: number;
  categoryId: string;
  image?: FileList | null;
  
};


export type deleteCourseResponse = {
  id: string;
};
