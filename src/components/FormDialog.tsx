import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import DynamicInput from "./DynamicInput";
import type {
  FormDialogInterface,
  LoginForm,
  RegisterForm,
} from "../typescript/type/form.type";
import Box from "@mui/material/Box";
import { signupConfig } from "../services/config/signup.config";
import { loginConfig } from "../services/config/login.config";
import { useAppDispatch, useAppSeletor } from "../services/helper/redux";
import {
  clearErrors,
  loginUser,
  registerUser,
} from "../stores/slices/auth.slice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const FormDialog = ({
  open,
  setOpen,
  config,
  setConfig,
  from = "/"
}: FormDialogInterface) => {
  const { loading, loginError, registerError } = useAppSeletor(
    (state) => state.auth,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(config.schema),
    defaultValues: config.defaultValues,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Data", data);

    if (config.buttonText === "Register") {
      try {
        const response = await dispatch(
          registerUser(data as unknown as RegisterForm),
        ).unwrap();
        // console.log("response coming from formdialog", response);

        if (response?.success === true) {
          toast.success(response?.message);
          setConfig(loginConfig); // switch to login form
          reset();
        }
      } catch {
        console.log("error coming from register user");
      }
    } else {
      try {
        const response = await dispatch(
          loginUser(data as unknown as LoginForm),
        ).unwrap();
        // console.log("response coming from formdialog for login", response);
        if (response.success === true) {
          toast.success(response?.message);
          console.log("role from fromdialog", response.user);
          if (response.user.role === "admin") {
            navigate("/admin/dashboard");
            setOpen(false);
            reset();
          } else if (response.user.role === "instructor") {
            navigate("/instructor/dashboard");
            setOpen(false);
            reset();
          } else {
            navigate(from)
            setOpen(false);
            reset();
          }
        }
      } catch {
        console.log("error coming from register user");
      }
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          dispatch(clearErrors());
          reset();
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "25px",
            textAlign: "center",
            fontWeight: "bold",
            color: "blue",
          }}
        >
          {config.title}
        </DialogTitle>
        <DialogContent>
          <form
            id="subscription-form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-3 p-5 "
          >
            {config.inputs.map((input) => (
              <DynamicInput
                key={String(input.name)}
                label={input.label}
                required={input.required}
                register={register}
                type={input.type}
                name={input.name}
                errors={errors}
                loading={loading}
                isEdit={null}
              />
            ))}
            {registerError && <p className="text-red-600">{registerError}</p>}
            {loginError && <p className="text-red-600">{loginError}</p>}
            <Button
              type="submit"
              variant="contained"
              className="w-[100px]"
              disabled={loading}
            >
              {loading ? <CircularProgress /> : `${config.buttonText}`}
            </Button>
            <Box>
              {config.buttonText === "Login" ? (
                <Typography className="text-center">
                  Create An account ?{" "}
                  <Button onClick={() => setConfig(signupConfig)}>
                    Register
                  </Button>
                </Typography>
              ) : (
                <Typography className="text-center">
                  Already have an account ?{" "}
                  <Button onClick={() => setConfig(loginConfig)}>Login</Button>
                </Typography>
              )}
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormDialog;
