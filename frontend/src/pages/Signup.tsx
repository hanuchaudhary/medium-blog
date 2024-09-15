// SignUpForm.tsx
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthBottom from "../components/AuthBottom";
import Spinner from "../components/Spinner";
import { SignupType } from "@hanuchaudhary/medium-app";
import AuthTop from "../components/AuthTop";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signupInputs, setSignupInputs] = useState<SignupType>({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        signupInputs
      );

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center bg-neutral-100 justify-center h-screen">
      {loading ? (
        <div className="flex items-center justify-center bg-transparent">
          <Spinner />
        </div>
      ) : (
        <div className="relative border-dashed md:px-16 mx-8 border-green-950 border-2 p-4 md:p-8 rounded-none font-mono">
          <div>
            <Link
              to={"/"}
              className="absolute top-2 right-4 font-semibold text-2xl"
            >
              ×
            </Link>
          </div>
          <div>
            <AuthTop
              title={"Signup"}
              subTitle={"Create your account to get started."}
            />
          </div>

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

          <Button text="Sign Up" onClick={handleSubmit} />
          <AuthBottom
            title="Already have an Account? "
            to="/signin"
            label="Signin"
          />
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
