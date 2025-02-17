import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserDetails } from '../../redux/slices/adminUserSlice'; // Import the action
import { toast } from 'react-hot-toast';

const EditUserModal = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  useEffect(() => {
    setFullName(user.fullName);
    setEmail(user.email);
    setRole(user.role);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { fullName, email, role };

    try {
      const result = await dispatch(updateUserDetails({ id: user.id, userData }));
      if (updateUserDetails.fulfilled.match(result)) {
        toast.success('User details updated successfully');
        onClose(); // Close the modal
      } else {
        toast.error('Failed to update user details');
      }
    } catch (error) {
      toast.error('An error occurred while updating user details');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-cyan-500 p-6 rounded-lg w-96">
        <h3 className="text-2xl font-semibold mb-4">Edit User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="btn btn-outline btn-danger">Cancel</button>
            <button type="submit" className="btn btn-outline btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
