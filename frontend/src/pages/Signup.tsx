// SignUpForm.tsx
import { ChangeEvent, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthBottom from "../components/AuthBottom";
import { SignupType } from "@hanuchaudhary/medium-app";
import AuthTop from "../components/AuthTop";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

const SignUpForm = () => {
  const navigate = useNavigate();

  const [signupInputs, setSignupInputs] = useState<SignupType>({
    email: "",
    password: "",
    name: "",
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupInputs({ ...signupInputs, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        signupInputs
      );

      const jwt = response.data.token;
      console.log(jwt);
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center bg-neutral-100 justify-center h-screen">
      <div className="relative border-dashed px-16 border-green-950 border-2 p-8 rounded-none font-mono">
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
          onChange={handleOnChange}
        />
        <Input
          name="email"
          label="Email"
          type="email"
          value={signupInputs.email}
          onChange={handleOnChange}
          placeholder="john@example.com"
        />
        <Input
          name="password"
          label="Password"
          type="password"
          value={signupInputs.password}
          onChange={handleOnChange}
          placeholder="Enter your password"
        />

        <Button text="Sign Up" onClick={handleSubmit} />
        <AuthBottom
          title="Already have an Account? "
          to="/signin"
          label="Signin"
        />
      </div>
    </div>
  );
};

export default SignUpForm;
