import { useRef } from "react";
import Modal from "./modal";
import Axios from "axios";

const AddOrderdetailsModal = ({ setShowModal, setReload }: any) => {
  const orderNumberRef = useRef<any>("");
  const productCode = useRef<any>("");
  const quantityOrdered = useRef<any>("");
  const priceEach = useRef<any>("");
  const orderLineNumber = useRef<any>("");


  const submitHandler = async (e: any) => {
    e.preventDefault();
    const data = {
      orderNumber: Number(orderNumberRef.current.value),
      orderDate: productCode.current.value,
      quantityOrdered: Number(quantityOrdered.current.value),
      priceEach: priceEach.current.value,
      orderLineNumber: orderLineNumber.current.value,
    };

    const response = await Axios.post("/orderdetails/create", data);
    setReload((prev: any) => prev + 1);
    setShowModal(false);
    console.log(data);
    console.log(response.data);
  };

  return (
    <Modal
      onClick={() => setShowModal(false)}
      className="flex flex-col justify-center items-center  bg-gradient-to-r from-violet-950 to-purple-200 "
    >
      <h1 className="font-bold text-[2rem] mb-[1.5rem] text-purple-950 text-4xl">
        ADD ORDER DETAILS
      </h1> 
      <form onSubmit={submitHandler}>
        <div className="flex gap-8 items-center">
          <div>
            <div className="flex items-center gap-4">
              <div className="mb-4">
                <label
                  htmlFor="orderNumber"
                  className="font-semibold text-[1.15rem] text-white"
                >
                  Order Number
                </label>
                <input
                  ref={orderNumberRef}
                  id="orderNumber"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="productCode"
                  className="font-semibold text-[1.15rem] text-white"
                >
                  Product Code
                </label>
                <input
                  ref={productCode}
                  id="productCode"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="quantityOrdered"
                  className="font-semibold text-[1.15rem] text-white"
                >
                  Quantity Ordered
                </label>
                <input
                  ref={quantityOrdered}
                  id="quantityOrdered"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-[1rem]">
                <label
                  htmlFor="priceEach"
                  className="font-semibold text-[1.15rem] text-white"
                >
                  Price Each
                </label>
                <input
                  ref={priceEach}
                  id="priceEach"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="mb-[1rem]">
                  <label
                    htmlFor="orderLineNumber"
                    className="font-semibold text-[1.15rem] text-white "
                  >
                    Order Line Number
                  </label>
                  <input
                    ref={orderLineNumber}
                    id="orderLineNumber"
                    type="text"
                    className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-purple-950 hover:bg-violet-600 hover:text-slate-200 hover:scale-150
                 mt-[1.5rem] text-white h-[2.8rem] rounded w-[20rem] font-semibold transition-all 
                 duration-[0.3s] ease-in-out "
              >
                ADD ORDER DETAILS
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddOrderdetailsModal;