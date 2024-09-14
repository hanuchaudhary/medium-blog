// SignUpForm.tsx
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthBottom from "../components/AuthBottom";
import AuthTop from "../components/AuthTop";
import { Link, useNavigate } from "react-router-dom";
import { SigninType } from "@hanuchaudhary/medium-app";
import axios from "axios";
import { BACKEND_URL } from "../config";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [signinInputs, setSigninInputs] = useState<SigninType>({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        signinInputs
      );
      const jwtToken = response.data.token;
      localStorage.setItem("token", jwtToken);
      navigate("/blogs");
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center bg-zinc-100 justify-center h-screen">
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
            title={"Signin"}
            subTitle={"Signin to your account to get started."}
          />
        </div>
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
          onChange={(e) => setSigninInputs({...signinInputs, password : e.target.value})}
          placeholder="Enter your password"
        />

        <Button text="Sign In" onClick={handleSubmit} />
        <div>
          <AuthBottom
            title="Not have an Account? "
            to="/signup"
            label="Signup"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
