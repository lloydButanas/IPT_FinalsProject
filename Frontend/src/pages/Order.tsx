import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import AddOrderModal from "../components/AddOrderModal";
import EditOrderModal from "../components/EditOrderModal";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editOrder, setEditOrder] = useState({});
  const [reload, setReload] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const navigate = useNavigate();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchOrders = async () => {
      try {
        const response = await Axios.get("/orders", {
          cancelToken: ourRequest.token,
        });
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
    return () => {
      ourRequest.cancel();
    };
  }, [reload]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <>
      {showModal && (
        <AddOrderModal setReload={setReload} setShowModal={setShowModal} />
      )}
      {showEditModal && (
        <EditOrderModal
          editOrder={editOrder}
          setReload={setReload}
          setShowEditModal={setShowEditModal}
        />
      )}
      <div className="h-20  flex items-center justify-center bg-gradient-to-r from-violet-950 to-purple-200">
        <h1 className="text-white font-bold text-4xl">ORDERS</h1>
      </div>
      <div className="container mx-auto mt-6 mb-6">
        <div className="text-right mb-6">
          <div className="text-left mb-6">
            <button
              onClick={() => navigate("/")}
              className="bg-purple-900  hover:bg-purple-200 hover:bg-violet-950 hover:text-fuchsia-400 text-white 
               hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all 
              ease-in-out font-semibold py-2 px-2 rounded hover:scale-150"
            >
              Homepage
            </button>
            <button
              onClick={() => navigate("/orderdetails")}
              className="bg-purple-900  hover:bg-purple-200 hover:bg-violet-950 hover:text-fuchsia-400 text-white
             hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all 
              ease-in-out font-bold py-2 px-2 rounded ml-7 hover:scale-150"
            >
              Go to Order Details
            </button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-900  hover:bg-purple-200 hover:bg-violet-950 hover:text-fuchsia-400 text-white
             hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all 
            ease-in-outfont-semibold py-2 px-4 rounded hover:scale-150"
          >
            + Add
          </button>
        </div>

        <table className="text-center h-auto w-full border border-black h">
          <thead className="h-[20px] min-h-[1em] w-px self-stretch border border-black bg-violet-500 text-white">
            <tr>
              <th className="py-3 px-10">ORDER NUMBER</th>
              <th className="py-3 px-10">ORDER DATE</th>
              <th className="py-3 px-10">REQUIRED DATE</th>
              <th className="py-3 px-10">SHIPPED DATE</th>
              <th className="py-3 px-10">STATUS</th>
              <th className="py-3 px-10">COMMENTS</th>
              <th className="py-3 px-10">CUSTOMER NUMBER</th>
              <th className="py-3 px-10">ACTION</th>
            </tr>
          </thead>
          <tbody className="h-[20px] min-h-[1em] border border-spacing-1 border-black w-px self-stretch 
          bg-gradient-to-tr from-violet-950 via-violet-200 to-purple-200 ">
            {currentItems.map((order: any) => (
              <tr key={order.orderNumber}>
                <td className="py-3 px-6 border border-black">
                  {order.orderNumber}
                </td>
                <td className="py-3 px-6 border border-black">
                  {order.orderDate}
                </td>
                <td className="py-3 px-6 border border-black">
                  {order.requiredDate}
                </td>
                <td className="py-3 px-6 border border-black">
                  {order.shippedDate}
                </td>
                <td className="py-3 px-6 border border-black">
                  {order.status}
                </td>
                <td className="py-3 px-6 border border-black">
                  {order.comments}
                </td>
                <td className="py-3 px-6 border border-black">
                  {order.customerNumber}
                </td>
                <td className="border border-black">
                  <button
                    onClick={async () => {
                      setEditOrder(order);
                      setShowEditModal(true);
                    }}
                    className="mr-4 bg-green-950 hover:bg-green-400 
                    text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 
                    duration-300 transition-all ease-in-out font-bold py-2 px-4 rounded ml-7"
                  >
                    &#9998;
                  </button>
                  {/* <button
                    onClick={async () => {
                      try {
                        var result = confirm("Want to delete?");
                        if (result) {
                          const response = await Axios.delete(
                            `orders/${order.orderNumber}`
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

export default Orders;
