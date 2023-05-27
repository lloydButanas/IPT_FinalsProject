import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import AddOfficeModal from "../components/AddOfficeModal";
import EditOfficeModal from "../components/EditOfficeModal";

const office = () => {
  const [office, setOffices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editOffice, setEditOffice] = useState<any>({});
  const [reload, setReload] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await Axios.get("/offices", {
          cancelToken: ourRequest.token,
        });
        setOffices(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, [reload]);

  return (
    <>
      {showModal && (
        <AddOfficeModal setReload={setReload} setShowModal={setShowModal} />
      )}
      {showEditModal && (
        <EditOfficeModal
          editOffice={editOffice}
          setReload={setReload}
          setShowEditModal={setShowEditModal}
        />
      )}
      <div className="h-20 flex items-center justify-center bg-gradient-to-r from-violet-950 to-purple-200">
        <h1 className="text-white font-bold text-4xl">OFFICE MANAGEMENT</h1>
      </div>
      <div className="container mx-auto mt-6 mb-6 ">
        <div className=" text-right mb-6">
          <div className=" text-left mb-6">
            <button
              onClick={() => navigate("/")}
              className="bg-purple-900  hover:bg-purple-200 hover:bg-violet-950 hover:text-fuchsia-400 text-white 
              hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all ease-in-out font-semibold 
              py-2 px-2 rounded hover:scale-150 "
            >
              Homepage
            </button>

            <button
              onClick={() => navigate("/employee")}
              className="bg-purple-900  hover:bg-purple-200 hover:bg-violet-950 hover:text-fuchsia-400 
              text-white  duration-300 transition-all ease-in-out text-white font-semibold py-2 px-2 
              rounded ml-7 hover:scale-150 "
            >
              Go to Employee
            </button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-900  hover:bg-purple-200 hover:bg-violet-950 hover:text-fuchsia-400 
            transition-all ease-in-out text-white font-semibold py-2 px-2 rounded hover:scale-150"
          >
            + Add
          </button>
        </div>

        <table
          cellPadding={10}
          className=" text-center h-auto w-full border  border-black"
        >
          <thead className="h-20 text-white bg-violet-500 border border-black">
            <tr>
              <th>Office Code</th>
              <th>City</th>
              <th>Phone</th>
              <th>Address Line 1</th>
              <th>Address Line 2</th>
              <th>State</th>
              <th>Country</th>
              <th>Postal Code</th>
              <th>Territory</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="h-[20px] min-h-[1em] border border-spacing-1 border-black w-px self-stretch 
          bg-gradient-to-tr from-violet-950 via-violet-200 to-purple-200 ">
            {office.map((office: any) => (
              <tr key={office.officeCode}>
                <td>{office.officeCode}</td>
                <td>{office.city}</td>
                <td>{office.phone}</td>
                <td>{office.addressLine1}</td>
                <td>{office.addressLine2}</td>
                <td>{office.state}</td>
                <td>{office.country}</td>
                <td>{office.postalCode}</td>
                <td>{office.territory}</td>
                <td>
                  <button
                    onClick={async () => {
                      setEditOffice({
                        officeCode: office.officeCode,
                        phone: office.phone,
                        city: office.city,
                        addressLine1: office.addressLine1,
                        addressLine2: office.addressLine2,
                        state: office.state,
                        country: office.country,
                        postalCode: office.postalCode,
                        territory: office.territory,
                      });
                      setShowEditModal(true);
                    }}
                    className="mr-4 bg-green-950 hover:bg-green-400 duration-300 transition-all 
                    ease-in-out text-white font-bold py-2 px-4 rounded"
                  >
                    &#9998;
                  </button>
                  {/* <button
                    onClick={async () => {
                      try {
                        var result = confirm("Want to delete?");
                        if (result) {
                          const response = await Axios.delete(
                            `offices/${office.officeCode}`
                          );
                          console.log(response.data);
                          setReload((prev) => prev + 1);
                        }
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                    className="bg-red-400 hover:bg-red-600 duration-300 transition-all ease-in-out text-white font-bold py-2 px-4 rounded"
                  >
                    &times;
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default office;