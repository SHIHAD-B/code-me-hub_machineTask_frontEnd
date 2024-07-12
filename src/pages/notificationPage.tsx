import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../config/constants";
import axios from "axios";

export const Notification = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("id");
    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        const fetchOrderData = async () => {
            if (orderId) {
                try {
                    const response = await axios.get(`${BASE_URL}api/displayorder/${orderId}`);
                    if (response.data.success) {
                        setOrder(response.data.data);
                    } else {
                        console.error("Error fetching order data:");
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            }
        };

        fetchOrderData();
    }, [orderId]);

    return (
        <div className="w-full h-full flex flex-col items-center p-4">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            {order ? (
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl">
                    <div className="mb-4">
                        <p className="text-lg font-semibold">Total Amount: ₹ {order.totalAmount}</p>
                        {order.discount > 0 && (
                            <p className="text-md text-red-600">Discount Applied: ₹ {order.discount}</p>
                        )}
                        <p className="text-md">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                        <p className="text-md">Status: {order.status}</p>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Items:</h3>
                    <ul className="space-y-4">
                        {order.items.map((item: any) => (
                            <li key={item.productId}>
                                <div className="flex items-center justify-between border-b pb-2">
                                    <div className="flex items-center">
                                        <img src={`src${item.productId.image}`} alt={item.productId.name} className="w-16 h-16 mr-4" />
                                        <div>
                                            <h4 className="font-medium">{item.quantity} x {item.productId.name}</h4>
                                            <p>Description: {item.productId.description}</p>
                                            <p>Price: ₹ {item.productId.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-gray-500">Loading order details...</p>
            )}
            <button onClick={() => navigate('/')} className="mt-6 p-2 rounded bg-red-700 text-white">Back to Shopping</button>
        </div>
    );
};
