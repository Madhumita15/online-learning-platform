import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-black text-white overflow-hidden">
    
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
       
      <div className="relative z-10">
     
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1220px' }}>
         
          <div className="flex flex-wrap pt-12 sm:pt-16 lg:pt-20 pb-12 gap-4 sm:gap-5">
        
          <div className="space-y-4 flex-1 min-w-[250px] sm:min-w-[280px]">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-white">V</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Edustack
              </h1>
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We provide industry-recognized online and offline courses to help learners gain practical skills and advance their careers.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm sm:text-base text-slate-300 hover:text-blue-400 transition duration-300">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>vidyasu@gmail.com</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 hover:text-blue-400 transition duration-300">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <span>Eco Intelligent Park, Unit No- 7E, 7th Floor, Block- EM, Plot-3, Salt Lake Sector-5, Kolkata 700091, India</span>
              </div>
              <div className="flex items-center gap-3 text-sm sm:text-base text-slate-300 hover:text-blue-400 transition duration-300">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+91 1234567890</span>
              </div>
            </div>
          </div>

        
          <div className="space-y-4 flex-1 min-w-[200px]">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full"></div>
              About
            </h2>
            <ul className="space-y-3">
              {["About us", "Courses", "News & Blogs", "Become a Teacher", "Contact Us"].map(
                (item, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-blue-400 transition duration-300 text-sm sm:text-base flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></span>
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

         
          <div className="space-y-4 flex-1 min-w-[200px]">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full"></div>
              Quick Links
            </h2>
            <ul className="space-y-3">
              {["Students", "Admission", "Faculty & Staffs", "Media Relations", "Alumni", "Visit"].map(
                (item, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-blue-400 transition duration-300 text-sm sm:text-base flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></span>
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

       
          <div className="space-y-4 flex-1 min-w-[250px]">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full"></div>
              Our Newsletter
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Enter your email and we'll send you exclusive updates and offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-slate-600 transition duration-300 text-sm"
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-lg opacity-0 group-focus-within:opacity-10 transition duration-300 pointer-events-none"></div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/50 text-sm sm:text-base"
              >
                <Send className="w-4 h-4" />
                {subscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>
            {subscribed && (
              <p className="text-green-400 text-xs sm:text-sm font-medium animate-pulse">
                ✓ Thank you for subscribing!
              </p>
            )}
          </div>
        </div>
        </div>

     
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1440px' }}>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        </div>

        {/* Bottom section */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1440px' }}>
          <div className="py-8 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <p className="text-slate-400 text-xs sm:text-sm text-center sm:text-left">
            &copy; 2024 Vidyasu. All rights reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, idx) => (
              <a
                key={idx}
                href="#"
                className="text-slate-400 hover:text-blue-400 transition duration-300 text-xs sm:text-sm"
              >
                {item}
              </a>
            ))}
          </div>
          </div>
        </div>
      </div>
     

      
    </footer>
  );
};

export default Footer;

