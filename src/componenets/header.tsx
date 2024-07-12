import { AiOutlineUser } from "react-icons/ai"
import { BsHandbag } from "react-icons/bs"
import { CiSearch } from "react-icons/ci"
import { FaRegBell } from "react-icons/fa"
import { IoHeartOutline } from "react-icons/io5"
import logo from '../assets/logo.png'
interface headerProps {
    setCart: (value: boolean) => void,
    cart:boolean
}
export const Header:React.FC<headerProps> = ({ setCart,cart }) => {
    return (
        <>
            <div className="w-full flex flex-col gap-1 p-6">
                <div className="w-full   flex justify-between ">
                    <div className="flex flex-col w-28">
                     <img src={logo} alt="" className=""/>
                    </div>
                    <div className="flex gap-6 text-2xl">
                        <CiSearch className="bg-gray-300 rounded-full text-3xl p-1 cursor-pointer" />
                        <BsHandbag onClick={()=>setCart(!cart)} className="cursor-pointer" />
                        <FaRegBell className="cursor-pointer" />
                        <IoHeartOutline className="cursor-pointer" />
                        <AiOutlineUser className="cursor-pointer" />
                    </div>
                </div>
                <div className="flex h-12  w-full border-b border-t  border-black/50 gap-24 justify-center items-center text-base font-semibold">
                   <span>BABIES</span>
                   <span>BOYS</span>
                   <span>GIRLS</span>
                </div>
            </div>
        </>
    )
}