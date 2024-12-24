import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductById, UpdatePro, FetchCategories } from '../../sliceLogic/ProductSlice';
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

const Edit_Product = () => {
    const { edId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { product } = useSelector((state) => state.pro);
    const { categories } = useSelector((state) => state.pro);

    useEffect(() => {
        dispatch(fetchProductById(edId));
        dispatch(FetchCategories());
    }, [dispatch, edId]);

  


    const formik = useFormik({
        initialValues: {
            ProductName: product?.productName || "",
            ProductDescription: product?.productDescription || "",
            Rating: product?.rating || "",
            ProductPrice: product?.productPrice || "",
            OfferPrize: product?.offerPrize || "",
            CategoryId: product?.categoryId || "",
            image: null,  // image defaults to null if not selected
        },
      
        enableReinitialize: true,  // Allow form to reinitialize if product changes
      
        onSubmit: async (values) => {
            const formData = new FormData();
            
            Object.entries(values).forEach(([key, value]) => {
                if (key === 'image' && value === null) {
                    // If no image, don't append it as it should be treated as null
                    formData.append(key, '');
                } else {
                    formData.append(key, value);
                }
            });
    
            try {
                await dispatch(UpdatePro({ id: edId, data: formData })).then(()=>{
                    formik.resetForm();
                    dispatch(fetchProductById(edId));
                    toast.success("Product updated successfully");
                }) // Dispatch updated product with formData
               
            } catch (err) {
                toast.error(`Failed to update product: ${err.message}`);
            }
        },
    });
    

    return (
        <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-4xl mx-auto">
            <div className="w-full max-w-xl flex justify-start mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-green-100 text-green-700 px-6 py-3 rounded-lg hover:bg-green-200 transition-all"
                >
                    ← Go Back
                </button>
            </div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Update Product</h2>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                        type="text"
                        name="ProductName"
                        value={formik.values.ProductName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                        placeholder="Enter product name"
                    />
                   
                </div>

                {/* Product Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Description</label>
                    <textarea
                        name="ProductDescription"
                        value={formik.values.ProductDescription}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                        rows="4"
                        placeholder="Enter product description"
                    />
                   
                </div>

                {/* Product Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Price (₹)</label>
                    <input
                        type="number"
                        name="ProductPrice"
                        value={formik.values.ProductPrice}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                        placeholder="Enter price"
                        step="0.01"
                        min="0"
                    />
                  
                </div>

                {/* Offer Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Offer Price (₹)</label>
                    <input
                        type="number"
                        name="OfferPrize"
                        value={formik.values.OfferPrize}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                        placeholder="Enter offer price"
                        step="0.01"
                        min="0"
                    />
                 
                </div>

                {/* Product Rating */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Rating (1.0 to 5.0)</label>
                    <input
                        type="number"
                        name="Rating"
                        value={formik.values.Rating}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                        placeholder="Enter product rating"
                        step="0.1"
                        min="1"
                        max="5"
                    />
                  
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={(e) => formik.setFieldValue("image", e.target.files[0])} // Default to previous image if no new file
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                        accept="image/*"
                    />
                
                </div>

                {/* Category Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        name="CategoryId"
                        value={formik.values.CategoryId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                    >
                        <option value="" disabled>
                            Select a category
                        </option>
                        {categories && Array.isArray(categories) && categories.length > 0 ? (
                            categories.map((category) => (
                                <option key={category.categoryId} value={category.categoryId}>
                                    {category.categoryName}
                                </option>
                            ))
                        ) : (
                            <option>No categories available</option>
                        )}
                    </select>
                 
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${formik.isSubmitting && "opacity-50 cursor-not-allowed"}`}
                    disabled={formik.isSubmitting}
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default Edit_Product;
