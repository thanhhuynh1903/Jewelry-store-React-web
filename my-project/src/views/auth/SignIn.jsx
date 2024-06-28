import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import axios from "api/axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "context/LoginProvider";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SignIn() {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const { setUsername } = useContext(LoginContext); // Get setUsername from context

  const validateField = (id, value) => {
    let error = "";
    if (id === "username" && !value) {
      error = "Username is required";
    } else if (id === "password" && !value) {
      error = "Password is required";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: error,
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id && value !== undefined) {
      setFormValues((prevValues) => ({
        ...prevValues,
        [id]: value?.trim(), // Trim the value
      }));
      validateField(id, value?.trim()); // Validate trimmed value
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      username: "",
      password: "",
    });

    try {
      const response = await axios.post("staffsRouter/loginWithJWT", {
        username: formValues.username,
        password: formValues.password,
      });

      if (response.data.success) {
        // Handle successful login
        const accessToken = response?.data?.accessToken;
        const refreshToken = response?.data?.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setUsername(formValues.username);

        if (response.data.success && response?.data?.role === "Admin") {
          navigate("/admin/");
        }
      } else {
        // Handle login failure
        if (response?.data?.message === "Username không tồn tại") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            username: response?.data?.message || "Unknown error",
          }));
        }

        if (response?.data?.message === "Sai mật khẩu!") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: response?.data?.message || "Unknown error",
          }));
        }

        if (formValues.username === null || formValues.username === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            username: "Username is required",
          }));
        }
        if (formValues.password === null || formValues.password === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: "Password is required",
          }));
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({
        username: error.response?.data?.message || "Unknown error",
        password: error.response?.data?.message || "Unknown error",
      });
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to Google OAuth URL
    window.location.href = "https://baitapdeploy-production.up.railway.app/staffsRouter/auth/google";
  };

  // Handle initial render or URL change when returning from Google OAuth
  useEffect(() => {
    const handleGoogleCallback = async () => {
      // Check if URL contains code parameter
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        try {
          // Make API call to exchange code for tokens
          const response = await axios.post("https://baitapdeploy-production.up.railway.app/staffsRouter/auth/google/callback", {
            code: code,
          });
          console.log(response?.data);
          // Handle successful Google login
          if (response?.data?.success) {
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            setUsername(response?.data?.username); // Assuming username is included in the response

            // Navigate to appropriate dashboard based on role
            if (response?.data?.role === "staff") {
              navigate("/admin");
            } else {
              navigate("/auth/"); // Replace with actual user dashboard route
            }
          } else {
            // Handle login failure
            console.error("Google login failed:", response.data.message);
          }
        } catch (error) {
          console.error("Error during Google login:", error);
        }
      }
    };

    // Call the function to handle Google callback
    handleGoogleCallback();
  }, [navigate, setUsername]);

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>

        <div
          className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800"
          onClick={handleGoogleLogin}
        >
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </h5>
        </div>
        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
        {/* Email */}
        <form onSubmit={handleSubmit}>
          <InputField
            variant="auth"
            extra="mb-5"
            label="username*"
            placeholder="username"
            id="username"
            type="text"
            error={errors.username}
            value={formValues.username}
            onChange={handleChange}
          />

          {/* Password */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            error={errors.password}
            value={formValues.password}
            onChange={handleChange}
          />

          {/* Checkbox */}
          <div className="mt-4 mb-2 flex items-center justify-between px-2 ">
            <div className="flex items-center mt-2">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white ">
                Remember password
              </p>
            </div>
            {/* <a
              className="mt-3 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              href=" "
            >
              Forgot Password?
            </a> */}
          </div>
          <button className="linear mt-1 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Sign In
          </button>
        </form>
        {/* <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <a
            href=" "
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </a>
        </div> */}
      </div>
    </div>
  );
}
