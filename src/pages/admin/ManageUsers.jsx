import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUser } from "../../redux/slices/adminUserSlice";
import Pagination from "./../common/Pagination";
import { toast } from "react-hot-toast";
import { debounce } from "lodash";
import EditUserModal from "./EditUserModal";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { users, pagination, loading, error } = useSelector(
    (state) => state.adminUserManage
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // To manage the selected user for editing
  const [isModalOpen, setIsModalOpen] = useState(false); // To control the modal visibility
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // To control delete modal visibility
  const [userToDelete, setUserToDelete] = useState(null); // Store user id to delete

  useEffect(() => {
    dispatch(fetchAllUsers({ search: searchQuery, page: pagination.currentPage }));
  }, [dispatch, searchQuery, pagination.currentPage]);

  const handleUpdateUser = (userId) => {
    const user = users.find((user) => user._id === userId);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    setUserToDelete(userId); // Set the user ID to delete
    setIsDeleteModalOpen(true); // Open delete confirmation modal
  };

  const confirmDeleteUser = () => {
    dispatch(deleteUser(userToDelete))
      .then(() => {
        toast.success("User deleted successfully");
        setIsDeleteModalOpen(false); // Close delete modal
        setUserToDelete(null); // Reset the user to delete
      })
      .catch((err) => toast.error(err.message));
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false); // Close delete modal without action
    setUserToDelete(null); // Reset the user to delete
  };

  const handleSearch = useCallback(
    debounce((value) => setSearchQuery(value), 500),
    []
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl text-cyan-50 font-bold mb-4">Manage Users</h2>

      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="input input-bordered w-full max-w-md"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="table w-full bg-cyan-50 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4">Full Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b text-gray-700">
                <td className="py-3 px-4">{user.fullName}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`badge ${
                      user.role === "admin"
                        ? "badge-primary"
                        : "badge-secondary"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4 flex justify-center space-x-2">
                  <button
                    className="btn btn-sm btn-outline btn-info"
                    onClick={() => handleUpdateUser(user._id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-error"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={(page) => dispatch(fetchAllUsers({ searchQuery, page }))}
      />

      {/* Edit User Modal */}
      {isModalOpen && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p>Do you really want to delete this user? This action cannot be undone.</p>
            <div className="modal-action">
              <button
                className="btn btn-sm btn-error"
                onClick={confirmDeleteUser}
              >
                Yes, Delete
              </button>
              <button
                className="btn btn-sm btn-outline btn-secondary"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
