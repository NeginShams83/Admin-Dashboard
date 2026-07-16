import Input from "./Input";
import Button from "./Button";

function EditForm({ onCancel, onUpdate }) {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center  mb-6">Edit Profile</h2>

      <form onSubmit={onUpdate} className="flex flex-col gap-5">
        <Input
          label="Username"
          className="w-full text-black bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />

        <Input
          label="Old Password"
          className="w-full text-black bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />

        <Input
          label="New Password"
          className="w-full text-black bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />

        <div className="flex justify-end gap-3 mt-2">
          <Button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditForm;
