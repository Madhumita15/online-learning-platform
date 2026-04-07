import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useAppDispatch} from "../../services/helper/redux";
import { setOpen } from "../../stores/slices/course.slice";
import BlogDialogForm from "../../components/blog/BlogDialogForm";
import BlogTable from "../../components/blog/BlogTable";
import BlogPagination from "../../components/blog/BlogPagination";




const AdminBlog = () => {
  const dispatch = useAppDispatch();
  return (
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
        <Typography variant="h5" sx={{fontWeight: 'bold',color: '#5B21B6' }}>All Blogs</Typography>
        <Button variant="contained" onClick={() => dispatch(setOpen())}>
          Add Blog
        </Button>
      </Box>

      <Box sx={{ marginTop: "30px" }}>
        <BlogDialogForm />
        <BlogTable />
        <BlogPagination />

       
      </Box>
    </Box>
  );
};

export default AdminBlog;
