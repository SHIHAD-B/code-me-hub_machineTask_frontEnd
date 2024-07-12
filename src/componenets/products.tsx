import { IoHeartOutline, IoOptionsOutline } from "react-icons/io5"

import { FaStar } from "react-icons/fa"
import { BsHandbag } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { useEffect } from "react"
import { listProduct } from "../redux/actions/actions"
import axios from "axios"
import { BASE_URL } from "../config/constants"
import { toast } from "react-toastify"

interface ProductsProps {
    setCart: (value: boolean) => void,
    cart:boolean
}

export const Products: React.FC<ProductsProps> = ({ setCart,cart }) => {
    const dispatch = useDispatch<AppDispatch>()
    const { product } = useSelector((state: RootState) => state.product)
    const { data } = useSelector((state: RootState) => state.cart)

    useEffect(() => {
        dispatch(listProduct())
    }, [dispatch])

    const likeProduct = async (id: string) => {
        const likes = await axios.patch(`${BASE_URL}api/likeproduct`, { id }, { withCredentials: true })
        if (likes?.data?.success) {
            dispatch(listProduct())
        }
    }

    const addToCart = async (id: string) => {
        if (Array.isArray(data) && data.some((item: any) => item.productId._id === id)) {
            toast.error('Product already in the cart', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        const added = await axios.post(`${BASE_URL}api/addtocart`, { productId:id, quantity: 1 })
        if (added?.data?.success) {
            setCart(!cart)
        }
    }

    return (
        <>
            <div className="w-full p-6 flex flex-col">
                <div className="w-full flex gap-12">
                    <span className="text-5xl text-gray-700">Our Top Categories</span>
                    <div className="flex gap-4 justify-center items-center cursor-pointer">
                        <span>Sorted By:</span>
                        <span className="p-0.5 flex gap-1 border border-black/50 rounded justify-center items-center">All Categories <IoOptionsOutline /></span>
                    </div>

                </div>
                <div className="w-full grid sm:grid-cols-2 md:grid-cols-5 mt-4 justify-center">
                    {
                        Array.isArray(product) ? product.map((item, index) => (
                            <div key={index} className="flex p-4 mb-4 relative flex-col border border-black/50 h-[420px] rounded shadow-sm items-center gap-2 w-[260px] pt-2">
                                <IoHeartOutline onClick={() => likeProduct(String(item._id))} className={`absolute top-4 right-8 text-3xl cursor-pointer ${item.liked ? "text-red-500" : ""}`} />
                                <img src={`src${item.image}`} alt={item.name} className="w-[80%] flex" />
                                <span className="text-xl font-bold w-full pl-6">{item.name}</span>
                                <p className="w-[80%]">{item.description}</p>
                                <span className="w-[80%] text-lg font-bold flex items-center justify-between">
                                    Rs.{item.price}/-
                                    <FaStar className="text-sm text-yellow-300" />
                                    <FaStar className="text-sm text-yellow-300" />
                                    <FaStar className="text-sm text-yellow-300" />
                                    <FaStar className="text-sm text-yellow-300" />
                                    <FaStar className="text-sm text-yellow-300" />
                                </span>
                                <button onClick={()=>addToCart(item._id)} className="w-[90%] flex items-center justify-center gap-2 rounded bg-red-700 p-2 text-white">
                                    <BsHandbag />Add To Cart
                                </button>
                            </div>
                        )) : (
                            <>
                                <span>No Products Available</span>
                            </>
                        )
                    }


                </div>

            </div>
        </>
    )
}