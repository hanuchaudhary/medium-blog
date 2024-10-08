import { useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthBottom from "../components/AuthBottom";
import Spinner from "../components/Spinner";
import AuthTop from "../components/AuthTop";
import { Link, useNavigate } from "react-router-dom";
import { SigninType } from "@hanuchaudhary/medium-app";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { X } from "lucide-react";

const SignInForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signinInputs, setSigninInputs] = useState<SigninType>({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (!signinInputs.email || !signinInputs.password) {
      setError("-- Email and Password cannot be empty --");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        signinInputs
      );
      const jwtToken = response.data.token;
      localStorage.setItem("token", jwtToken);
      setError(null);
      navigate("/blogs");
    } catch (error) {
      setLoading(false);
      setError("Error while Login!! : " + error);
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
            title={"Sign In"}
            subTitle={"Sign in to your account to get started."}
          />
          {error && (
            <p className="text-red-600 text-center font-semibold mb-4">{error}</p>
          )}
          <div className="space-y-4">
            <Input
              name="email"
              label="Email"
              type="email"
              value={signinInputs.email}
              onChange={(e) =>
                setSigninInputs({ ...signinInputs, email: e.target.value })
              }
              placeholder="john@example.com"
            />
            <Input
              name="password"
              label="Password"
              type="password"
              value={signinInputs.password}
              onChange={(e) =>
                setSigninInputs({ ...signinInputs, password: e.target.value })
              }
              placeholder="Enter your password"
            />
          </div>
          <div className="mt-6">
            <Button text="Sign In" onClick={handleSubmit} />
          </div>
          <AuthBottom
            title="Don't have an Account? "
            to="/signup"
            label="Sign Up"
          />
        </motion.div>
      )}
    </div>
  );
};

export default SignInForm;