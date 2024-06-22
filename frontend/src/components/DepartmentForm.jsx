const DepartmentForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="sm:mx-6 p-3">
      <form onSubmit={handleSubmit} className=" space-y-3">
        <input
          type="text"
          className="py-3 px-4 border rounded-lg w-full"
          placeholder="Write Department name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex justify-between">
          <button className="bg-blue-500 m-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {buttonText}
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              className="bg-red-500 m-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DepartmentForm;
