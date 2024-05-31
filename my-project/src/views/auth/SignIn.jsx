import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import axios from "api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SignIn() {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

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
        const token = response?.data?.token;
        localStorage.setItem("token", token); 
     
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
        <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
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
          <div className="mb-4 flex items-center justify-between px-2">
            {/* <div className="flex items-center">
            <Checkbox />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Keep me logged In
            </p>
          </div> */}
            <a
              className="mt-3 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              href=" "
            >
              Forgot Password?
            </a>
          </div>
          <button className="linear mt-1 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Sign In
          </button>
        </form>
        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <a
            href=" "
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}
