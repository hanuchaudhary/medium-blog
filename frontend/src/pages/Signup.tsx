import { useState } from "react";
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
import { X } from "lucide-react";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signupInputs, setSignupInputs] = useState<SignupType>({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async () => {
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
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Error while Signing up: " + error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-80 text-black dark:text-white transition-all duration-300"
         style={{backgroundImage: "url('https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png')"}}>
      {loading ? (
        <div className="flex items-center justify-center bg-transparent">
          <Spinner />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`relative border-2 border-dashed md:px-16 mx-8 ${
            error ? "border-red-600" : "border-black dark:border-neutral-700"
          } md:p-8 p-6 rounded-lg bg-white dark:bg-neutral-900 bg-opacity-90 dark:bg-opacity-70 font-sans max-w-md w-full`}
        >
          <Link to={"/"} className="absolute top-4 right-4 text-black dark:text-white hover:opacity-70 transition-opacity">
            <X size={24} />
          </Link>
          <AuthTop
            title={"Sign Up"}
            subTitle={"Create your account to get started."}
          />
          {error && (
            <p className="text-red-600 text-center font-semibold mb-4">{error}</p>
          )}
          <div className="space-y-4">
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
              placeholder="john@example.com"
            />
            <Input
              name="password"
              label="Password"
              type="password"
              value={signupInputs.password}
              onChange={(e) =>
                setSignupInputs({ ...signupInputs, password: e.target.value })
              }
              placeholder="Enter your password"
            />
          </div>
          <div className="mt-6">
            <Button text="Sign Up" onClick={handleSubmit} />
          </div>
          <AuthBottom
            title="Already have an Account? "
            to="/signin"
            label="Sign In"
          />
        </motion.div>
      )}
    </div>
  );
};

export default SignUpForm;