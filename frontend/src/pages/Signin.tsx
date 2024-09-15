// SignUpForm.tsx
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthBottom from "../components/AuthBottom";
import Spinner from "../components/Spinner";
import AuthTop from "../components/AuthTop";
import { Link, useNavigate } from "react-router-dom";
import { SigninType } from "@hanuchaudhary/medium-app";
import axios from "axios";
import { BACKEND_URL } from "../config";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signinInputs, setSigninInputs] = useState<SigninType>({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        signinInputs
      );
      const jwtToken = response.data.token;
      localStorage.setItem("token", jwtToken);
      navigate("/blogs");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center bg-zinc-100 justify-center h-screen">
      {loading ? (
        <div className="flex items-center justify-center bg-transparent">
          <Spinner />
        </div>
      ) : (
        <div className="relative border-dashed md:px-16 mx-8 border-green-950 border-2 md:p-8 p-4 rounded-none font-mono">
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
            onChange={(e) =>
              setSigninInputs({ ...signinInputs, password: e.target.value })
            }
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
      )}
    </div>
  );
};

export default SignUpForm;
