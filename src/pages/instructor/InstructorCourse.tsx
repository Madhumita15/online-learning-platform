import { Box, Button, Typography } from "@mui/material"
import { useAppDispatch } from "../../services/helper/redux";
import { setOpen } from "../../stores/slices/course.slice";
import CourseDialogForm from "../../components/course/CourseDialogForm";
import CourseTableData from "../../components/course/CourseTableData";
import CoursePagination from "../../components/course/CoursePagination";


const InstructorCourse = () => {
   const dispatch = useAppDispatch();
  return (
    <>
   <Box
      sx={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        
      }}
    >
      <Box
        sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
      >
          <Typography variant="h5" sx={{fontWeight: 'bold',color: '#5B21B6' }}>My Courses</Typography>
          <Button variant="contained" onClick={() => dispatch(setOpen())}>
            Add Course
          </Button>
        </Box>

        <Box sx={{ marginTop: "30px" }}>
           <CourseDialogForm />
           <CourseTableData />
         <CoursePagination /> 
        </Box>
      </Box>
    </>
  )
}

export default InstructorCourse