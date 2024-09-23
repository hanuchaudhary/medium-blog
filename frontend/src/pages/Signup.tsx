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
      setError(
        "Please fill in all required fields"
      );
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
      setError("Error while Signingup : " + error);
    }
  };

  return (
    <div className="flex items-center dark:bg-neutral-900 dark:text-white bg-neutral-100 justify-center h-screen">
      {loading ? (
        <div className="flex items-center justify-center bg-transparent">
          <Spinner />
        </div>
      ) : (
        <div
          className={`relative border-dashed md:px-16 mx-8 ${
            error ? "border-red-700" : "border-green-950 dark:border-green-600"
          }  border-2 md:p-8 p-4 rounded-none font-mono`}
        >
          <div>
            <Link to={"/"} className="absolute top-4 right-4">
              <X />
            </Link>
          </div>
          <div>
            <AuthTop
              title={"Signup"}
              subTitle={"Create your account to get started."}
            />
          </div>
          {error && (
            <h1 className="dark:text-red-600 text-red-600 text-center font-semibold">{error}</h1>
          )}
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
