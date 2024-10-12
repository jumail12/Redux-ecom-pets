import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart,incrementQty,decrementQty } from '../sliceLogic/cartSlice';
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cartItems.cart);

     const tget = cart.map((item)=>item.qty*item.price )
    const total=tget.reduce((acc,cur)=>acc+=cur,0)
    
    return (
        <div className="container mx-auto p-6">
        <ToastContainer/>
        <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>
    
        {cart.length === 0 ? (
            <div className="text-center">
                <img 
                    src="https://cdn.pixabay.com/photo/2015/11/06/11/50/shopping-cart-1026510_1280.jpg" 
                    alt="Empty Cart"
                    className="w-1/4 h-auto mx-auto mb-4 object-fill" 
                />
                <h2 className="text-2xl font-bold text-gray-500">Your cart is empty!</h2>
                <button
                    onClick={() => navigate('/store')}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Shop Now
                </button>
            </div>
        ) : (
            <>
                {/* Cart Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                    {cart.map((item) => (
                        <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden p-2">
                            <img
                                src={item.url}
                                alt={item.name}
                                className="w-30 h-32 object-fill mb-2"
                            />
                            <div className="p-2">
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-gray-600">Price: ${item.price}</p>
                                
                                <div className="flex items-center mt-2">
                                    <p className="text-gray-600 mr-4">Qty: {item.qty}</p>
                                    <button 
                                        onClick={async() => await dispatch(decrementQty(item.id))}
                                        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                                    >
                                        -
                                    </button>
                                    <button 
                                        onClick={async() => await dispatch(incrementQty(item.id))}
                                        className="bg-green-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-green-600"
                                    >
                                        +
                                    </button>
                                </div>
    
                                <p className="text-gray-800 font-bold mt-2">Total: ${(item.price * item.qty).toFixed(2)}</p>
    
                                <button 
                                    onClick={async() => await dispatch(removeFromCart(item.id))}
                                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
    
                {/* Proceed to Payment Button */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => cart.length>0? navigate('/payment'):toast.info("Your cart is empty..!")} 
                        className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        Proceed to Payment  :<span className="font-bold">${total}</span>
                    </button>
                </div>
            </>
        )}
    </div>
    
    );
};

export default Cart;
