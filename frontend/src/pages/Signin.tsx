import { FormEvent, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import AuthBottom from "../components/AuthBottom";
import Spinner from "../components/Spinner";
import AuthTop from "../components/AuthTop";
import { Link, useNavigate } from "react-router-dom";
import { SigninType } from "@hanuchaudhary/medium-app";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Eye, EyeOff, X } from "lucide-react";
import BackgroundPanel from "../components/BackgroundPanel";

const SignInForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [signinInputs, setSigninInputs] = useState<SigninType>({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
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
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setError("Error while Login!! : " + error.response.data.error);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen relative w-full flex items-center justify-center bg-customLightOrange transition-all duration-300"
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
        <div
          className={`border-2 relative z-[99999] border-black md:p-3 p-6 rounded-lg bg-customLightOrange font-sans w-full`}
        >
          <Link
            to={"/"}
            className="absolute top-4 z-40 right-4 text-black cursor-pointer hover:opacity-70 transition-opacity"
          >
            <X size={24} />
          </Link>
          <AuthTop title={"Sign In"} />
          {error && (
            <p className="text-customPink text-center font-semibold mb-4">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="email"
              label="Email"
              type="email"
              value={signinInputs.email}
              onChange={(e) =>
                setSigninInputs({ ...signinInputs, email: e.target.value })
              }
              placeholder="kushchaudharyog@gmail.com"
            />
            <div className="h-full w-full relative">
              <Input
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={signinInputs.password}
                onChange={(e) =>
                  setSigninInputs({
                    ...signinInputs,
                    password: e.target.value,
                  })
                }
                placeholder="Kush@123"
              />
              <div className="absolute z-[99999999] top-10 right-2">
                {showPassword ? (
                  <button type="button" onClick={handleShowPassword}>
                    {<EyeOff />}
                  </button>
                ) : (
                  <button type="button" onClick={handleShowPassword}>
                    {<Eye />}
                  </button>
                )}
              </div>
            </div>
            <div className="mt-6">
              <Button text="Sign In" type="submit" />
            </div>
          </form>
          <AuthBottom
            title="Don't Have an Account? "
            to="/signup"
            label="Signup here!"
          />
        </div>
        <BackgroundPanel />
      </div>
    </div>
  );
};

export default SignInForm;
