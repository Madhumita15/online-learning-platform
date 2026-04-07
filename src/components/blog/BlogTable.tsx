import {
  Button,
  TableBody,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  Chip,
} from "@mui/material";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import {
  deleteBlog,
  getAllBlog,
  getMyBlog,
  setIsBlogId,
  updateStatus,
} from "../../stores/slices/blog.slice";
import { setOpen } from "../../stores/slices/course.slice";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { BlogStatusRowType } from "../../typescript/type/blog.type";



const BlogTable = () => {
  const { blogList, page } = useAppSeletor((state) => state.blog);
  const { role } = useAppSeletor((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleDelete = async (rowId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
    try {
      const response = await dispatch(deleteBlog({ id: rowId })).unwrap();
      console.log("response", response);
      if (response) {
        if (role === "admin") {
          dispatch(getAllBlog({ page: page, limit: 5 }));
          toast.success("Blog deleted Successfully!");
        } else {
          dispatch(getMyBlog({ page: page, limit: 5 }));
          toast.success("Blog deleted Successfully!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (row: BlogStatusRowType, status: string) => {
    console.log("row id", row.$id);
    try {
      const response = await dispatch(
        updateStatus({ id: row.$id, status: status }),
      ).unwrap();
      if (response) {
        if (response.status === "approved") {
          toast.success("Blog Approved");
        } else {
          toast.success("Blog rejected");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <TableContainer sx={{
      boxShadow: '0px 5px 10px #312E81',
      
      }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "20px", color: '#1E40AF' }}
              >
                Title
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "20px", color: '#1E40AF' }}
              >
                Content
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "20px", color: '#1E40AF' }}
              >
                Status
              </TableCell>
              <TableCell
               sx={{ fontWeight: "bold", fontSize: "20px", color: '#1E40AF' }}
                align="center"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogList.length !== 0 &&
              blogList?.map((row) => (
                <TableRow
                  key={row.$id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" sx={{color: '#4C1D95', fontWeight: "bold"}}>{row.title}</TableCell>
                  <TableCell align="center" sx={{color: '#4C1D95', fontWeight: "bold"}}>{row.content.slice(0, 40)}....</TableCell>
                  <TableCell align="center" sx={{color: '#4C1D95', fontWeight: "bold"}}>
                    {role === "admin" && row.status === "pending" ? (
                      <>
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={() =>
                            row.$id && handleStatus(row, "approved")
                          }
                        >
                          Approved
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() =>
                            row.$id && handleStatus(row, "rejected")
                          }
                        >
                          Rejected
                        </Button>
                      </>
                    ) : (
                      <Chip
                        variant="filled"
                        label={row.status}
                        color={row.status === "approved" ? "success" : "error"}
                      />
                    )}
                  </TableCell>
                  <TableCell align="center" sx={{color: '#4C1D95', fontWeight: "bold"}}>
                    <Button
                      onClick={() => {
                        dispatch(setOpen());
                        dispatch(setIsBlogId(row.$id));
                      }}
                    >
                      <Edit />
                    </Button>
                    <Button
                      sx={{ color: "red" }}
                      onClick={() => row.$id && handleDelete(row.$id)}
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BlogTable;
