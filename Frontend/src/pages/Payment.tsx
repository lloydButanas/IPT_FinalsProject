import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import AddPaymentModal from "../components/AddPaymentModal";
import EditPaymentModal from "../components/EditPaymentModal";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIventory, setEditPayment] = useState<any>({});
  const [reload, setReload] = useState(0);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Number of items to display per page

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await Axios.get("/payments", {
          cancelToken: ourRequest.token,
        });
        setPayments(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, [reload]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the index range of the currently displayed items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = payments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <>
      {showModal && (
        <AddPaymentModal setReload={setReload} setShowModal={setShowModal} />
      )}
      {showEditModal && (
        <EditPaymentModal
          editUser={editIventory}
          setReload={setReload}
          setShowEditModal={setShowEditModal}
        />
      )}
      <div className="h-20  flex items-center justify-center bg-gradient-to-r from-violet-950 to-purple-200">
      <h1 className="text-white font-bold text-4xl">PAYMENT</h1>
      </div>
      <div className="container md:mx-auto mt-8 mb-6">
        <div className=" text-right mb-8">
        <div className=" text-left mb-6">
            <button
              onClick={() => navigate("/")}
              className="bg-purple-900  hover:bg-purple-200 hover:bg-violet-950 hover:text-fuchsia-400 text-white
              hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all 
              ease-in-out font-semibold py-2 px-4 rounded hover:scale-150"
            >
              Homepage
            </button>
            <button
              onClick={() => navigate("/customer")}
              className="bg-purple-900  hover:bg-purple-200 hover:bg-violet-950 hover:text-fuchsia-400 text-white 
                hover:shadow-lg hover:drop-shadow-2x2 duration-300 
              transition-all ease-in-out font-bold py-2 px-4 ml-7 rounded hover:scale-150"
            >
              Go to Customer
            </button>
          </div> 
          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-900  hover:bg-purple-200 hover:bg-violet-950 hover:text-fuchsia-400 duration-300 transition-all ease-in-out text-white 
            font-semibold py-2 px-4 rounded hover:scale-150"
          >
            + Add
          </button>
        </div>
        <table
          cellPadding={10}
          className=" text-center h-auto w-full border  border-black"
        >
          <thead className="h-20 bg-violet-500 text-white">
            <tr>
              <th className="py-2 px-4">CUSTOMER NUMBER</th>
              <th className="py-2 px-4">CHECK NUMBER</th>
              <th className="py-2 px-4">PAYMENT DATE</th>
              <th className="py-2 px-4">AMOUNT</th>
              <th className="py-2 px-4">ACTION</th>
            </tr>
          </thead>
          <tbody className="h-[20px] min-h-[1em] border border-spacing-1 border-black w-px self-stretch 
          bg-gradient-to-tr from-violet-950 via-violet-200 to-purple-200 ">
            {currentItems.map((payments: any) => (
              <>
                <tr key={payments.customerNumber}>
                  <td>{payments.customerNumber}</td>
                  <td>{payments.checkNumber}</td>
                  <td>{payments.paymentDate}</td>
                  <td>{payments.amount}</td>
                  <td>
                    <button
                      onClick={async () => {
                        setEditPayment({
                          customerNumber: payments.customerNumber,
                          checkNumber: payments.checkNumber,
                          paymentDate: payments.paymentDate,
                          amount: payments.amount,

                        });
                        setShowEditModal(true);
                      }} 
                      className="m-6 bg-green-950 hover:bg-green-400 duration-300 transition-all 
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
                              `invetories/${inventory.productCode}`
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
              </>
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
    </>
  );
};
export default Payment;