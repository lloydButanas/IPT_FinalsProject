import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import AddCustomerModal from "../components/AddCustomerModal";
import EditCustomerModal from "../components/EditCustomerModal";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState<any>({});
  const [reload, setReload] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items to display per page
  const navigate = useNavigate();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await Axios.get("/customers", {
          cancelToken: ourRequest.token,
        });
        setCustomers(response.data);
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
  const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = customers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      {showModal && (
        <AddCustomerModal setReload={setReload} setShowModal={setShowModal} />
      )}
      {showEditModal && (
        <EditCustomerModal
          editCustomer={editCustomer}
          setReload={setReload}
          setShowEditModal={setShowEditModal}
        />
      )}
      <div className="h-20  flex items-center justify-center bg-gradient-to-r from-violet-950 to-purple-200">
        <h1 className="text-white font-bold text-4xl  flex justify-center">CUSTOMERS MANAGEMENT</h1>
      </div>
      <div className="container mx-auto mt-6">
        <div className="text-right mb-6">
          <button
            onClick={() => navigate("/")}
            className="bg-purple-900  hover:bg-purple-200 hover:bg-violet-950 hover:text-fuchsia-400 text-white 
            hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all 
            ease-in-out font-semibold py-2 px-2 rounded hover:scale-150"
          >
            Homepage
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-900  hover:bg-purple-200 hover:bg-violet-950 hover:text-fuchsia-400 text-white 
            hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all 
            ease-in-out font-semibold py-2 px-2 rounded ml-7 hover:scale-150"
          >
            + Add
          </button>
        </div>
        <div className="flex justify-center">
          <table className="text-center h-auto w-full border border-black">
            <thead className="h-20 bg-violet-500 border border-black text-white">
              <tr>
                <th className="py-1 px-2 text-white border-double">CUSTOMER NUMBER</th>
                <th className="py-1 px-2 text-white border-double">CUSTOMER NAME</th>
                <th className="py-1 px-2 text-white border-double">CONTACT LAST NAME</th>
                <th className="py-1 px-2 text-white border-double">CONTACT FIRST NAME</th>
                <th className="py-1 px-2 text-white border-double">PHONE</th>
                <th className="py-1 px-2 text-white border-double">ADDRESS LINE 1</th>
                <th className="py-1 px-2 text-white border-double">ADDRESS LINE 2</th>
                <th className="py-1 px-2 text-white border-double">CITY</th>
                <th className="py-1 px-2 text-white border-double">STATE</th>
                <th className="py-1 px-2 text-white border-double">POSTAL CODE</th>
                <th className="py-1 px-2 text-white border-double">COUNTRY</th>
                <th className="py-1 px-2 text-white border-double">SALES REP EMPLOYEE NUMBER</th>
                <th className="py-1 px-2 text-white border-double">CREDIT LIMIT</th>
                <th className="bg-green-500 py-2 bg-violet-500 text-white px-2">ACTION</th>
              </tr>
            </thead>
            <tbody className="h-[20px] min-h-[1em] border border-spacing-1 border-black w-px self-stretch 
          bg-gradient-to-tr from-violet-950 via-violet-200 to-purple-200 ">
              {currentItems.map((customer: any) => (
                <tr key={customer.customerNumber} className="border-b border-gray-400">
                  <td className="border-double italic hover:not-italic  border border-black">{customer.customerNumber}</td>
                  <td className="border-double italic hover:not-italic  border border-black">{customer.customerName}</td>
                  <td className="border-double italic hover:not-italic  border border-black">{customer.contactLastName}</td>
                  <td className="border-double italic hover:not-italic  border border-black">{customer.contactFirstName}</td>
                  <td className="border-double italic hover:not-italic  border border-black">{customer.phone}</td>
                  <td className="border-double italic hover:not-italic  border border-black">{customer.addressLine1}</td>
                  <td className="border-double italic hover:not-italic  border border-black">{customer.addressLine2}</td>
                  <td className="border-double italic hover:not-italic  border border-black">{customer.city}</td>
                  <td className="border-double italic hover:not-italic  border border-black">{customer.state}</td>
                  <td className="border-double italic hover:not-italic  border border-black">{customer.postalCode}</td>
                  <td className="border-double italic hover:not-italic  border border-black">{customer.country}</td>
                  <td className="border-double italic hover:not-italic  border border-black">{customer.salesRepEmployeeNumber}</td>
                  <td className="border-double italic hover:not-italic  border border-black">{customer.creditLimit}</td>
                  <td className="py-2">
                    <div className="flex items-center">
                      <button
                        onClick={async () => {
                          setEditCustomer({
                            customerNumber: customer.customerNumber,
                            customerName: customer.customerName,
                            contactLastName: customer.contactLastName,
                            contactFirstName: customer.contactFirstName,
                            phone: customer.phone,
                            addressLine1: customer.addressLine1,
                            addressLine2: customer.addressLine2,
                            city: customer.city,
                            state: customer.state,
                            postalCode: customer.postalCode,
                            country: customer.country,
                            salesRepEmployeeNumber: customer.salesRepEmployeeNumber,
                            creditLimit: customer.creditLimit,
                          });
                          setShowEditModal(true);
                        }}
                        className="m-4 my-2  bg-green-950 hover:bg-green-400  duration-300 transition-all 
                        ease-in-out text-white font-bold py-2 px-4 rounded"
                      >
                        &#9998;
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            const result = confirm("Want to delete?");
                            if (result) {
                              const response = await Axios.delete(
                                `customers/${customer.customerNumber}`
                              );
                              console.log(response.data);
                              setReload((prev) => prev + 1);
                            }
                          } catch (e) {
                            console.log(e);
                          }
                        }}
                        className=" m-6 my-2 bg-rose-950 hover:bg-rose-400 duration-300 transition-all 
                        ease-in-out text-white font-bold py-2 px-4 rounded"
                      >
                        &times;
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6">
          <ul className="flex">
            {/* Generate pagination buttons */}
            {Array.from(Array(totalPages), (_, index) => index + 1).map((number) => (
              <li
                key={number}
                className={`${
                  number === currentPage ? "bg-violet-950" : "bg-purple-200"
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

export default Customer;