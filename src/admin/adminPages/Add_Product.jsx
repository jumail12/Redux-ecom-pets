import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { FetchCategories, AdminAddProduct } from "../../sliceLogic/ProductSlice"; // Ensure correct import path
import * as Yup from "yup";
import { useEffect } from "react";
import { Link } from "react-router-dom";


const AddNewProductForm = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.pro);

  useEffect(() => {
    dispatch(FetchCategories());
  }, [dispatch]);


  

  const validationSchema = Yup.object({
    ProductName: Yup.string().required("Product Name is required"),
    ProductDescription: Yup.string().required("Product Description is required"),
    Rating: Yup.number()
      .min(1, "Minimum rating is 1.0")
      .max(5, "Maximum rating is 5.0")
      .required("Rating is required")
      .typeError("Rating must be a valid decimal number"),
    ProductPrice: Yup.number()
      .positive("Price must be a positive number")
      .required("Product Price is required")
      .typeError("Product Price must be a valid decimal number"),
    OfferPrize: Yup.number()
      .positive("Offer Price must be a positive number")
      .lessThan(Yup.ref("ProductPrice"), "Offer price must be less than product price")
      .required("Offer Price is required")
      .typeError("Offer Price must be a valid decimal number"),
    CategoryId: Yup.string().required("Category is required"),
    image: Yup.mixed()
      .required("Image is required")
      .test("fileFormat", "Only image files are allowed", (value) =>
        value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      ),
  });

  const formik = useFormik({
    initialValues: {
      ProductName: "",
      ProductDescription: "",
      Rating: "",
      ProductPrice: "",
      OfferPrize: "",
      CategoryId: "",
      image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      try {
        await dispatch(AdminAddProduct(formData)).unwrap();
        formik.resetForm();
        toast.success("Product added successfully");
      } catch (err) {
        toast.error(`Failed to add product: ${err.message}`);
      }
    },
  });

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-4xl mx-auto">

       <Link
              to={"/admin"}
              className="text-blue-500 hover:underline mb-6 inline-block"
            >
              {"< Back to Admin Panel"}
            </Link>
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Add New Product</h2>

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
          {formik.touched.ProductName && formik.errors.ProductName && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.ProductName}</p>
          )}
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
          {formik.touched.ProductDescription && formik.errors.ProductDescription && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.ProductDescription}</p>
          )}
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
          {formik.touched.ProductPrice && formik.errors.ProductPrice && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.ProductPrice}</p>
          )}
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
          {formik.touched.OfferPrize && formik.errors.OfferPrize && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.OfferPrize}</p>
          )}
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
          {formik.touched.Rating && formik.errors.Rating && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.Rating}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Image</label>
          <input
            type="file"
            name="image"
            onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            accept="image/*"
          />
          {formik.touched.image && formik.errors.image && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.image}</p>
          )}
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
  {formik.touched.CategoryId && formik.errors.CategoryId && (
    <p className="text-red-500 text-xs mt-1">{formik.errors.CategoryId}</p>
  )}
</div>
        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${formik.isSubmitting && "opacity-50 cursor-not-allowed"}`}
          disabled={formik.isSubmitting}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddNewProductForm;
