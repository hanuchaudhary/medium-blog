import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthBottom from "../components/AuthBottom";
import Spinner from "../components/Spinner";
import { SignupType } from "@hanuchaudhary/medium-app";
import AuthTop from "../components/AuthTop";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Eye, EyeOff, X } from "lucide-react";
import BackgroundPanel from "../components/BackgroundPanel";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [signupInputs, setSignupInputs] = useState<SignupType>({
    email: "",
    password: "",
    name: "",
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!signupInputs.email || !signupInputs.name || !signupInputs.password) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        signupInputs
      );

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      setError(null);
      navigate("/blogs");
    } catch (error: any) {
      setLoading(false);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center bg-customLightOrange text-black dark:text-white transition-all duration-300"
      style={{
        backgroundImage:
          "url('https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png')",
      }}
    >
      {loading && (
        <div className="flex h-full w-full absolute z-[999999999] bg-customLightOrange/60  items-center justify-center ">
          <Spinner />
        </div>
      )}
      <div className="relative h-full md:w-96 w-[22rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`md:p-8 p-6 relative z-[99999] rounded-lg border-2 border-black bg-customLightOrange font-sans max-w-md w-full`}
        >
          <Link
            to={"/"}
            className="absolute top-4 right-4 text-black hover:opacity-70 transition-opacity"
          >
            <X size={24} />
          </Link>
          <AuthTop title={"Sign Up"} />
          {error && (
            <p className="text-customPink text-center font-semibold mb-4">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              label="Full Name"
              type="text"
              value={signupInputs.name}
              placeholder="John Doe"
              onChange={(e) =>
                setSignupInputs({ ...signupInputs, name: e.target.value })
              }
            />
            <Input
              name="email"
              label="Email"
              type="email"
              value={signupInputs.email}
              onChange={(e) =>
                setSignupInputs({ ...signupInputs, email: e.target.value })
              }
              placeholder="kushchaudharyog@gmail.com"
            />
            <div className="h-full w-full relative">
              <Input
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={signupInputs.password}
                onChange={(e) =>
                  setSignupInputs({
                    ...signupInputs,
                    password: e.target.value,
                  })
                }
                placeholder="Kush@123"
              />
              <div className="absolute z-[99999999] top-10 right-2">
                {showPassword ? (
                  <button type="button" onClick={handleShowPassword}>
                    {<EyeOff color="black" />}
                  </button>
                ) : (
                  <button type="button" onClick={handleShowPassword}>
                    {<Eye color="black" />}
                  </button>
                )}
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" text="Sign Up" />
            </div>
          </form>
          <AuthBottom
            title="Have an Account?"
            to="/signin"
            label="Login Here!"
          />
        </motion.div>
        <BackgroundPanel />
      </div>
    </div>
  );
};

export default SignUpForm;
