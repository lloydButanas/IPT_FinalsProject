import { useRef } from "react";
import Modal from "./modal";
import Axios from "axios";

const EditProductLineModal = ({
  setShowEditModal,
  setReload,
  editProductLine,
}: any) => {
  const productLineRef = useRef<any>("");
  const textDescriptionRef = useRef<any>("");

  const htmlDescriptionRef = useRef<any>("");
  const imageRef = useRef<any>("");

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const data = {
      productLine: productLineRef.current.value,
      textDescription: textDescriptionRef.current.value,
      htmlDescriptionRef:
        htmlDescriptionRef.current.value == ""
          ? null
          : htmlDescriptionRef.current.value,
      image: imageRef.current.value == "" ? null : imageRef.current.value,
    };

    const response = await Axios.put(
      `/productlines/${editProductLine.productLine}`,
      data
    );
    setReload((prev: any) => prev + 1);
    setShowEditModal(false);
    console.log(response.data);
  };

  // Rest of your component...

  return (
    <Modal
      onClick={() => setShowEditModal(false)}
      className="flex flex-col justify-center items-center bg-gradient-to-r from-violet-950 to-purple-200 
      antialiased leading-relaxed"
    >
      <h1 className="font-bold text-2rem mb-1.5rem text-purple-950 text-4xl py-4">
        EDIT PRODUCT
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
                  defaultValue={editProductLine.productLine}
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
                  textDescription
                </label>
                <input
                  ref={textDescriptionRef}
                  defaultValue={editProductLine.textDescription}
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
                  htmlDescription
                </label>
                <input
                  ref={htmlDescriptionRef}
                  defaultValue={editProductLine.htmlDescription}
                  id="htmlDescription"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-[1rem]">
                <label htmlFor="image" className="font-semibold text-[1.15rem] text-white">
                  Product Scale
                </label>
                <input
                  ref={imageRef}
                  defaultValue={editProductLine.image}
                  id="image"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-purple-950 hover:bg-violet-600 hover:text-slate-200 hover:scale-150 mt-6 text-white h-10 rounded w-72 font-semibold 
                transition-all duration-300 ease-in-out "
              >
                UPDATE PRODUCTLINE
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditProductLineModal;