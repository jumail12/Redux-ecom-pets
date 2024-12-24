import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axiosInstance";

// fetchProducts
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const resp = await axiosInstance.get(`/Product/All`);
      return resp.data.data;
    } catch (err) {
      throw new Error(
        err.response?.data || "Please check your internet connection"
      );
    }
  }
);

// FeturedPro
export const FeturedPro = createAsyncThunk("products/FeturedPro", async () => {
  try {
    const res = await axiosInstance.get(`/Product/FeturedPro`);
    return res.data.data;
  } catch (err) {
    throw new Error(
      err.response?.data || "Please check your internet connection"
    );
  }
});

//filtered products
export const filteredProducts_ = createAsyncThunk(
  "products/filteredProducts_",
  async (catgString) => {
    try {
      const res = await axiosInstance.get(
        `/Product/getByCategoryName?CatName=${catgString}`
      );
      return res.data.data;
    } catch (err) {
      throw new Error(
        err.response?.data || "Please check your internet connection"
      );
    }
  }
);

//pro/byid
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    try {
      const res = await axiosInstance.get(`/Product/GetById/${id}`);
      return res.data.data;
    } catch (err) {
      throw new Error(
        err.response?.data || "Please check your internet connection"
      );
    }
  }
);

//search
export const SerachPro = createAsyncThunk("products/SerachPro", async (qry) => {
  try {
    const res = await axiosInstance.get(`/Product/search-item?search=${qry}`);
    return res.data.data;
  } catch (err) {
    throw new Error(
      err.response?.data || "Please check your internet connection"
    );
  }
});

//add pro
export const AdminAddProduct = createAsyncThunk("products/addpro", 
  async (param) => {
  try {
    const res = await axiosInstance.post(`/Product/Add_Pro`, param);
    return res.data.message;
  } catch (err) {    
    console.log(err.response);
    
    throw new Error(
      err.response?.data || "Please check your internet connection"
    );
  }
});

//update
export const UpdatePro = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }) => {  
    try {
      const res = await axiosInstance.put(`/Product/Update_Pro/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
      return res.data.message; 
    } catch (err) {
      throw new Error(
        err.response?.data || "Please check your internet connection"
      );
    }
  }
);


//delete
export const DeleteProduct = createAsyncThunk(
  "products/deletePro",
  async (id) => {
    try {
      const res = await axiosInstance.delete(`/Product/Delete/${id}`);
      return res.data.message;
    } catch (err) {
      throw new Error(
        err.response?.data || "Please check your internet connection"
      );
    }
  }
);

//fetch categories
export const FetchCategories = createAsyncThunk(
  "products/FetchCategories",
  async () => {
    try {
      const res = await axiosInstance.get(`/Category/getCategories`);
      return res.data.data;
    } catch (err) {
      throw new Error(
        err.response?.data || "Please check your internet connection"
      );
    }
  }
);

const intil = {
  status: "idle",
  products: [],
  featuredPro: [],
  filteredProducts: [],
  search: [],
  product: {},
  error: null,
  res: null,
  categories: [],
};

const productSlice = createSlice({
  name: "products",
  initialState: intil,
  reducers: {},
  extraReducers: (bundle) => {
    bundle

      //getting all products
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "rejected";
        state.products = [];
        state.error = action.error.message;
      })

      //filtered products
      .addCase(filteredProducts_.pending, (state) => {
        state.status = "loading";
      })
      .addCase(filteredProducts_.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.filteredProducts = action.payload;
        state.error = null;
      })
      .addCase(filteredProducts_.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })

      //fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })

      //featured
      .addCase(FeturedPro.fulfilled, (state, action) => {
        state.featuredPro = action.payload;
        state.status = "fulfiled";
      })
      .addCase(FeturedPro.rejected, (state, action) => {
        state.error = action.error.message;
      })

      //search
      .addCase(SerachPro.fulfilled, (state, action) => {
        state.search = action.payload;
        state.status = "fulfilled";
      })
      .addCase(SerachPro.rejected, (state, action) => {
        state.error = action.error.message;
      })

      //add
      .addCase(AdminAddProduct.fulfilled, (state, action) => {
        state.res = action.payload;
        state.status = "fulfilled";
      })
      .addCase(AdminAddProduct.rejected, (state, action) => {
        state.error = action.error.message;
      })

      //update
      .addCase(UpdatePro.fulfilled, (state, action) => {
        state.res = action.payload;
        state.status = "fulfilled";
      })
      .addCase(UpdatePro.rejected, (state, action) => {
        state.error = action.error.message;
      })

      //delete
      .addCase(DeleteProduct.fulfilled, (state, action) => {
        state.res = action.payload;
        state.status = "fulfilled";
      })
      .addCase(DeleteProduct.rejected, (state, action) => {
        state.error = action.error.message;
      })

      //caytegries
    
      .addCase(FetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = "fulfilled";
      })
      .addCase(FetchCategories.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
