import React, { useState, useEffect, useContext } from "react";
import axios from "api/axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "context/LoginProvider";
import InputField from "components/fields/InputField";
import Navbar from "components/navbar/Navbar";
import Card from "components/card";
import avatar from "assets/img/avatars/avatar11.png";
import banner from "assets/img/profile/banner.png";
import Footer from "components/footer/FooterHomePage";

const Profile = () => {
  const { id, username } = useContext(LoginContext);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    name: "",
    age: "",
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/staffsRouter/getUserById/${id}`);
        setUserData(response.data);
        setFormValues({
          username: response.data.username,
          password: "",
          name: response.data.name,
          age: response.data.age,
        });
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchData();
  }, [id]);

  const validateField = (id, value) => {
    let error = "";
    if (id === "username" && !value) {
      error = "Username is required";
    } else if (id === "password" && !value && editMode) {
      error = "Password is required";
    } else if (id === "name" && !value) {
      error = "Name is required";
    } else if (id === "age" && !value) {
      error = "Age is required";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: error,
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
    validateField(id, value);
  };

  const handleEdit = () => {
    setEditMode(true);
    // Set initial username value from context
    setFormValues((prevValues) => ({
      ...prevValues,
      username: username,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    Object.keys(formValues).forEach((field) => {
      if (!formValues[field] && (editMode || field !== "password")) {
        validateField(field, formValues[field]);
        hasError = true;
      }
    });

    if (hasError) return;

    // Check if new password is different from current password
    if (formValues.password === formValues.currentPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "New password must be different from current password",
      }));
      return;
    }

    try {
      const response = await axios.put(`/staffsRouter/updateUser/${id}`, {
        username: formValues.username,
        password: formValues.password,
        name: formValues.name,
        age: formValues.age,
        role: "staff",
      });
      console.log(response.data);
      setUserData((prevData) => ({
        ...prevData,
        user: {
          ...prevData.user,
          name: formValues.name,
          age: formValues.age,
        },
      }));
      setEditMode(false);
      navigate("/home");
    } catch (error) {
      console.error("Error updating user data", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center p-2">
        <Card extra="items-center w-full h-full p-[16px] bg-cover">
          <div
            className="relative flex justify-center w-full h-32 mt-1 bg-cover rounded-xl"
            style={{ backgroundImage: `url(${banner})` }}
          >
            <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
              <img className="w-full h-full rounded-full" src={avatar} alt="" />
            </div>
          </div>

          {/* Name and position */}
          <div className="flex flex-col items-center mt-16">
            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
              {username?.toUpperCase()}
            </h4>
            <p className="text-base font-normal text-gray-600">Staff</p>
          </div>
        </Card>
        
        {/* Profile display or edit form */}
        <Card className="w-full max-w-xl p-8 mt-3 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-center">Profile</h2>
          {!editMode ? (
            // Display mode
            <div className="flex flex-col items-center">
              <p className="mb-3"><strong>Username:</strong> {username}</p>
              <p className="mb-3"><strong>Name:</strong> {userData?.user?.name}</p>
              <p className="mb-3"><strong>Age:</strong> {userData?.user?.age}</p>
              <button
                onClick={handleEdit}
                className="px-4 py-2 mt-3 text-white rounded-lg bg-bloom"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            // Edit mode
            <form onSubmit={handleSubmit}>
              <InputField
                variant="auth"
                extra="mb-5"
                label="Username*"
                placeholder="Username"
                id="username"
                type="text"
                error={errors.username}
                value={formValues.username}
                onChange={handleChange}
                readOnly={true}
              />
              <InputField
                variant="auth"
                extra="mb-5"
                label="Password*"
                placeholder="Password"
                id="password"
                type="password"
                error={errors.password}
                value={formValues.password}
                onChange={handleChange}
              />
              <InputField
                variant="auth"
                extra="mb-5"
                label="Name*"
                placeholder="Name"
                id="name"
                type="text"
                error={errors.name}
                value={formValues.name}
                onChange={handleChange}
              />
              <InputField
                variant="auth"
                extra="mb-5"
                label="Age*"
                placeholder="Age"
                id="age"
                type="number"
                error={errors.age}
                value={formValues.age}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="w-full py-3 text-white transition duration-200 rounded-lg bg-bloom"
              >
                Update Profile
              </button>
            </form>
          )}
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
