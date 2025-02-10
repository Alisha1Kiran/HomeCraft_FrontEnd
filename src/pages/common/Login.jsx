import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import TextField from "../../components/sharedComponents/TextField";
import SignUp from "./SignUp";
import toast from "react-hot-toast"; // Import react-hot-toast

const Login = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const [showLogin, setShowLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // This function now directly handles the form submission
  const onSubmit = (data) => {
    setIsSubmitting(true); // Set to true when submitting
    try {
     dispatch(loginUser(data));
      toast.success("Login successful!");
      navigate('/home');
    } catch (err) {
      toast.error("Login failed! Please try again.");
    } finally {
      setIsSubmitting(false); // Reset after the operation is complete
    }
  };

  // Debug: Log to check if form submission is being triggered properly
  const handleFormSubmit = (data) => {
    console.log("Form Submitted", data); // This should print in the console if form submission is working
    onSubmit(data);
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center bg-cover bg-center ${
        theme === "dark"
          ? "bg-[url('https://as2.ftcdn.net/jpg/05/84/04/65/1000_F_584046587_sX9zY6b5SyYQP7b2MTcxhJf4E3yfvDSW.jpg')]"
          : "bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20230614/pngtree-traditional-outdoor-patio-furniture-set-image_2972138.jpg')]"
      }`}
    >
      {showLogin ? (
        <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-black/30 backdrop-blur-md">
          <h1 className="text-4xl font-bold text-center text-white mb-6">User Login</h1>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          <form
            onSubmit={handleSubmit(handleFormSubmit)} // Using handleFormSubmit to debug
            className="space-y-4"
          >
            <TextField
              label="email"
              type="email"
              placeholder="Enter email"
              className="w-full p-3 rounded-lg bg-gray-400"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <TextField
              label="password"
              type="password"
              placeholder="Enter password"
              className="w-full p-3 rounded-lg bg-gray-400"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            <button
              type="submit"
              className="w-full p-3 bg-sky-700 text-white font-semibold rounded-lg"
              disabled={isSubmitting || status === "loading"} // Disable button during submission or loading
            >
              {isSubmitting || status === "loading" ? "Logging in..." : "Login"}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-200">
                Not having an account?{" "}
                <a
                  href="#"
                  className="text-sky-400 hover:underline"
                  onClick={() => setShowLogin(false)}
                >
                  SignUp here
                </a>
              </p>
            </div>
          </form>
        </div>
      ) : (
        <SignUp />
      )}
    </div>
  );
};

export default Login;
