import { useRef } from "react";
import Modal from "./modal";
import Axios from "axios";

const EditPaymentModal = ({
  setShowEditModal,
  setReload,
  editPayment,
}: any) => {
  const customerNumber = useRef<any>("");
  const checkNumber = useRef<any>("");
  const paymentDate = useRef<any>("");
  const amount = useRef<any>("");


  const submitHandler = async (e: any) => {
    e.preventDefault();
    const data = {
        customerNumber: customerNumber.current.value,
        checkNumber: checkNumber.current.value,
        paymentDate: paymentDate.current.value,
        amount: amount.current.value,
    };

    const response = await Axios.put(
      `/payments/${editPayment.customerNumber}`,
      data
    );
    setReload((prev: any) => prev + 1);
    setShowEditModal(false);
    console.log(data);
    console.log(response.data);
  };

  return (
    <Modal
      onClick={() => setShowEditModal(false)}
      className="flex flex-col justify-center items-center bg-gradient-to-r from-violet-950 to-purple-200 antialiased leading-relaxed"
    >
      <h1 className="font-bold mb-6 text-white text-purple-950 text-4xl">
        EDIT PAYMENT
      </h1>
      <form onSubmit={submitHandler}>
        <div className="flex gap-8 items-center">
          <div>
            <div className="flex items-center gap-4">
              <div className="mb-4">
                <label
                  htmlFor="customerNumber"
                  className="font-semibold text-[1.15rem]  text-white"
                >
                  Customer Number
                </label>
                <input
                  ref={customerNumber}
                  id="customerNumber"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="checkNumber"
                  className="font-semibold text-[1.15rem]  text-white"
                >
                Check Number
                </label>
                <input
                  ref={checkNumber}
                  id="checkNumber"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="paymentDate"
                  className="font-semibold text-[1.15rem]  text-white"
                >
                Payment Date
                </label>
                <input
                  ref={paymentDate}
                  id="requiredDate"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="amount"
                  className="font-semibold text-[1.15rem]  text-white"
                >
                Amount
                </label>
                <input
                  ref={amount}
                  id="amount"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-purple-950 hover:bg-violet-600 hover:text-slate-200 hover:scale-150 mt-6
                text-white h-10 
                rounded w-72 
                font-semibold 
                transition-all 
                duration-300 
                ease-in-out
                h"
              >
                UPDATE PAYMENT
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditPaymentModal;