import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import TextField from "../../components/sharedComponents/TextField";
import { registerUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated} = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        contactNumber: data.contactNumber,
      address: {
        country: data.country,
        city: data.city,
        state: data.state,
        street: data.street,
        zip: data.zip,
      },
    };
  
    console.log("Formatted Form Data:", formData);
    
    dispatch(registerUser(formData))
    .then((res) => {
        if (res.meta.requestStatus === "fulfilled" && res.payload) {
            // dispatch(checkAuthStatus()); // Ensure authentication is valid
            navigate("/home");
        }
    })
    .catch((err) => console.error("Registration failed:", err));

  };
  

  useEffect(() => {
    if (isAuthenticated) {
        navigate("/home");
    }
}, [isAuthenticated, navigate]);

  return (
    <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-black/30 backdrop-blur-md">
      <h1 className="text-4xl font-bold text-center text-white mb-6">User Signup</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <TextField
        className="w-full p-3 rounded-lg bg-gray-400"
          label="Full Name"
          type="text"
          placeholder="Enter full name"
          {...register("fullName", { required: "Full Name is required" })}
        />
        {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}

        <TextField
        className="w-full p-3 rounded-lg bg-gray-400"
          label="Email"
          type="email"
          placeholder="Enter email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <TextField
        className="w-full p-3 rounded-lg bg-gray-400"
          label="Password"
          type="password"
          placeholder="Enter password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <TextField
        className="w-full p-3 rounded-lg bg-gray-400"
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) => value === watch("password") || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

        <TextField
        className="w-full p-3 rounded-lg bg-gray-400"
          label="Contact Number"
          type="text"
          placeholder="Enter contact number"
          {...register("contactNumber", {
            required: "Contact number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Invalid contact number",
            },
          })}
        />
        {errors.contactNumber && <p className="text-red-500">{errors.contactNumber.message}</p>}

        <div>
          <label className="block text-white text-sm font-medium">Country</label>
          <select {...register("country")} className="w-full p-3 rounded-lg bg-white/70" defaultValue="India"
    disabled>
            <option value="India">India</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
          </select>
        </div>

        <TextField className="w-full p-3 rounded-lg bg-gray-400" label="City" type="text" placeholder="Enter city" {...register("city", { required: "City is required" })} />
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}

        <TextField className="w-full p-3 rounded-lg bg-gray-400" label="State" type="text" placeholder="Enter state" {...register("state", { required: "State is required" })} />
        {errors.state && <p className="text-red-500">{errors.state.message}</p>}

        <TextField className="w-full p-3 rounded-lg bg-gray-400" label="Street" type="text" placeholder="Enter street" {...register("street", { required: "Street is required" })} />
        {errors.street && <p className="text-red-500">{errors.street.message}</p>}

        <TextField className="w-full p-3 rounded-lg bg-gray-400" label="ZIP Code" type="text" placeholder="Enter ZIP code" {...register("zip", { required: "ZIP code is required" })} />
        {errors.zip && <p className="text-red-500">{errors.zip.message}</p>}

        <button type="submit" className="w-full p-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
