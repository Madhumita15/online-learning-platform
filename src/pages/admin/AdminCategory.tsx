import {
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableBody,
  TextField,
  Typography,
} from "@mui/material";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { setClose, setError, setOpen } from "../../stores/slices/course.slice";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import {
  handleNext,
  handlePrev,
  createCategory,
  getAllCategory,
  setIsCategoryId,
  updateCategory,
  deleteCategory,
} from "../../stores/slices/category.slice";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { categorySchema } from "../../services/validation/category.validation";

const AdminCategory = () => {
  const dispatch = useAppDispatch();
  const { open } = useAppSeletor((state) => state.course);
  const { role } = useAppSeletor((state) => state.auth);
  const { loading, allCatagories, error, page, totals, isEditCategoryId } =
    useAppSeletor((state) => state.category);



  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: {name: string}) => {
    console.log(data);
    try {
      if (isEditCategoryId) {
        const updateResponse = await dispatch(
          updateCategory({ id: isEditCategoryId, data: data }),
        );
       
        if (updateResponse) {
           dispatch(setIsCategoryId(null))
           reset({
            name: ""
           })
          toast.success("Update Category Successfully!");
         
        }
      } else {
        const response = await dispatch(
          createCategory({ data: data, role: role }),
        ).unwrap();
        console.log("response from admincat", response);
        if (response) {
          dispatch(getAllCategory({ page: page, limit: 5 }));
          toast.success("Category Added Successfully!");
        }
      }
    } catch (error) {
      console.log(error);
    }
    reset();
    dispatch(setClose());
  };

  useEffect(() => {
    dispatch(getAllCategory({ page: page, limit: 5 }));
  }, [dispatch, page]);


    const handleDelete = async (rowId: string) => {
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if (!confirmDelete) return;
      try {
        const response = await dispatch(deleteCategory({ id: rowId }));
        console.log("response", response);
        if (response) {
          alert();
          toast.success("Category deleted successfully");
          dispatch(getAllCategory({ page: page, limit: 5 }));
        }
      } catch (error) {
        console.log(error);
      }
    };
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
          <Typography variant="h5" sx={{fontWeight: 'bold',color: '#5B21B6' }}>All Catagories</Typography>
          <Button variant="contained" onClick={() => dispatch(setOpen())}>
            Add Category
          </Button>
        </Box>

        <Box sx={{ marginTop: "30px" }}>
          <Dialog open={open} onClose={() => dispatch(setClose())}>
            <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
              Add Category
            </DialogTitle>
            <Card sx={{ padding: "5px" }}>
              <DialogContent>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  id="subscription-form"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <TextField
                    className="w-[350px]"
                    placeholder="Enter category Name"
                    {...register("name")}
                    helperText={errors.name?.message}
                    error={!!errors.name}
                    disabled={loading}
                  />
                </form>
                 {error && (
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {error}
              </p>
            )}
              </DialogContent>
              <DialogActions sx={{ marginTop: "15px" }}>
                  <Button
                    type="submit"
                    form="subscription-form"
                    variant="contained"
                    color="success"
                  >
                    {loading ? <CircularProgress color="success"/> : "Submit"}
                  </Button>
                  <Button
                    onClick={() => {
                      dispatch(setClose());
                      dispatch(setError());
                      dispatch(setIsCategoryId(null))
                      reset({
                        name: "",
                      });
                    }}
                    variant="contained"
                    color="error"
                  >
                    Cancel
                  </Button>
                </DialogActions>
            </Card>
          </Dialog>
          <TableContainer sx={{
      boxShadow: '0px 5px 10px #312E81',
      
      }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"  sx={{ fontWeight: "bold", fontSize: "20px", color: '#1E40AF' }}>
                    Id
                  </TableCell>
                  <TableCell align="center"  sx={{ fontWeight: "bold", fontSize: "20px", color: '#1E40AF' }}>
                    Category
                  </TableCell>
                  <TableCell align="center" 
                    sx={{ fontWeight: "bold", fontSize: "20px", color: '#1E40AF' }}
                    
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allCatagories.length !== 0 &&
                  allCatagories?.map((row) => (
                    <TableRow
                      key={row.$id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" sx={{color: '#4C1D95', fontWeight: "bold"}}>{row.$id}</TableCell>
                      <TableCell align="center"  sx={{color: '#4C1D95', fontWeight: "bold"}}>{row.name}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => {
                            dispatch(setOpen());
                            reset({
                              name: row.name,
                            });
                            dispatch(setIsCategoryId(row.$id));
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

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
              gap: 10
            }}
          >
            <Button
            disabled={page == 1}
              onClick={() => dispatch(handlePrev())}
              color="success"
              
            >
             <ChevronLeft size={40}/>
            </Button>
            <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "20px", color: '#312E81' }}>{`${page} of ${Math.ceil(totals/5)} data - ${totals}`}</Typography>
            <Button
            disabled={page === Math.ceil(totals / 5)}
              onClick={() => dispatch(handleNext())}
              color="error"
            >
             <ChevronRight size={40}/>
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AdminCategory;
