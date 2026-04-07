import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import {
  setOpen,
} from "../../stores/slices/course.slice";
import CourseTableData from "../../components/course/CourseTableData";
import CourseDialogForm from "../../components/course/CourseDialogForm";
import CoursePagination from "../../components/course/CoursePagination";
import { useAppDispatch } from "../../services/helper/redux";

const AdminCourses = () => {
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
          <Typography variant="h5" sx={{fontWeight: 'bold',color: '#5B21B6' }}>All Courses</Typography>
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
  );
};

export default AdminCourses;
