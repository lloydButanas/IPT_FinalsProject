import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import AddOrderdetailsModal from "../components/AddOrderdetailsModal";
import EditOrderdetailsModal from "../components/EditOrderdetailsModal";

const orderdetails = () => {
  const [orderdetails, setorderdetailss] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editOrderdetails, setEditOrder] = useState<any>({});
  const [reload, setReload] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await Axios.get("/orderdetails", {
          cancelToken: ourRequest.token,
        });
        setorderdetailss(response.data);
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
        <AddOrderdetailsModal setReload={setReload} setShowModal={setShowModal} />
      )}
      {showEditModal && (
        <EditOrderdetailsModal
          editOrderdetails={editOrderdetails}
          setReload={setReload}
          setShowEditModal={setShowEditModal}
        />
      )}
      <div className="h-20  flex items-center justify-center bg-gradient-to-r from-violet-950 to-purple-200">
        <h1 className="text-white font-bold text-4xl">ORDER DETAILS</h1>
      </div>
      <div className="container mx-auto mt-6 mb-6 ">
        <div className=" text-right mb-6">
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
              onClick={() => navigate("/orders")}
              className="bg-purple-900  hover:bg-purple-200 hover:bg-violet-950 hover:text-fuchsia-400 text-white 
              hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all 
              ease-in-out font-semibold py-2 px-4 rounded ml-7 hover:scale-150"
            >
              Go to Orders
            </button>
            </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-900  hover:bg-purple-200 hover:bg-violet-950 hover:text-fuchsia-400 text-white
            hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all 
            ease-in-out font-semibold py-2 px-4 rounded hover:scale-150"
          >
            + Add
          </button>
        </div>

        <table
          cellPadding={10}
          className=" text-center h-auto w-full border border-black"
        >
          <thead className="h-20  min-h-[1em] w-px self-stretch border border-black bg-violet-500 text-white">
            <tr>
              <th className="py-3 px-10">ORDER NUMBER</th>
              <th className="py-3 px-10">PRODUCT CODE</th>
              <th className="py-3 px-10">QUANTITY ORDERED</th>
              <th className="py-3 px-10">PRICE EACH</th>
              <th className="py-3 px-10">ORDER LINE NUMBER</th>
              <th className="py-3 px-10">ACTION</th>
            </tr>
          </thead>
          <tbody className="h-[20px] min-h-[1em] border border-spacing-1 border-black w-px self-stretch 
          bg-gradient-to-tr from-violet-950 via-violet-200 to-purple-200 ">
            {orderdetails.map((orderdetails: any) => (
              <tr key={orderdetails.orderNumber}>
                <td className="py-3 px-6">{orderdetails.orderNumber}</td>
                <td className="py-3 px-6">{orderdetails.productCode}</td>
                <td className="py-3 px-6">{orderdetails.quantityOrdered}</td>
                <td className="py-3 px-6">{orderdetails.priceEach}</td>
                <td className="py-3 px-6">{orderdetails.orderLineNumber}</td>
                <td>
                  <button
                    onClick={async () => {
                      setEditOrder({
                        orderNumber: orderdetails.orderNumber,
                        productCode: orderdetails.productCode,
                        quantityOrdered: orderdetails.quantityOrdered,
                        priceEach: orderdetails.priceEach,
                        orderLineNumber: orderdetails.orderLineNumber,
                      });
                      setShowEditModal(true);
                    }}
                    className="mr-6 bg-green-950 hover:bg-green-400  
                    text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 
                    duration-300 transition-all ease-in-out font-bold py-2 px-4 rounded"
                  >
                    &#9998;
                  </button>
                  {/* <button
                    onClick={async () => {
                      try {
                        var result = confirm("Want to delete?");
                        if (result) {
                          const response = await Axios.delete(
                            `orderdetails/${orderdetails.orderNumber}`
                          );
                          console.log(response.data);
                          setReload((prev) => prev + 1);
                        }
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                    className="bg-rose-950 hover:bg-rose-400 duration-300 duration-300 transition-all ease-in-out text-white 
                    font-bold py-2 px-4 rounded"
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

export default orderdetails;