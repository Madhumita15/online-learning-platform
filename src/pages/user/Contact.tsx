import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { ArrowRight, Mail, MapPin, PhoneIncoming, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import Container from "@mui/material/Container";
import { toast } from "sonner";
import { ContactSchema } from "../../services/validation/contact.validation";
import type { FormData } from "../../typescript/type/contact.type";

export default function Contact() {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      query: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    toast.success(
      "Thanks for contacting us! Our team will review your message and respond via email shortly.",
    );
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Main Container */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
              Get In Touch
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              We are here to answer any question you may have. Reach out to us
              and let's start a conversation.
            </p>
          </div>
          <Container maxWidth="md">
            {/* Form and Contact Info Container */}
            <div className="flex flex-wrap gap-8 mb-16 sm:mb-20">
              {/* Form Section */}
              <div className="lg:pr-2">
                <h2 className="flex items-center gap-3 font-bold text-lg sm:text-xl text-slate-900 mb-6 sm:mb-8">
                  <Send className="w-5 h-5 text-blue-600" />
                  Send a message
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <TextField
                    fullWidth
                    type="text"
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors?.name?.message}
                    label="Your Name"
                    variant="outlined"
                    className="w-[300px]"
                  />

                  <TextField
                    fullWidth
                    type="email"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    label="Email"
                    variant="outlined"
                    className="w-[300px]"
                  />

                  <TextField
                    fullWidth
                    type="text"
                    {...register("subject")}
                    error={!!errors.subject}
                    helperText={errors?.subject?.message}
                    label="Subject"
                    variant="outlined"
                    className="w-[300px]"
                  />

                  <TextField
                    fullWidth
                    type="text"
                    {...register("query")}
                    error={!!errors.query}
                    helperText={errors?.query?.message}
                    label="Message"
                    variant="outlined"
                    rows={10}
                    multiline
                    className="w-[300px]"
                  />

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 mt-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    Send a message
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Quick Contact Info */}
              <div className="lg:pl-6">
                <h2 className="font-bold text-lg sm:text-xl text-slate-900 mb-6 sm:mb-8">
                  Let us know how we can help
                </h2>

                <div className="space-y-4 sm:space-y-6 ">
                  {/* Email Card */}
                  <div className="p-5  sm:p-6 bg-white rounded-xl border-2 border-slate-200 shadow-md hover:shadow-lg hover:border-blue-300 transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <Mail className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-1">
                          Feedbacks
                        </h3>
                        <p className="text-sm text-slate-600 mb-2">
                          Speak to our friendly team.
                        </p>
                        <p className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
                          vidyasu@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div className="p-5 sm:p-6 bg-white rounded-xl border-2 border-slate-200 shadow-md hover:shadow-lg hover:border-blue-300 transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <PhoneIncoming className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-1">
                          Call us
                        </h3>
                        <p className="text-sm text-slate-600 mb-2">
                          Mon-Fri from 8am to 5pm.
                        </p>
                        <p className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
                          +91 1234567890
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Location Card */}
                  <div className="p-5 sm:p-6 bg-white rounded-xl border-2 border-slate-200 shadow-md hover:shadow-lg hover:border-blue-300 transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <MapPin className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-1">
                          Visit us
                        </h3>
                        <p className="text-sm text-slate-600 mb-2">
                          Visit our office HQ.
                        </p>
                        <p className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
                          Sector-v
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
