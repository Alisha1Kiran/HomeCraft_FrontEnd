import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Trash2, Pencil } from "lucide-react";
import { updateUserData, deleteUserAccount } from "../../redux/slices/userSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for modal
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setValue("fullName", user.fullName);
      setValue("email", user.email);
      setValue("contactNumber", user.contactNumber);
      setValue("addressStreet", user.address?.street);
      setValue("addressCity", user.address?.city);
      setValue("addressState", user.address?.state);
      setValue("addressCountry", user.address?.country);
    }
    setLoading(false);
  }, [user, setValue]);

  const handleUpdateProfile = async (data) => {
    const formattedData = {
      fullName: data.fullName,
      email: data.email,
      contactNumber: data.contactNumber,
      address: {
        street: data.addressStreet,
        city: data.addressCity,
        state: data.addressState,
        country: data.addressCountry,
      },
    };
    try {
      await dispatch(updateUserData({ id: user.id, userData: formattedData }));
      toast.success("Profile updated successfully!");
      setIsEditMode(false);
    } catch (error) {
      toast.error("Failed to update profile!");
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await dispatch(deleteUserAccount(user.id)).unwrap();
      toast.success("Profile deleted successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to delete profile!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">Loading...</div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 glass rounded-lg shadow-2xl flex flex-col lg:flex-row lg:items-start lg:space-x-12">
      {/* Profile Details - Left Side */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-6">Your Profile</h2>
        <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-4">
          <div>
            <label className="block font-medium">Name:</label>
            <input
              type="text"
              {...register("fullName", { required: "Name is required" })}
              className="input input-bordered w-full"
              disabled={!isEditMode}
            />
            {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
          </div>
          <div>
            <label className="block font-medium">Email:</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full"
              disabled={!isEditMode}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block font-medium">Contact Number:</label>
            <input
              type="text"
              {...register("contactNumber", { required: "Contact number is required" })}
              className="input input-bordered w-full"
              disabled={!isEditMode}
            />
            {errors.contactNumber && <p className="text-red-500">{errors.contactNumber.message}</p>}
          </div>
          <div>
            <label className="block font-medium">Street:</label>
            <input
              type="text"
              {...register("addressStreet", { required: "Street is required" })}
              className="input input-bordered w-full"
              disabled={!isEditMode}
            />
            {errors.addressStreet && <p className="text-red-500">{errors.addressStreet.message}</p>}
          </div>
          <div>
            <label className="block font-medium">City:</label>
            <input
              type="text"
              {...register("addressCity", { required: "City is required" })}
              className="input input-bordered w-full"
              disabled={!isEditMode}
            />
            {errors.addressCity && <p className="text-red-500">{errors.addressCity.message}</p>}
          </div>
          <div>
            <label className="block font-medium">State:</label>
            <input
              type="text"
              {...register("addressState", { required: "State is required" })}
              className="input input-bordered w-full"
              disabled={!isEditMode}
            />
            {errors.addressState && <p className="text-red-500">{errors.addressState.message}</p>}
          </div>
          <div>
            <label className="block font-medium">Country:</label>
            <input
              type="text"
              {...register("addressCountry", { required: "Country is required" })}
              className="input input-bordered w-full"
              disabled={!isEditMode}
            />
            {errors.addressCountry && <p className="text-red-500">{errors.addressCountry.message}</p>}
          </div>

          {isEditMode && (
            <div className="flex space-x-4 mt-6">
              <button type="submit" className="btn btn-primary">Save Changes</button>
              <button type="button" onClick={() => setIsEditMode(false)} className="btn btn-secondary">Cancel</button>
            </div>
          )}
        </form>
      </div>

      {/* Buttons - Right Side */}
      {!isEditMode && (
        <div className="lg:w-48 flex flex-col space-y-4 lg:items-start mt-6 lg:mt-0">
          <button type="button" onClick={() => setIsEditMode(true)} className="btn btn-warning">
            <Pencil className="inline-block mr-2" /> Edit Profile
          </button>
          <button type="button" onClick={() => setShowDeleteModal(true)} className="btn btn-danger">
            <Trash2 className="inline-block mr-2" /> Delete Profile
          </button>
        </div>
      )}

      {/* DaisyUI Modal for Delete Confirmation */}
      {showDeleteModal && (
        <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="text-lg font-semibold">Confirm Deletion</h3>
          <p>Are you sure you want to delete your profile? This action cannot be undone.</p>
          <div className="modal-action">
            <button onClick={handleDeleteProfile} className="btn btn-error">Yes, Delete</button>
            <button onClick={() => setShowDeleteModal(false)} className="btn">Cancel</button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Profile;
