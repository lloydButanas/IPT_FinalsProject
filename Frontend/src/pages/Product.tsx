import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState({});
  const [reload, setReload] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Number of items to display per page
  const navigate = useNavigate();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchProducts = async () => {
      try {
        const response = await Axios.get("/products", {
          cancelToken: ourRequest.token,
        });
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();

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
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      {showModal && (
        <AddProductModal setReload={setReload} setShowModal={setShowModal} />
      )}
      {showEditModal && (
        <EditProductModal
          editProduct={editProduct}
          setReload={setReload}
          setShowEditModal={setShowEditModal}
        />
      )}
      <div className="h-20  flex items-center justify-center bg-gradient-to-r from-violet-950 to-purple-200">
        <h1 className="text-white font-bold text-4xl  flex justify-center">PRODUCT MANAGEMENT</h1>
      </div>
      <div className=" container md:mx-auto mt-8 mb-5">
        <div className=" text-left mb-6">
          <button
            onClick={() => navigate("/")}
            className="bg-purple-900  hover:bg-purple-200 hover:bg-violet-950 hover:text-fuchsia-400 text-white 
            hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all ease-in-out font-semibold 
            py-2 px-2 rounded hover:scale-150 "
          >
            Homepage
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-purple-900  hover:bg-purple-200 hover:bg-violet-950 hover:text-fuchsia-400 text-white
            hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 duration-300 transition-all 
            ease-in-out font-bold py-2 px-4 rounded ml-7 hover:scale-150"
          >
            + Add
          </button>
        </div>
        <table
          cellPadding={10}
          className=" text-center  h-auto w-full border  border-black"
        >
          <thead className=" text-white h-20 bg-violet-500 border-black">
            <tr>
              <th className="py-2 px-4">PRODUCT CODE</th>
              <th className="py-2 px-4">PRODUCT NAME</th>
              <th className="py-2 px-4">PRODUCT LINE</th>
              <th className="py-2 px-4">PRODUCT SCALTE</th>
              <th className="py-2 px-4">PRODUCT VENDOR</th>
              <th className="py-2 px-4">PRODUCT DESCRIPTION</th>
              <th className="py-2 px-4">QUANTITY IN STOCK</th>
              <th className="py-2 px-4">BUY PRICE</th>
              <th className="py-2 px-4">MSRP</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody className="h-[20px] min-h-[1em] border border-spacing-1 border-black w-px self-stretch 
          bg-gradient-to-tr from-violet-950 via-violet-200 to-purple-200 ">
            {currentItems.map((product: any) => (
              <tr key={product.productCode} className="border-b">
                <td className="italic hover:not-italic py-4 p-4 border border-black">
                  {product.productCode}
                </td>
                <td className="italic hover:not-italic py-4 p-4 border border-black">
                  {product.productName}
                </td>
                <td className="italic hover:not-italic py-4 p-4 border border-black">
                  {product.productLine}
                </td>
                <td className="italic hover:not-italic py-4 p-4 border border-black">
                  {product.productScale}
                </td>
                <td className="italic hover:not-italic py-4 p-4 border border-black">
                  {product.productVendor}
                </td>
                <td className="italic hover:not-italic py-4 p-4 border border-black">
                  {product.productDescription}
                </td>
                <td className="italic hover:not-italic py-4 p-4 border border-black">
                  {product.quantityInStock}
                </td>
                <td className="italic hover:not-italic py-4 p-4 border border-black">
                  {product.buyPrice}
                </td>
                <td className="italic hover:not-italic py-4 p-4 border border-black">
                  {product.MSRP}
                </td>
                <td className="italic hover:not-italic 0 py-8 p-6 border border-black">
                  <div className="flex">
                    <button
                      onClick={() => {
                        setEditProduct(product);
                        setShowEditModal(true);
                      }}
                      className="m-4 my-2  bg-green-950 hover:bg-green-400 
                      text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 
                      duration-300 transition-all ease-in-out font-bold py-2 px-4 rounded"
                    >
                      &#9998;
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          const response = await Axios.delete(
                            `products/${product.productCode}`
                          );
                          console.log(response.data);
                          setReload((prev) => prev + 1);
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                      className="m-6 my-2 bg-rose-950 hover:bg-rose-400 
                      text-white hover:text-black hover:shadow-lime-900 hover:shadow-lg hover:drop-shadow-2x2 
                      duration-300 transition-all ease-in-out font-bold py-2 px-4 rounded"
                    >
                      &times;
                    </button>
                  </div>
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

export default Product;
