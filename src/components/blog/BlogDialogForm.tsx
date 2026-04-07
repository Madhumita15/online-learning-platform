import {
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import { setClose } from "../../stores/slices/course.slice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { blogSchema } from "../../services/validation/blog.validation";
import type {
  BlogFields,
  BlogFormInput,
} from "../../typescript/type/blog.type";
import {
  createBlog,
  getAllBlog,
  getMyBlog,
  setIsBlogId,
  updateBlog,
} from "../../stores/slices/blog.slice";
import { toast } from "sonner";
import { blogsInput } from "../../services/json/inputsData/blog.input";
import DynamicInput from "../DynamicInput";
import { useEffect } from "react";

const BlogDialogForm = () => {
  const { open } = useAppSeletor((state) => state.course);
  const dispatch = useAppDispatch();
  const { error, loading, isBlogId, page, blogList } = useAppSeletor(
    (state) => state.blog,
  );
  const { role } = useAppSeletor((state) => state.auth);

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (data: BlogFormInput) => {
    console.log(data);
    const imageFile: File | null =
      data.image && data.image.length > 0 ? data.image[0] : null;
    const formData = { ...data, image: imageFile };
    try {
      if (isBlogId) {
        const response = await dispatch(
          updateBlog({ id: isBlogId, data: data }),
        ).unwrap();
        console.log("update response", response);
        if (response) {
          dispatch(setIsBlogId(null));
          reset({
            title: "",
            content: "",
          });
          toast.success("blog updated successfully!");
        }
      } else {
        const response = await dispatch(
          createBlog({ data: formData, role: role }),
        ).unwrap();
        console.log(response);
        if (response) {
          if (role === "admin") {
            dispatch(getAllBlog({ page: page, limit: 5 }));
            toast.success("Blog created Successfully!");
          } else {
            dispatch(getMyBlog({ page: page, limit: 5 }));
            toast.success("Blog created Successfully!");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    reset();
    dispatch(setClose());
  };

  useEffect(()=> {
    if(isBlogId){
        const findBlogObj = blogList.find((item)=> item.$id === isBlogId)
        reset({
            title: findBlogObj?.title,
            content: findBlogObj?.content


        })
    }
  }, [isBlogId, blogList, reset])

  useEffect(() => {
    if (!role) return;
    if (role === "admin") {
      dispatch(getAllBlog({ page: page, limit: 5 }));
    } else {
      dispatch(getMyBlog({ page: page, limit: 5 }));
    }
  }, [dispatch, page, role]);

  return (
    <>
      <Dialog open={open} onClose={() => dispatch(setClose())}>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          Add Blog
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
              {blogsInput.map((input) => (
                <DynamicInput<BlogFields>
                  key={input.name}
                  loading={loading}
                  name={input.name as keyof BlogFields}
                  label={input.label}
                  required={input.required}
                  type={input.type}
                  register={register}
                  errors={errors}
                  isEdit={isBlogId}
                />
              ))}
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
              {loading ? (
                <CircularProgress color="success" />
              ) : isBlogId ? (
                "Update"
              ) : (
                "Add"
              )}
            </Button>
            <Button
              onClick={() => {
                dispatch(setClose());
                reset({
                  title: "",
                  content: "",
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
    </>
  );
};

export default BlogDialogForm;
