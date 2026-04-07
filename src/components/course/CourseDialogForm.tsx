import {
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import {
  createCourse,
  getAllCourse,
  getMyCourse,
  setClose,
  setError,
  setIsEdit,
  updatecourse,
} from "../../stores/slices/course.slice";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseSchema } from "../../services/validation/course.validation";
import type {
  FormFields,
  FormInputData,
} from "../../typescript/type/course.type";
import { toast } from "sonner";
import { useEffect } from "react";
import { courseInput } from "../../services/json/inputsData/course.input";
import DynamicInput from "../DynamicInput";
import { getAllCategory } from "../../stores/slices/category.slice";
const CourseDialogForm = () => {
  const { allCatagories } = useAppSeletor((state) => state.category);
  const { role } = useAppSeletor((state) => state.auth);
  const { loading, error, isEdit, open, page, courselist } = useAppSeletor(
    (state) => state.course,
  );
  const dispatch = useAppDispatch();

  const {
    formState: { errors },
    register,
    reset,
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      categoryId: "",
    },
  });

  const onSubmit = async (data: FormInputData) => {
    // console.log("course data data", data);
    const categoryName = allCatagories.find(
      (item) => item.$id === data.categoryId,
    );
    // console.log("categoryName", categoryName);
    const imageFile: File | null =
      data.image && data.image.length > 0 ? data.image[0] : null;
    const formData = {
      ...data,
      image: imageFile,
      categoryName: categoryName?.name,
    };
    // console.log("admin formdata", formData);
    const editData = { ...data, categoryName: categoryName?.name || "" };
    try {
      if (isEdit) {
        const response = await dispatch(
          updatecourse({ id: isEdit, data: editData }),
        ).unwrap();
        console.log("update response", response);
        if (response) {
          toast.success("Course updated successfully!");
          dispatch(setIsEdit(null))
          reset(
            {
              title: "",
              description: "",
              price: 0,
              categoryId: ""

            }
          )
        }
      } else {
        const response = await dispatch(
          createCourse({
            data: formData,
            role: role,
          }),
        ).unwrap();
        console.log("add response", response);
        if (response) {
          if (role === "admin") {
            dispatch(getAllCourse({page: page, limit: 5 })).unwrap();
            toast.success("Course created Successfully");
          } else {
            dispatch(getMyCourse({ page: page, limit: 5 })).unwrap();
            toast.success("Course created Successfully");
          }
        }
      }

      reset()
      dispatch(setClose());
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    dispatch(getAllCategory({all: true}));
  }, [dispatch]);

  useEffect(() => {
    if(!role) return
    if (role === "admin") {
      dispatch(getAllCourse({ page: page, limit: 5 }));
    }else{
      dispatch(getMyCourse({page: page, limit: 5}))
    }
  }, [dispatch, page, role]);

  useEffect(() => {
    if (isEdit) {
      const findEditObj = courselist.find((item) => item.$id === isEdit);
      console.log(findEditObj);
      reset({
        title: findEditObj?.title,
        description: findEditObj?.description,
        price: findEditObj?.price,
        categoryId: findEditObj?.categoryId,
      });
    }
  }, [isEdit, courselist, reset]);

  return (
    <>
      <Dialog open={open} onClose={() => dispatch(setClose())} >
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          {isEdit ? "Update" : "Add"} Course
        </DialogTitle>
        <Card sx={{ padding: "10px", }}>
          <DialogContent >
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
              {courseInput?.map((input) => (
                <DynamicInput<FormFields>
                  key={input.name}
                  loading={loading}
                  name={input.name as keyof FormFields}
                  label={input.label}
                  required={input.required}
                  type={input.type}
                  register={register}
                  errors={errors}
                  isEdit={isEdit}
                />
              ))}
              <Controller
                disabled={loading}
                name="categoryId"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <FormControl error={!!errors?.categoryId}>
                    <InputLabel>Select Category</InputLabel>
                    <Select {...field} className="w-[350px]">
                      {allCatagories?.map((cat) => (
                        <MenuItem key={cat.$id} value={cat.$id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {errors?.categoryId?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </form>
          </DialogContent>
        </Card>
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
        <DialogActions>
          <Button
            type="submit"
            form="subscription-form"
            variant="contained"
            color="success"
          >
            {loading ? (
              <CircularProgress color="success" />
            ) : isEdit ? (
              "Edit"
            ) : (
              "Add"
            )}
          </Button>
          <Button
            onClick={() => {
              dispatch(setClose());
              dispatch(setIsEdit(null));
              dispatch(setError());
              reset({
                title: "",
                description: "",
                categoryId: "",
                price: 0,
              });
            }}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CourseDialogForm;
