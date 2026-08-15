import { useEffect, useState } from "react";
import api from "../../api/api.js";
import Loading from "../../Components/Common/Loading.jsx";
import Alert from "../../Components/Common/Alert.jsx";
import Modal from "../../Components/Common/Modal.jsx";
import Button from "../../Components/Common/Button.jsx";
import Input from "../../Components/Common/Input.jsx";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";

const getRoleColor = (role) => {
  const r = (role || "").toLowerCase();

  if (r === "admin" || r.includes("مدیر")) return "error";

  return "primary";
};

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [editForm, setEditForm] = useState({
    username: "",
    role: "",
  });

  const [addForm, setAddForm] = useState({
    username: "",
    password: "",
    firstname: "",
    role: "user",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/users");

      const usersData = Array.isArray(res.data)
        ? res.data
        : res?.data?.users || res?.data?.data?.users || [];

      setUsers(usersData);
    } catch (err) {
      console.error("error in get users", err);
      setError("مشکلی در دریافت اطلاعات کاربران پیش آمد");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleOpenDeleteModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    const userId = selectedUser._id || selectedUser.id;

    setIsDeleting(true);

    try {
      await api.delete(`/users/${userId}`);

      setUsers((prevUsers) =>
        prevUsers.filter((u) => (u._id || u.id) !== userId),
      );

      handleCancel();
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("مشکلی در حذف کاربر پیش آمد");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);

    setEditForm({
      username: user.username || "",
      role: user.role || "user",
    });

    setIsEditModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    const userId = selectedUser?._id || selectedUser?.id;

    try {
      await api.patch(`/users/${userId}/role`, {
        role: editForm.role,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          (user._id || user.id) === userId
            ? { ...user, role: editForm.role }
            : user,
        ),
      );

      handleCancel();
    } catch (err) {
      console.error("Error edit user:", err);
      setError("مشکلی در ویرایش نقش کاربر پیش آمد");
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;

    setAddForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    try {
      const response = await api.post("/users", addForm);

      const newUser = response.data;

      setUsers((prevUsers) => [...prevUsers, newUser]);

      setIsAddModalOpen(false);

      setAddForm({
        username: "",
        password: "",
        firstname: "",
        role: "user",
      });
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  if (loading) return <Loading />;

  if (error) return <Alert type="error" message={error} />;

  return (
    <>
      {/* Add User Button */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        + Add User
      </button>

      {/* Users Table */}
      <TableContainer
        component={Paper}
        sx={{
          mt: 4,
          mx: 2,
          borderRadius: 3,
          boxShadow: 3,
          border: "1px solid #e0e0e0",
          overflow: "hidden",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: "#495057",
                }}
              >
                نام
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: "#495057",
                }}
              >
                نام کاربری
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: "#495057",
                }}
              >
                نقش (Role)
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: "#495057",
                }}
                align="center"
              >
                عملیات
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.length > 0 ? (
              users.map((user) => {
                const displayName =
                  user.firstname ||
                  user.firstName ||
                  user.username ||
                  "کاربر ناشناس";

                return (
                  <TableRow
                    key={user._id || user.id}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },

                      "&:hover": {
                        backgroundColor: "#f1f3f5",
                        transition: "background-color 0.2s ease",
                      },
                    }}
                  >
                    {/* First Name */}
                    <TableCell>
                      <Typography variant="body2" fontWeight="500">
                        {displayName}
                      </Typography>
                    </TableCell>

                    {/* Username */}
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        dir="ltr"
                        sx={{ textAlign: "right" }}
                      >
                        @{user.username}
                      </Typography>
                    </TableCell>

                    {/* Role */}
                    <TableCell>
                      <Chip
                        label={user.role === "admin" ? "ادمین" : "کاربر عادی"}
                        color={getRoleColor(user.role)}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="center">
                      <Tooltip title="ویرایش نقش">
                        <IconButton
                          size="small"
                          color="primary"
                          sx={{ mx: 0.5 }}
                          onClick={() => handleOpenEditModal(user)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="حذف">
                        <IconButton
                          size="small"
                          color="error"
                          sx={{ mx: 0.5 }}
                          onClick={() => handleOpenDeleteModal(user)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                  <PersonIcon
                    sx={{
                      fontSize: 48,
                      color: "#bdbdbd",
                      mb: 1,
                    }}
                  />

                  <Typography variant="body1" color="text.secondary">
                    هیچ کاربری یافت نشد.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Modal */}
      {isModalOpen && (
        <Modal onClose={handleCancel}>
          <h2 className="font-bold text-lg">حذف کاربر</h2>

          <p className="mt-3">آیا از حذف این حساب کاربری اطمینان دارید؟</p>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
            >
              انصراف
            </Button>

            <Button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md"
            >
              {isDeleting ? "در حال حذف..." : "حذف"}
            </Button>
          </div>
        </Modal>
      )}

      {/* Edit Role Modal */}
      {isEditModalOpen && (
        <Modal onClose={handleCancel}>
          <h3 className="font-bold text-lg mb-4">ویرایش نقش کاربر</h3>

          <Input
            name="username"
            label="نام کاربری"
            value={editForm.username}
            disabled={true}
            className="px-4 py-1 rounded-lg mb-3 w-full border cursor-not-allowed bg-gray-50"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              نقش کاربر
            </label>

            <select
              name="role"
              value={editForm.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="user">کاربر عادی (user)</option>

              <option value="admin">ادمین (admin)</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
            >
              انصراف
            </Button>

            <Button
              type="button"
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              ذخیره تغییرات
            </Button>
          </div>
        </Modal>
      )}

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="w-full max-w-md rounded-2xl p-6 dark:bg-white shadow-2xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add New User</h2>

              <p className="mt-1 text-sm text-gray-500">
                Create a new user account
              </p>
            </div>

            <div className="space-y-4 dark:text-black">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={addForm.firstname}
                onChange={handleAddChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={addForm.username}
                onChange={handleAddChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={addForm.password}
                onChange={handleAddChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <select
                name="role"
                value={addForm.role}
                onChange={handleAddChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={handleAddUser}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Users;
