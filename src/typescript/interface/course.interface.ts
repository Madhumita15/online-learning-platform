
export interface CourseType{
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
    instructorName: string,
    categoryName: string | null
    approveStatus: string
  
}

export interface CourseInitialState {
  loading: boolean;
  error: string | null;
  courselist: CourseType[];
  page: number;
  totals: number;
  isEdit: string | null;
  open: boolean,
  singleIdCourse: CourseType | null

}

export interface CreateFieldData  {
    title: string
    description: string
    price: number
    categoryId: string
    image?: File | null
    categoryName?:string | null

}

export interface CreateCourseData {
  title: string;
  description: string;
  price: number;
  categoryId: string;
  image: File;
}

export interface statusRowInterface{
    $id: string,
    status: string,
    title: string,
    description: string,
    price: number,
    categoryId: string,
    image?: string
    approveStatus: string
  }

  export interface UpdateStatusResponse {
  $id: string, 
  status: string, 
  approveStatus: string
}