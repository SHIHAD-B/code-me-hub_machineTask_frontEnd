import { useState } from "react"
import { Carousel } from "../componenets/corousel"
import { Header } from "../componenets/header"
import { Products } from "../componenets/products"
import { Cart } from "../componenets/cart"

export const Home = () => {
    const [cart,setCart]=useState(false)
    return (
        <>
            <div className="w-full flex flex-col">
                {cart&&(<>
                <div className="fixed top-0 left-0 w-screen h-full bg-black opacity-50 z-10"></div>
                </>)}
                <Header setCart={setCart} cart={cart}/>
                <Carousel/>
                <Products setCart={setCart} cart={cart}/>
                {cart&&<Cart setCart={setCart}/>}
            </div>
        </>
    )
}