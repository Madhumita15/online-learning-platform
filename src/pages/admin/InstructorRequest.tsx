import { useEffect } from "react";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import {
  deleteInstructor,
  getAllInstructor,
  handleNext,
  handlePrev,
  updateInstructorStatus,
} from "../../stores/slices/instructor.slice";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import type { InstructorRowInterface } from "../../typescript/interface/instructor.interface";




const InstructorRequest = () => {
  const { instructorList, page, totals } = useAppSeletor(
    (state) => state.instructor,
  );
  const dispatch = useAppDispatch();
  const { role } = useAppSeletor((state) => state.auth);

  useEffect(() => {
    dispatch(getAllInstructor({ page: page, limit: 5 }));
  }, [dispatch, page]);

  const handleStatus = async (row: InstructorRowInterface, change: string) => {
    if (row.status !== "pending") {
      toast.info("Course Reviewed");
      return;
    }
    // console.log("userId", row.userId);
    try {
      const response = await dispatch(
        updateInstructorStatus({
          id: row.$id,
          userId: row.userId,
          status: change,
        }),
      ).unwrap();
      if (response.status === "approved") {
        toast.success("Instructor Approved");
      } else {
        toast.success("Instructor Rejected");
      }
      console.log("user role", role);
    } catch (error) {
      console.log(error);
    }
  };


  const handleDelete = async(row: InstructorRowInterface)=>{
    try {
      await dispatch(deleteInstructor({id: row.$id, userId: row.userId}))
        dispatch(getAllInstructor({page: page, limit: 5}))
        toast.success("Instructor Deleted Successfully!")
      
      
    } catch (error) {
      console.log(error)
      
    }

  }

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
          <Typography variant="h5" sx={{fontWeight: 'bold',color: '#5B21B6' }}>All Instructors</Typography>
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
                Skills
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "20px", color: '#1E40AF' }}
              >
                Bio
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "20px", color: '#1E40AF' }}
              >
                Experience
              </TableCell>
              <TableCell
                align="center"
               sx={{ fontWeight: "bold", fontSize: "20px", color: '#1E40AF' }}
              >
                Approve Status
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "20px", color: '#1E40AF' }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instructorList?.length !== 0 &&
              instructorList?.map((row) => (
                <TableRow
                  key={row.$id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" sx={{color: '#4C1D95', fontWeight: "bold"}}>{row.name}</TableCell>
                  <TableCell align="center" sx={{color: '#4C1D95', fontWeight: "bold"}}>{row.email}</TableCell>
                  <TableCell align="center" sx={{color: '#4C1D95', fontWeight: "bold"}}>{row.skills}</TableCell>
                  <TableCell align="center" sx={{color: '#4C1D95', fontWeight: "bold"}}>{row.bio}</TableCell>
                  <TableCell align="center" sx={{color: '#4C1D95', fontWeight: "bold"}}>{row.experience}</TableCell>
                  <TableCell align="center">
                    {role === "admin" && row.status === "pending" ? (
                      <>
                        <Button
                          onClick={() => handleStatus(row, "approved")}
                          variant="outlined"
                          color="success"
                        >
                          Approved
                        </Button>
                        <Button
                          onClick={() => handleStatus(row, "rejected")}
                          variant="outlined"
                          color="error"
                          sx={{ marginLeft: "3px" }}
                        >
                          Rejected
                        </Button>
                      </>
                    ) : (
                      <Chip
                        label={row.status}
                        variant="filled"
                        color={row.status === "approved" ? "success" : "error"}
                      />
                    )}
                  </TableCell>
                  <TableCell align="center"  onClick={()=> handleDelete(row)}><Trash2 color="red"/></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
          gap: 10,
        }}
      >
        <Button
          disabled={page == 1}
          onClick={() => dispatch(handlePrev())}
          color="success"
        >
          <ChevronLeft size={40} />
        </Button>
        <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "20px", color: '#312E81' }}>{`${page} of ${Math.ceil(totals / 5)} data - ${totals}`}</Typography>
        <Button
          disabled={page === Math.ceil(totals / 5)}
          onClick={() => dispatch(handleNext())}
          color="error"
        >
          <ChevronRight size={40} />
        </Button>
      </Box>
    </>
  );
};

export default InstructorRequest;
