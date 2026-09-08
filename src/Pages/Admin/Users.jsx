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

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
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
    <div className="space-y-6 dir-rtl text-neutral-800 dark:text-neutral-100 transition-colors duration-200">
      {/* Header & Add User Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          مدیریت کاربران
        </h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 px-4 py-2.5 text-sm font-semibold shadow-sm transition-all flex items-center gap-2"
        >
          <span>+</span> افزودن کاربر جدید
        </button>
      </div>

      {/* Users Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        className="!bg-white dark:!bg-neutral-800/80 !border !border-neutral-200 dark:!border-neutral-700/70 !rounded-2xl !shadow-sm overflow-hidden"
      >
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead className="bg-neutral-50 dark:bg-neutral-900/60">
            <TableRow>
              <TableCell
                align="right"
                className="!font-bold !text-neutral-700 dark:!text-neutral-300 !border-b !border-neutral-200 dark:!border-neutral-700/70"
              >
                نام
              </TableCell>

              <TableCell
                align="right"
                className="!font-bold !text-neutral-700 dark:!text-neutral-300 !border-b !border-neutral-200 dark:!border-neutral-700/70"
              >
                نام کاربری
              </TableCell>

              <TableCell
                align="right"
                className="!font-bold !text-neutral-700 dark:!text-neutral-300 !border-b !border-neutral-200 dark:!border-neutral-700/70"
              >
                نقش (Role)
              </TableCell>

              <TableCell
                align="center"
                className="!font-bold !text-neutral-700 dark:!text-neutral-300 !border-b !border-neutral-200 dark:!border-neutral-700/70"
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

                const isAdmin = user.role === "admin";

                return (
                  <TableRow
                    key={user._id || user.id}
                    className="hover:bg-neutral-50/80 dark:hover:bg-neutral-700/30 transition-colors"
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    {/* First Name */}
                    <TableCell
                      align="right"
                      className="!border-b !border-neutral-100 dark:!border-neutral-700/50"
                    >
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-sm">
                        {displayName}
                      </span>
                    </TableCell>

                    {/* Username */}
                    <TableCell
                      align="right"
                      className="!border-b !border-neutral-100 dark:!border-neutral-700/50"
                    >
                      <span className="text-neutral-500 dark:text-neutral-400 text-sm font-mono dir-ltr inline-block">
                        @{user.username}
                      </span>
                    </TableCell>

                    {/* Role Tag */}
                    <TableCell
                      align="right"
                      className="!border-b !border-neutral-100 dark:!border-neutral-700/50"
                    >
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold border ${
                          isAdmin
                            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                            : "bg-neutral-100 dark:bg-neutral-700/50 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-600/50"
                        }`}
                      >
                        {isAdmin ? "ادمین" : "کاربر عادی"}
                      </span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell
                      align="center"
                      className="!border-b !border-neutral-100 dark:!border-neutral-700/50"
                    >
                      <div className="flex items-center justify-center gap-1">
                        <Tooltip title="ویرایش نقش">
                          <IconButton
                            size="small"
                            className="!text-neutral-500 hover:!text-neutral-900 dark:!text-neutral-400 dark:hover:!text-neutral-100 hover:!bg-neutral-100 dark:hover:!bg-neutral-700/60"
                            onClick={() => handleOpenEditModal(user)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="حذف">
                          <IconButton
                            size="small"
                            className="!text-rose-500 hover:!text-rose-700 dark:!text-rose-400 dark:hover:!text-rose-300 hover:!bg-rose-500/10"
                            onClick={() => handleOpenDeleteModal(user)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  className="!py-12 !border-0 text-center"
                >
                  <PersonIcon className="!text-5xl !text-neutral-300 dark:!text-neutral-600 !mb-2" />
                  <p className="text-neutral-400 dark:text-neutral-500 text-sm">
                    هیچ کاربری یافت نشد.
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Modal */}
      {isModalOpen && (
        <Modal onClose={handleCancel}>
          <h2 className="font-bold text-lg text-neutral-900 dark:text-neutral-100">
            حذف کاربر
          </h2>

          <p className="mt-3 text-neutral-600 dark:text-neutral-300 text-sm">
            آیا از حذف این حساب کاربری اطمینان دارید؟
          </p>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 font-semibold bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200 rounded-xl transition text-sm"
            >
              انصراف
            </Button>

            <Button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition text-sm font-semibold"
            >
              {isDeleting ? "در حال حذف..." : "حذف"}
            </Button>
          </div>
        </Modal>
      )}

      {/* Edit Role Modal */}
      {isEditModalOpen && (
        <Modal onClose={handleCancel}>
          <h3 className="font-bold text-lg mb-4 text-neutral-900 dark:text-neutral-100">
            ویرایش نقش کاربر
          </h3>

          <Input
            name="username"
            label="نام کاربری"
            value={editForm.username}
            disabled={true}
            className="px-4 py-2 rounded-xl mb-4 w-full border border-neutral-200 dark:border-neutral-700 cursor-not-allowed bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              نقش کاربر
            </label>

            <select
              name="role"
              value={editForm.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition text-sm"
            >
              <option value="user">کاربر عادی (user)</option>
              <option value="admin">ادمین (admin)</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 font-semibold bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200 rounded-xl transition text-sm"
            >
              انصراف
            </Button>

            <Button
              type="button"
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 rounded-xl transition font-semibold text-sm"
            >
              ذخیره تغییرات
            </Button>
          </div>
        </Modal>
      )}

      {/* Add User Modal */}
      {isAddModalOpen && (
        <Modal onClose={() => setIsAddModalOpen(false)}>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
              افزودن کاربر جدید
            </h2>

            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              ساخت یک حساب کاربری جدید در سیستم
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              name="firstname"
              placeholder="نام"
              value={addForm.firstname}
              onChange={handleAddChange}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3.5 py-2.5 text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 outline-none transition focus:border-neutral-400 dark:focus:border-neutral-500"
            />

            <input
              type="text"
              name="username"
              placeholder="نام کاربری (Username)"
              value={addForm.username}
              onChange={handleAddChange}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3.5 py-2.5 text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 outline-none transition focus:border-neutral-400 dark:focus:border-neutral-500"
            />

            <input
              type="password"
              name="password"
              placeholder="رمز عبور"
              value={addForm.password}
              onChange={handleAddChange}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3.5 py-2.5 text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 outline-none transition focus:border-neutral-400 dark:focus:border-neutral-500"
            />

            <select
              name="role"
              value={addForm.role}
              onChange={handleAddChange}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3.5 py-2.5 text-sm text-neutral-800 dark:text-neutral-100 outline-none transition focus:border-neutral-400 dark:focus:border-neutral-500"
            >
              <option value="user">کاربر عادی (User)</option>
              <option value="admin">مدیر (Admin)</option>
            </select>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="rounded-xl bg-neutral-100 dark:bg-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-700 dark:text-neutral-200 transition hover:bg-neutral-200 dark:hover:bg-neutral-600"
            >
              انصراف
            </button>

            <button
              onClick={handleAddUser}
              className="rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 px-4 py-2 text-sm font-semibold transition shadow-sm"
            >
              افزودن کاربر
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Users;
