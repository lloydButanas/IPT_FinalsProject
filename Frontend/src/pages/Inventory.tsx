import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import AddModal from "../components/AddInventoryModal";
import EditModal from "../components/EditInventoryModal";


const Inventory = () => {
  const [inventories, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editInventory, setEditInventory] = useState<any>({});
  const [reload, setReload] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Number of items to display per page
  const navigate = useNavigate();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await Axios.get("/inventories", {
          cancelToken: ourRequest.token,
        });
        setInventory(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, [reload]);

  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the index range of the currently displayed items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inventories.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = inventories.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      {showModal && (
        <AddModal setReload={setReload} setShowModal={setShowModal} />
      )}
      {showEditModal && (
        <EditModal
          editInventory={editInventory}
          setReload={setReload}
          setShowEditModal={setShowEditModal}
        />
      )}
      <div className="h-20  flex items-center justify-center bg-gradient-to-r from-violet-950 to-purple-200">
        <h1 className="text-white font-bold text-4xl  flex justify-center">INVENTORY AND RETURN MANAGEMENT</h1>
      </div>
      <div className="container md:mx-auto mt-8 mb-6">
        <div className=" text-right mb-6">
        <button
              onClick={() => navigate("/")}
              className="bg-purple-900  hover:bg-purple-200 hover:bg-violet-950 hover:text-fuchsia-400 text-white  
              hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all 
              ease-in-out font-semibold py-2 px-4 rounded hover:scale-150"
            >
              Homepage
            </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-900  hover:bg-purple-200 hover:bg-violet-950 hover:text-fuchsia-400  text-white 
            hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all 
            ease-in-out font-semibold py-2 px-2 rounded ml-7 hover:scale-150"
          >
            + Add
          </button>
          
        </div>
        <table
         // cellPadding={10}
         // className=" text-center h-auto w-full border  border-black"
          cellPadding={10}
          className=" text-center h-auto w-full border  border-black"
        >
          <thead className="h-20 bg-violet-500 border border-black text-white">  
            <tr>
              <th className="py-2 px-4">INVENTORY ID</th>
              <th className="py-2 px-4">COUNTRY</th>
              <th className="py-2 px-4">OFFICE ADDRESS</th>
              <th className="py-2 px-4">PRODUCT NAME</th>
              <th className="py-2 px-4">QUNATITY AVAILABLE</th>
              <th className="py-2 px-4">LAST UPDATED</th>
              <th className="py-2 px-4">ACTION</th>
            </tr>
          </thead>
          <tbody className="h-[20px] min-h-[1em] border border-spacing-1 border-black w-px self-stretch 
          bg-gradient-to-tr from-violet-950 via-violet-200 to-purple-200 ">
            {currentItems.map((inventory: any, index: number) => (
              <>
              <tr key={inventory.inventoryId}>
            
                <td className="italic hover:not-italic  py-4 p-4 border border-black">{inventory.inventoryId}</td>
                <td className="italic hover:not-italic  py-4 p-4 border border-black">{inventory.country}</td>
                <td className="italic hover:not-italic  py-4 p-4 border border-black">{inventory.officeAddress}</td>
                <td className="italic hover:not-italic  py-4 p-4 border border-black">{inventory.productName}</td>
                <td className="italic hover:not-italic  py-4 p-4 border border-black">{inventory.quantityAvailable}</td>
                <td className="italic hover:not-italic  py-4 p-4 border border-black">{inventory.lastUpdated}</td>
                <td className="italic hover:not-italic  py-8 p-6 border border-black">
                  <button
                    onClick={async () => {
                      setEditInventory({
                        inventoryId: inventory.inventoryId,
                        country: inventory.country,
                        officeAddress: inventory.officeAddress,
                        productName: inventory.productName,
                        quantityAvailable: inventory.quantityAvailable,
                      });
                      setShowEditModal(true);
                    }}
                    className="m-4 bg-green-950 hover:bg-green-400 duration-300 transition-all ease-in-out 
                    text-white font-bold py-2 px-4 rounded"
                  >
                    &#9998;
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        var result = confirm("Want to delete?");
                        if (result) {

                          const response = await Axios.delete(
                            `inventories/${inventory.inventoryId}`
                          );
                          console.log(response.data);
                          setReload((prev) => prev + 1);
                        }
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                    className="bg-red-950 hover:bg-red-400 duration-300 transition-all ease-in-out 
                    text-white font-bold py-2 px-4 rounded"
                  >
                    &times;
                  </button>
                </td>
              </tr>
              {index !== inventories.length - 1 && (
                  <tr className="spacing-row">
                    <td colSpan={7}>
                  
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-6">
          <ul className="flex">
            {/* Generate pagination buttons */}
            {Array.from(Array(totalPages), (_, index) => index + 1).map((number) => (
              <li
                key={number}
                className={`${
                  number === currentPage ? "bg-green-500" : "bg-gray-200"
                } text-white py-2 px-4 cursor-pointer transition-all duration-300`}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Inventory;