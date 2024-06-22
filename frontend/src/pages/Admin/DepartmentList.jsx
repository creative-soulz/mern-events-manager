import { useState } from "react";
import { Typography } from "@material-tailwind/react";
import {
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useFetchDepartmentsQuery,
} from "../../redux/api/departmentApiSlice";

import { toast } from "react-toastify";
import DepartmentForm from "../../components/DepartmentForm";
import Modal from "../../components/Modal";

const DepartmentList = () => {
  const { data: departments } = useFetchDepartmentsQuery();
  const [name, setName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createDepartment] = useCreateDepartmentMutation();
  const [updateDepartment] = useUpdateDepartmentMutation();
  const [deleteDepartment] = useDeleteDepartmentMutation();

  const handleCreateDepartment = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Department name is required");
      return;
    }

    try {
      const result = await createDepartment({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating department failed, try again.");
    }
  };

  const handleUpdateDepartment = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Department name is required");
      return;
    }

    try {
      const result = await updateDepartment({
        departmentId: selectedDepartment._id,
        updatedDepartment: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedDepartment(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteDepartment = async () => {
    try {
      const result = await deleteDepartment(selectedDepartment._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedDepartment(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Department deletion failed. Try again.");
    }
  };

  return (
    <div className="mx-5 flex flex-col md:flex-row">
     
      <div className="md:w-3/4 p-3">
      <Typography variant="h4"  className="m-4" color="white">
           MANAGE DEPARTMENT
          </Typography>
        <DepartmentForm className=""
          value={name}
          setValue={setName}
          handleSubmit={handleCreateDepartment}
        />
        <br />
        <hr />

        <div className="flex flex-wrap">
          {departments?.map((department) => (
            <div key={department._id}>
              <button
                className="bg-blue-500 m-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedDepartment(department);
                    setUpdatingName(department.name);
                  }
                }}
              >
                {department.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <DepartmentForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateDepartment}
           
            handleDelete={handleDeleteDepartment}
          />
        </Modal>
      </div>
    </div>
  );
};

export default DepartmentList;
