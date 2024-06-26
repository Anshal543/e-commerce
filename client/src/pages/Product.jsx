import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchProducts } from "../features/product/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { addCart, removeCart } from "../features/cart/cartSlice";
import { addPost } from "../features/post/postSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleAddCart = (product) => {
    if (!userInfo) {
      toast.error("Please login to add to cart", {
        position: "bottom-left",
      });
      navigate("/sign-in");
      return;
    }
    const newObj = { product:product.id, quantity: 1};
    // console.log(newObj);
    dispatch(addPost(newObj));
    // console.log("newObj");
    // console.log(newObj);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {products?.map((product) => (
            <div className="flex flex-col">
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="group relative"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.thumbnail}
                    alt={product.image}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex gap-5 justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {" "}
                      rating :{product.rating}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price} PKR
                  </p>
                </div>
              </Link>
              <button
                onClick={() => handleAddCart(product)}
                className="bg-blue-400 py-1 px-5 text-white"
              >
                Add to Cart <ToastContainer position="bottom-left" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
