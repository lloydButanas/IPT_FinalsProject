import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import AddProductModal from "../components/AddProductLineModal";
import EditProductModal from "../components/EditProductLineModal";

const ProductLine = () => {
  const [productLines, setProductLines] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProductLine, setEditProductLine] = useState<any>({});
  const [reload, setReload] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await Axios.get("/productlines", {
          cancelToken: ourRequest.token,
        });
        setProductLines(response.data);
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
        <AddProductModal setReload={setReload} setShowModal={setShowModal} />
      )}
      {showEditModal && (
        <EditProductModal
          editProductLine={editProductLine}
          setReload={setReload}
          setShowEditModal={setShowEditModal}
        />
      )}
      <div className="h-20  flex items-center justify-center bg-gradient-to-r from-violet-950 to-purple-200">
        <h1 className="text-white font-bold text-4xl  flex justify-center">PRODUCTLINE MANAGEMENT</h1>
      </div>
      <div className="container md:mx-auto mt-8 mb-6">
        <div className=" text-right mb-6">
        <div className=" text-left mb-6">
        <button
              onClick={() => navigate("/")}
              className="bg-purple-900  hover:bg-purple-200 hover:bg-violet-950 hover:text-fuchsia-400 text-white 
               hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all 
              ease-in-out font-semibold py-2 px-2 rounded hover:scale-150"
            >
              Homepage
            </button>
            <button
              onClick={() => navigate("/product")}
              className="bg-purple-900  hover:bg-purple-200 hover:bg-violet-950 hover:text-fuchsia-400 text-white
             hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all 
              ease-in-out font-semibold py-2 px-2 rounded ml-8 hover:scale-150"
            >
              Go to Product 
            </button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-900  hover:bg-purple-200 hover:bg-violet-950 hover:text-fuchsia-400 text-white
            hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all ease-in-out font-semibold 
            py-2 px-2 rounded hover:scale-150"
          >
            + Add
          </button>
        </div>
        <table
          cellPadding={10}
          className=" text-center h-auto w-full border  border-black"
        >
          <thead className="h-20 bg-violet-500 text-white border-black">
            <tr>
              <th className="py-2 px-4">Product Line</th>
              <th className="py-2 px-4">Text Description </th>
              <th className="py-2 px-4">Html Description</th>
              <th className="py-2 px-4">Image</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="h-[20px] min-h-[1em] border border-spacing-1 border-black w-px self-stretch 
          bg-gradient-to-tr from-violet-950 via-violet-200 to-purple-200 ">
            {productLines.map((productLines: any, index: number) => (
              <>
                <tr key={productLines.productLine}>
                  <td>{productLines.productLine}</td>
                  <td>{productLines.textDescription}</td>
                  <td>{productLines.htmlDescription}</td>
                  <td>{productLines.image}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditProductLine({
                          productLine: productLines.productLine,
                          textDescription: productLines.textDescription,
                          htmlDescription: productLines.htmlDescription,
                          image: productLines.image,
                        });
                        setShowEditModal(true);
                      }}
                      className="m-4 bg-green-950 hover:bg-green-400 duration-300 transition-all 
                      ease-in-out text-white font-bold py-2 px-4 rounded"
                    >
                      &#9998;
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          var result = confirm("Want to delete?");
                          if (result) {
                            const response = await Axios.delete(
                              `productlines/${productLines.productLine}`
                            );
                            console.log(response.data);
                            setReload((prev) => prev + 1);
                          }
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                      className="bg-rose-950 hover:bg-rose-400 duration-300 transition-all 
                      ease-in-out text-white font-bold py-2 px-4 rounded"
                    >
                      &times;
                    </button>
                  </td>
                </tr>
                {index !== productLines.length - 1 && (
                  <tr className="spacing-row">
                    <td colSpan={11} className="h-4">
                      <hr className="border-gray-400" />
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductLine;