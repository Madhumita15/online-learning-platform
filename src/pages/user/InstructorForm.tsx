import image1 from "../../assets/image (1) 1.png";
import image2 from "../../assets/Frame 539.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Container from "@mui/material/Container";
import { ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import { createInstructor } from "../../stores/slices/instructor.slice";
import { instructorInput } from "../../services/json/inputsData/instructor.input";
import DynamicInput from "../../components/DynamicInput";
import { toast } from "sonner";
import type { InstructorFormDataType, InstructorFormFields } from "../../typescript/interface/instructor.interface";
const InstructorForm = () => {
  const { user } = useAppSeletor((state) => state.auth);
  const { InstructorLoading, error } = useAppSeletor((state) => state.instructor);
  const dispatch = useAppDispatch();

  


  const InstructoruserSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email("Invalid Email"),
    phone: yup.string().required("phone is required"),
    skills: yup.string().required("Skills is required"),
    bio: yup.string().required("bio is required"),
    experience: yup
      .string()
      .required("Experience is Required")
      .min(1, "At least 1 year of experience required"),
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<InstructorFormDataType>({
    resolver: yupResolver(InstructoruserSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      skills: "",
      bio: "",
      experience: "",
    },
  });

  const onSubmit = async (data: InstructorFormDataType) => {
    if (user.role === null) {
      alert("Please Login First");
      return
    }
     const imageFile: File | null =
      data.image && data.image.length > 0 ? data.image[0] : null;
    const formData = {
      ...data,
      image: imageFile,
    };
    try {
      const response = await dispatch(createInstructor({data: formData})).unwrap()
     if(response){
      toast.success(" Application Submitted!. Thank you for applying to become an instructor. Our team is reviewing your request. You will be notified once it is approved.")
     }

    } catch(error) {
      console.log(error)
    }

    reset();
  };
  return (
    <>
      <Container maxWidth="md">
        <div className="mt-32 mb-32">
          <div className="border-b-2 pb-8">
            <h1 className="bg-gradient-to-r text-center from-purple-700 to-sky-500 bg-clip-text text-transparent font-bold text-4xl">
              How To Become an Instructor
            </h1>
          </div>
          <div className="flex flex-col md:flex-row mt-10 gap-4 ml-3 md:ml-0">
            <div className="w-[350px] md:w-[420px]">
              <h1 className="font-bold text-xl">Become an Instructor</h1>
              <p className="font-bold text-md mt-4">Plan your course</p>
              <p className="mt-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
                modi sint aspernatur earum soluta veritatis similique reiciendis
                veniam officia labore.
              </p>
              <p className="mt-4 font-bold">How we help you</p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. At
                quia adipisci debitis facere sed nulla quaerat itaque architecto
                ducimus assumenda.
              </p>
            </div>
            <div className="mt-10 md:mt-0">
              <img src={image1} alt="image1" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row mt-20 ml-3 md:ml-0">
            <div>
              <img
                src={image2}
                alt="imag2"
                className="h-[630px] md:w-[380px]  w-[330px] hover:scale-105"
              />
            </div>
            <div className="md:ml-9 mt-8 md:mt-0">
              <h1 className="font-bold text-2xl ">Become an Instructor</h1>
              <p>Discover a supportive community of online instructors.</p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-3 flex flex-col mt-5"
              >
                {instructorInput.map((input) => (
                  <DynamicInput<InstructorFormFields>
                    key={input.name}
                    loading={InstructorLoading}
                    name={input.name as keyof InstructorFormFields}
                    label={input.label}
                    required={input.required}
                    type={input.type}
                    register={register}
                    errors={errors}
                    isEdit={null}
                    
                  />
                ))}
                {
                  error && toast.success(error)
                }
                

                <button
                  type="submit"
                  className="w-[190px] p-2 font-bold rounded-md hover:bg-red-600 hover:shadow-xl bg-red-500 text-white flex flex-row gap-1 items-center justify-center"
                >
                  Become a Instructor <ArrowRight />
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>

      {/* Apply Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 text-white shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center  justify-between gap-6 sm:gap-8 lg:gap-16">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-blue-100 mb-1 sm:mb-2">
              COURSES FOR FREE, REGISTER NOW
            </p>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              CREATIVE IN RESEARCH AND TEACHING
            </h1>
          </div>
          <button className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-slate-100 hover:shadow-lg transition-all duration-300 flex items-center gap-2 whitespace-nowrap">
            Apply Now <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default InstructorForm;
