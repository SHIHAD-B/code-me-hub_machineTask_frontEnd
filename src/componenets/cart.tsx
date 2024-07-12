import { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { listCart } from "../redux/actions/actions";
import axios from "axios";
import { BASE_URL } from "../config/constants";
import { Bounce, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

interface ProductsProps {
    setCart: (value: boolean) => void;
}

export const Cart: React.FC<ProductsProps> = ({ setCart }) => {
    const navigate=useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const [isVisible, setIsVisible] = useState(false);
    const { data } = useSelector((state: RootState) => state.cart);
    const [subTotal, setSubtotal] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [promoError, setPromoError] = useState<string>("");
    const [promocode, setPromoCode] = useState<string>("");

    useEffect(() => {
        setIsVisible(true);
        dispatch(listCart());
    }, [dispatch]);

    useEffect(() => {
        if (Array.isArray(data)) {
            const value = data.reduce((acc, curr) => acc + curr.productId.price * curr.quantity, 0);
            setSubtotal(value);
        }
    }, [data]);

    const deleteItem = async (id: string) => {
        try {
            const deleted = await axios.delete(`${BASE_URL}api/deletefromcart/${id}`);
            if (deleted?.data?.success) {
                dispatch(listCart());
                toast.success('Item deleted successfully');
            } else {
                toast.error('Failed to delete item');
            }
        } catch (error) {
            toast.error('An error occurred while deleting the item');
        }
    };

    const handleQuantityChange = async (id: string, quantity: number) => {
        try {
            const change = await axios.patch(`${BASE_URL}api/updatecartquantity`, { id, value: quantity });
            if (change?.data?.success) {
                dispatch(listCart());
                toast.success('Quantity updated successfully');
            } else {
                toast.error('Failed to update quantity');
            }
        } catch (error) {
            toast.error('An error occurred while updating the quantity');
        }
    };

    const promo = async () => {
        setPromoError("");
        if (promocode.trim() === "") {
            setPromoError("Please enter the promo code");
            return;
        }
        try {
            const code = await axios.get(`${BASE_URL}api/checkcoupon/${promocode}`);
            if (code.data.success) {
                setDiscount(Number(code.data.data.discount));
                toast.success('Promo code applied successfully');
            } else {
                setPromoError("Invalid promo code");
                toast.error('Invalid promo code');
            }
        } catch (error) {
            setPromoError("An error occurred while applying the promo code");
            toast.error('An error occurred while applying the promo code');
        }
    };

    const order = async () => {
        let couponcodes = promocode.trim() === "" ? "nill" : promocode;

        try {
            const orders = await axios.post(`${BASE_URL}api/addorder`, { code: couponcodes });
            if (orders.data.success) {
                dispatch(listCart());
                toast.success('Your order is placed!', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                navigate(`/notification?id=${orders.data.data._id}`);
            } else {
                toast.error('Failed to place order');
            }
        } catch (error) {
            toast.error('An error occurred while placing the order');
        }
    };


    return (
        <div
            className={`fixed gap-2 top-2 right-1 w-[30%] h-full bg-gray-100 rounded flex flex-col p-2 z-20 transition-transform duration-500 ease-in-out ${isVisible ? "translate-x-0" : "translate-x-full"}`}
        >
            <div className="w-full flex h-10 justify-between items-center">
                <span className="text-2xl font-bold text-black/50">Cart</span>
                <RxCross1 onClick={() => setCart(false)} className="text-3xl p-1 bg-red-700 text-white rounded" />
            </div>

            <div className="w-full flex-1 overflow-y-scroll flex flex-col gap-1">
                {Array.isArray(data) ? data.map((item, index) => (
                    <div key={index} className="w-full rounded h-28 border border-gray-500 flex bg-white p-2">
                        <div className="w-[30%] h-full p-1 flex justify-center items-center">
                            <img src={`src${item.productId.image}`} alt="" className="rounded w-[80%] object-contain" />
                        </div>
                        <div className="w-[70%] flex flex-col justify-center items-start relative">
                            <span className="text-lg font-bold w-full flex justify-between">{item.productId.name}
                                <RxCross1 onClick={() => deleteItem(String(item.productId._id))} className="absolute top-1 right-1 cursor-pointer" />
                            </span>
                            <p className="text-sm">{item.productId.description}</p>
                            <div className="flex w-full justify-between items-center">
                                <span className="text-lg font-bold">Rs.{item.productId.price}/-</span>
                                <div className="flex justify-center items-center gap-1">
                                    <button onClick={() => handleQuantityChange(String(item.productId._id), item.quantity - 1)} className="w-8 h-8 rounded bg-red-700 text-white">-</button>
                                    <input className="w-16 bg-gray-200 h-8 text-center" type="number" value={item.quantity} readOnly />
                                    <button onClick={() => handleQuantityChange(String(item.productId._id), item.quantity + 1)} className="w-8 h-8 rounded bg-red-700 text-white">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <span className="w-full h-full text-lg font-bold flex justify-center items-center">No Products</span>
                )}
            </div>
            <div className="w-full h-10 flex gap-2 ">
                <input onChange={(e) => setPromoCode(e.target.value)} type="text" value={promocode} placeholder="Enter Your PromoCode" className="w-[70%] rounded h-full p-1" />
                <button onClick={promo} className="w-[30%] h-full rounded bg-red-700 text-white">Apply</button>
            </div>
            <p className="text-xs text-red-600">{promoError}</p>
            <div className="w-full h-[30%] p-4 flex flex-col justify-center items-center gap-1">
                <span className="w-full flex justify-between"><p className="text-base ">Sub Total:</p><p className="text-lg font-bold">₹ {subTotal ? subTotal : 0}</p></span>
                <span className="w-full flex justify-between"><p className="text-base ">Discount:</p><p className="text-lg font-bold">{discount ? discount : 0} %</p></span>
                <span className="w-full flex justify-between"><p className="text-base ">Tax:</p><p className="text-lg font-bold">₹ 0</p></span>
                <span className="w-full flex justify-between"><p className="text-lg font-bold">Total:</p><p className="text-lg font-bold">₹ {subTotal ? (subTotal - (subTotal * discount / 100)) : 0}</p></span>
                <button onClick={order} className="w-[90%] rounded h-10 text-white bg-red-700">Check out</button>
            </div>
        </div>
    );
};
