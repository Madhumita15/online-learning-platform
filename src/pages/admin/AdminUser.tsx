import { useEffect } from "react";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import { chnageRoleSlice, getAllUsers } from "../../stores/slices/user.slice";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
} from "@mui/material";
import { toast } from "sonner";
import type { UserResponseType } from "../../typescript/type/user.type";

const AdminUser = () => {
  const dispatch = useAppDispatch();
  const { userList } = useAppSeletor((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleChange = async (row: UserResponseType, change: string) => {
    try {
      const response = await dispatch(
        chnageRoleSlice({ role: row.role, userId: row.userId, change: change }),
      ).unwrap();
      toast.success(`User role updated to ${response.role}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          marginTop: "20px",
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
        </Box>
      </Box>
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
                UserId
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "20px", color: '#1E40AF' }}
              >
                Name
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "20px", color: '#1E40AF' }}
              >
                Email
              </TableCell>
              <TableCell
                align="center"
               sx={{ fontWeight: "bold", fontSize: "20px", color: '#1E40AF' }}
              >
                Role
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
            {userList.length !== 0 &&
              userList?.map((row) => (
                <TableRow
                  key={row.$id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center"  sx={{color: '#4C1D95', fontWeight: "bold"}}>{row.userId}</TableCell>
                  <TableCell align="center"  sx={{color: '#4C1D95', fontWeight: "bold"}}>{row.name}</TableCell>
                  <TableCell align="center"  sx={{color: '#4C1D95', fontWeight: "bold"}}>{row.email}</TableCell>
                  <TableCell align="center"  sx={{color: '#4C1D95', fontWeight: "bold"}}>{row.role}</TableCell>
                  <TableCell align="center">
                    <>
                      {row.role === "admin" ? (
                       <span style={{color: '#4C1D95', fontWeight: "bold"}}>No Action</span> 
                      ) : (
                        <>
                          <Button
                            onClick={() => handleChange(row, "student")}
                            variant="outlined"
                            color="success"
                            disabled={row.role === "student"}
                          >
                            Make Student
                          </Button>
                          <Button
                            onClick={() => handleChange(row, "instructor")}
                            variant="outlined"
                            color="error"
                            sx={{ marginLeft: "3px" }}
                            disabled={row.role === "instructor"}
                          >
                            Make Instructor
                          </Button>
                        </>
                      )}
                    </>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminUser;
