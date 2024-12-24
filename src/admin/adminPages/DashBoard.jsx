import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllOrders, totalProPurchased, TotalRevenue } from "../../sliceLogic/AdminOrderSlice";
import { getAllUsers } from "../../sliceLogic/UserSlice";
import { fetchProducts } from "../../sliceLogic/ProductSlice";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // Used for pie charts
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const DashBoard = () => {
  const dispatch = useDispatch();
  const { revenue, totalpro, allOrders } = useSelector((state) => state.adOrder);
  const { users } = useSelector((state) => state.adUser);
  const { products } = useSelector((state) => state.pro);

  useEffect(() => {
    dispatch(GetAllOrders());
    dispatch(TotalRevenue());
    dispatch(totalProPurchased());
    dispatch(getAllUsers());
    dispatch(fetchProducts());
  }, [dispatch]);

  // Active and non-active users
  const activeUsers = users?.filter(user => !user.isBlocked).length || 0;
  const nonActiveUsers = users?.filter(user => user.isBlocked).length || 0;

  // Product categories
  const categoryData = products?.reduce((acc, product) => {
    const categoryName = product.categoryName;
    if (acc[categoryName]) {
      acc[categoryName]++;
    } else {
      acc[categoryName] = 1;
    }
    return acc;
  }, {});
  const categories = Object.keys(categoryData || {});
  const counts = Object.values(categoryData || {});

  // Order statuses
  const orderPlacedOrders = allOrders?.filter(order => order.orderStatus !== "Delivered").length || 0;
  const deliveredOrders = allOrders?.filter(order => order.orderStatus === "Delivered").length || 0;


 
  

  // Bar chart data
  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Number of Products",
        data: counts,
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const userStatusData = {
    labels: ["Active Users", "Non-Active Users"],
    datasets: [
      {
        label: "Users Count",
        data: [activeUsers, nonActiveUsers],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
      },
    ],
  };

  // Pie chart data for orders
  const pieChartData = {
    labels: ["Delivered", "OrderPlaced"],
    datasets: [
      {
        data: [deliveredOrders, orderPlacedOrders],
        backgroundColor: ["#4CAF50", "#FF9800"],
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      title: { display: true, text: "Products by Category" },
    },
  };

  const userStatusChartOptions = {
    responsive: true,
    plugins: {
      title: { display: true, text: "Active vs Non-Active Users" },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom aspect ratio
    aspectRatio: 2, // Matches bar chart's aspect ratio
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Order Status Distribution" },
    },
  };

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        Admin Dashboard
      </h2>

      {/* Statistics Section */}
      <div className="flex flex-wrap justify-center gap-4 p-6">
        <div className="w-full sm:w-60 p-4 bg-white rounded-lg shadow-md text-center">
          <h2 className="font-semibold text-lg text-gray-700">Total Revenue</h2>
          <p className="text-2xl font-bold text-green-600">₹{revenue}</p>
        </div>
        <div className="w-full sm:w-60 p-4 bg-white rounded-lg shadow-md text-center">
          <h2 className="font-semibold text-lg text-gray-700">Total Users</h2>
          <p className="text-2xl font-bold text-blue-600">{users?.length}</p>
        </div>
        <div className="w-full sm:w-60 p-4 bg-white rounded-lg shadow-md text-center">
          <h2 className="font-semibold text-lg text-gray-700">Total Products</h2>
          <p className="text-2xl font-bold text-blue-600">{products?.length}</p>
        </div>
        <div className="w-full sm:w-60 p-4 bg-white rounded-lg shadow-md text-center">
          <h2 className="font-semibold text-lg text-gray-700">Total Sold Products</h2>
          <p className="text-2xl font-bold text-orange-600">{totalpro}</p>
        </div>
        <div className="w-full sm:w-60 p-4 bg-white rounded-lg shadow-md text-center">
          <h2 className="font-semibold text-lg text-gray-700">Active Users</h2>
          <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
        </div>
        <div className="w-full sm:w-60 p-4 bg-white rounded-lg shadow-md text-center">
          <h2 className="font-semibold text-lg text-gray-700">Non-Active Users</h2>
          <p className="text-2xl font-bold text-red-600">{nonActiveUsers}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-wrap justify-center gap-6">
        <div className="w-full sm:w-1/2 h-[400px] p-6 bg-white rounded-lg shadow-md">
          <Bar data={chartData} options={chartOptions} />
        </div>
        <div className="w-full sm:w-1/2 h-[400px] p-6 bg-white rounded-lg shadow-md">
          <Bar data={userStatusData} options={userStatusChartOptions} />
        </div>
        <div className="w-full sm:w-1/2 h-[400px] p-6 bg-white rounded-lg shadow-md mx-auto">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
