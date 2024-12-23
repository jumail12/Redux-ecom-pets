import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { totalProPurchased, TotalRevenue } from "../../sliceLogic/AdminOrderSlice";
import { getAllUsers } from "../../sliceLogic/UserSlice";
import { fetchProducts } from "../../sliceLogic/ProductSlice";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashBoard = () => {
  const dispatch = useDispatch();
  const { revenue, totalpro } = useSelector((state) => state.adOrder);
  const { users } = useSelector((state) => state.adUser);
  const { products } = useSelector((state) => state.pro);

  useEffect(() => {
    dispatch(TotalRevenue());
    dispatch(totalProPurchased());
    dispatch(getAllUsers());
    dispatch(fetchProducts());
  }, [dispatch]);

  // Prepare data for active and non-active users
  const activeUsers = users?.filter(user => !user.isBlocked).length || 0;
  const nonActiveUsers = users?.filter(user => user.isBlocked).length || 0;

  // Prepare data for the product categories chart
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

  // Bar chart color setup
  const barColors = [
    "rgba(75, 192, 192, 0.6)", 
    "rgba(255, 99, 132, 0.6)",
    "rgba(153, 102, 255, 0.6)", 
    "rgba(255, 159, 64, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 99, 71, 0.6)",
  ];

  // Bar chart data and options for Products by Category
  const chartData = {
    labels: categories,
    datasets: [{
      label: "Number of Products",
      data: counts,
      backgroundColor: barColors.slice(0, categories.length),
      borderColor: barColors.slice(0, categories.length),
      borderWidth: 1,
    }],
  };

  // Bar chart data and options for Active vs Non-Active Users
  const userStatusData = {
    labels: ['Active Users', 'Non-Active Users'],
    datasets: [{
      label: 'Users Count',
      data: [activeUsers, nonActiveUsers],
      backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
      borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Products by Category",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  const userStatusChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Active vs Non-Active Users",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        Admin Dashboard
      </h2>
      
      {/* Statistics Section */}
      <div className="flex flex-wrap justify-center gap-4 p-6">
        {/* Total Revenue */}
        <div className="w-full sm:w-60 p-4 bg-white rounded-lg shadow-md text-center">
          <h2 className="font-semibold text-lg text-gray-700">Total Revenue</h2>
          <p className="text-2xl font-bold text-green-600">₹{revenue}</p>
        </div>

        {/* Total Users */}
        <div className="w-full sm:w-60 p-4 bg-white rounded-lg shadow-md text-center">
          <h2 className="font-semibold text-lg text-gray-700">Total Users</h2>
          <p className="text-2xl font-bold text-blue-600">{users?.length}</p>
        </div>

        {/* Total Products */}
        <div className="w-full sm:w-60 p-4 bg-white rounded-lg shadow-md text-center">
          <h2 className="font-semibold text-lg text-gray-700">Total Products</h2>
          <p className="text-2xl font-bold text-blue-600">{products?.length}</p>
        </div>

        {/* Total Products Sold */}
        <div className="w-full sm:w-60 p-4 bg-white rounded-lg shadow-md text-center">
          <h2 className="font-semibold text-lg text-gray-700">Total Sold Products</h2>
          <p className="text-2xl font-bold text-orange-600">{totalpro}</p>
        </div>

        {/* Active Users */}
        <div className="w-full sm:w-60 p-4 bg-white rounded-lg shadow-md text-center">
          <h2 className="font-semibold text-lg text-gray-700">Active Users</h2>
          <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
        </div>

        {/* Non-Active Users */}
        <div className="w-full sm:w-60 p-4 bg-white rounded-lg shadow-md text-center">
          <h2 className="font-semibold text-lg text-gray-700">Non-Active Users</h2>
          <p className="text-2xl font-bold text-red-600">{nonActiveUsers}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-wrap justify-center gap-6">
        {/* Bar Chart: Products by Category */}
        <div className="w-full sm:w-1/2 p-6 bg-white rounded-lg shadow-md mx-auto">
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Bar Chart: Active vs Non-Active Users */}
        <div className="w-full sm:w-1/2 p-6 bg-white rounded-lg shadow-md mx-auto">
          <Bar data={userStatusData} options={userStatusChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
