import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addOrder } from '../sliceLogic/Payment';
import { clear } from '../sliceLogic/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faUniversity } from '@fortawesome/free-solid-svg-icons'; // Bank transfer icon
import { faPaypal } from '@fortawesome/free-brands-svg-icons'; // PayPal icon
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const nav=useNavigate()
    const cart = useSelector((state) => state.cartItems.cart); // Fetching cart items from Redux
    const dispatch = useDispatch();

    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('credit-card'); // Default payment method

    // Calculate total price
    const t = cart.map((item) => item.qty * item.price);
    const totalPrice = t.reduce((acc, item) => acc + item, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        dispatch(addOrder({
            address,
            paymentMethod,
            cart,
            totalPrice
        }));
        dispatch(clear());
        nav("/thankyou")

    };

    return (
        <div className="payment-container flex justify-between p-8">
            {/* Cart Summary Section */}
            <div className="cart-summary w-1/2 bg-white shadow-lg p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                <ul className="space-y-4">
                    {cart.map((item) => (
                        <li key={item.id} className="border-b pb-2">
                            <div className="font-bold text-lg">{item.name}</div>
                            <div>Quantity: {item.qty}</div>
                            <div>Price: ${item.price}</div>
                        </li>
                    ))}
                </ul>
                <h3 className="text-xl font-semibold mt-6">Total: ${totalPrice.toFixed(2)}</h3>
            </div>

            {/* Payment Form Section */}
            <div className="payment-form w-1/2 bg-white shadow-lg p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
                <form onSubmit={handleSubmit}>
                    {/* Address Section */}
                    <div className="mb-6">
                        <label htmlFor="address" className="block text-lg font-semibold mb-2">Shipping Address:</label>
                        <textarea
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            rows="4"
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Payment Method Section */}
                    <div className="mb-6">
                        <label className="block text-lg font-semibold mb-2">Payment Method:</label>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="credit-card"
                                    name="paymentMethod"
                                    value="credit-card"
                                    checked={paymentMethod === 'credit-card'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mr-2"
                                />
                                <label htmlFor="credit-card" className="flex items-center">
                                    <FontAwesomeIcon icon={faCreditCard} className="text-indigo-500 mr-2" />
                                    Credit Card
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="paypal"
                                    name="paymentMethod"
                                    value="paypal"
                                    checked={paymentMethod === 'paypal'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mr-2"
                                />
                                <label htmlFor="paypal" className="flex items-center">
                                    <FontAwesomeIcon icon={faPaypal} className="text-indigo-500 mr-2" />
                                    PayPal
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="bank-transfer"
                                    name="paymentMethod"
                                    value="bank-transfer"
                                    checked={paymentMethod === 'bank-transfer'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mr-2"
                                />
                                <label htmlFor="bank-transfer" className="flex items-center">
                                    <FontAwesomeIcon icon={faUniversity} className="text-indigo-500 mr-2" />
                                    Bank Transfer
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                        Pay ${totalPrice}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
