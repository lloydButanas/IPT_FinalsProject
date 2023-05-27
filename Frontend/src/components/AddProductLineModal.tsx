import { useRef } from "react";
import Modal from "./modal";
import Axios from "axios";

const AddProductLineModal = ({ setShowModal, setReload }: any) => {
  const productLineRef = useRef<any>("");
  const textDescriptionRef = useRef<any>("");
  const htmlDescriptionRef = useRef<any>(null);
  const imageRef = useRef<any>(null);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const data = {
      productLine: productLineRef.current.value,
      textDescription: textDescriptionRef.current.value,
      htmlDescription:
        htmlDescriptionRef.current.value == ""
          ? null
          : htmlDescriptionRef.current.value,
      image: imageRef.current.value == "" ? null : imageRef.current.value,
    };

    const response = await Axios.post("/productlines/create", data);
    setReload((prev: any) => prev + 1);
    setShowModal(false);
    console.log(response.data);
  };

  return (
    <Modal
      onClick={() => setShowModal(false)}
      className="flex flex-col justify-center items-center bg-gradient-to-r from-violet-950 to-purple-200 
      antialiased leading-relaxed"
    >
      <h1 className="font-bold text-2rem mb-1.5rem text-purple-950 text-4xl py-4">
       ADD PRODUCT LINE
      </h1>
      <form onSubmit={submitHandler}>
        <div className="flex gap-8 items-center">
          <div>
            <div className="flex items-center gap-4">
              <div className="mb-4">
                <label
                  htmlFor="productLine"
                  className="font-semibold text-[1.15rem] text-white"
                >
                  Product Line
                </label>
                <input
                  ref={productLineRef}
                  id="productLine"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="textDescription"
                  className="font-semibold text-[1.15rem] text-white"
                >
                  Text Description
                </label>
                <input
                  ref={textDescriptionRef}
                  id="textDescription"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="htmlDescription"
                  className="font-semibold text-[1.15rem] text-white"
                >
                  Html Description
                </label>
                <input
                  ref={htmlDescriptionRef}
                  id="htmlDescription"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-[1rem]">
                <label htmlFor="image" className="font-semibold text-[1.15rem] text-white">
                  Image
                </label>
                <input
                  ref={imageRef}
                  id="image"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-purple-950  hover:bg-violet-600 hover:text-slate-200 hover:scale-150 mt-6 text-white h-10 rounded w-72 font-semibold transition-all 
                duration-300 ease-in-out "
              >
                ADD PRODUCT LINE
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductLineModal;