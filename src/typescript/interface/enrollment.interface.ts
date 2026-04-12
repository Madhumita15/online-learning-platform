 export interface EnrollmentInitialState{
  loading: boolean,
  error: string | null,
  isEnrolledMap: Record<string, boolean>,
  allEnrollCourse: {
    courseId: string,
    userId: string,
    paymentSuccess: boolean
  }[]
  
}