import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Switch,
  Button,
  Chip,
} from "@mui/material";
import { Edit, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import {
  deleteCourse,
  getAllCourse,
  getMyCourse,
  setIsEdit,
  setOpen,
  updateStatus,
} from "../../stores/slices/course.slice";
import { toast } from "sonner";
import type { statusRowInterface } from "../../typescript/interface/course.interface";

const CourseTableData = () => {
  const { courselist, page } = useAppSeletor((state) => state.course);
  const dispatch = useAppDispatch();
  const { role } = useAppSeletor((state) => state.auth);

  const handleDelete = async (rowId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
    try {
      const response = await dispatch(deleteCourse({ id: rowId })).unwrap();
      console.log("response", response);
      if (response) {
        if (role === "admin") {
          dispatch(getAllCourse({ page: page, limit: 5 }));
          toast.success("Course created Successfully");
        } else {
          dispatch(getMyCourse({ page: page, limit: 5 }));
          toast.success("Course created Successfully");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (row: statusRowInterface) => {
    const newStatus =
      row.status === "unpublished" ? "published" : "unpublished";
    try {
      const response = await dispatch(
        updateStatus({ id: row.$id, status: newStatus }),
      ).unwrap();
      // console.log(response)
      if (response) {
        toast.success("Status updated successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleApproveStatus = async (
    row: statusRowInterface,
    change: string,
  ) => {
    if (row.approveStatus !== "pending") {
      toast.info("Course Reviewed");
      return;
    }

    try {
      const response = await dispatch(
        updateStatus({
          id: row.$id,
          approveStatus: change,
          status: change === "approved" ? "published" : "unpublished",
        }),
      ).unwrap();
      if (response.approveStatus === "approved") {
        toast.success("Course Approved");
      } else {
        toast.success("Course Rejected");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableContainer sx={{
      boxShadow: '0px 5px 10px #312E81',
      
      }}>
      <Table sx={{ minWidth: 650,  }} aria-label="simple table">
        <TableHead  >
          <TableRow  >
            <TableCell
            
              align="center"
              sx={{ fontWeight: "bold", fontSize: "20px", color: '#1E40AF',  }}
            >
              Title
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "20px", color: '#1E40AF' }}
            >
              Category
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "20px", color: '#1E40AF' }}
            >
              Price
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "20px", color:  '#1E40AF' }}
            >
              Publish Status
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", fontSize: "20px", color: '#1E40AF' }}
            >
              Approve Status
            </TableCell>

            <TableCell
              sx={{ fontWeight: "bold", fontSize: "20px", color: '#1E40AF' }}
              align="center"
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {courselist?.length !== 0 &&
            courselist?.map((row) => (
              <TableRow
                key={row.$id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" sx={{color: '#4C1D95', fontWeight: "bold"}}>{row.title}</TableCell>
                <TableCell align="center" sx={{color: '#4C1D95', fontWeight: "bold"}}>{row.categoryName}</TableCell>
                <TableCell align="center" sx={{color: '#4C1D95', fontWeight: "bold"}}>{row.price}</TableCell>
                <TableCell align="center" sx={{color: '#4C1D95', fontWeight: "bold"}}>
                  {row.approveStatus === "approved" ? (
                    <Switch
                      checked={row.status === "published"}
                      onChange={() => handleStatus(row)}
                    />
                  ) : (
                    "Not Available"
                  )}
                </TableCell>
                <TableCell align="center">
                  {role === "admin" && row.approveStatus === "pending" ? (
                    <>
                      <Button
                        onClick={() => handleApproveStatus(row, "approved")}
                        variant="outlined"
                        color="success"
                      >
                        Approved
                      </Button>
                      <Button
                        onClick={() => handleApproveStatus(row, "rejected")}
                        variant="outlined"
                        color="error"
                        sx={{ marginLeft: "3px" }}
                      >
                        Rejected
                      </Button>
                    </>
                  ) : (
                    <Chip
                      label={row.approveStatus}
                      variant="filled"
                      color={
                        row.approveStatus === "approved" ? "success" : "error"
                      }
                    />
                  )}
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      dispatch(setOpen());
                      dispatch(setIsEdit(row.$id));
                    }}
                  >
                    <Edit />
                  </Button>
                  <Button
                    sx={{ color: "red" }}
                    onClick={() => handleDelete(row.$id)}
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CourseTableData;
