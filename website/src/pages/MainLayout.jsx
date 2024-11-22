import { Outlet, useNavigate } from "react-router-dom";
import NavBarButton from "../components/NavBarButton";
import { useAuth } from "../context/AuthContext.jsx";
import { LuLogOut, LuMapPin } from "react-icons/lu";

function MainLayout() {
    const { isAuthenticated, userInfo, logout } = useAuth();
    const navigate = useNavigate();
    console.log(userInfo);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className='bg-zinc-800 text-white flex'>
            <div className='w-fit flex-col h-screen py-4 rounded-e-2xl overflow-y-auto pb-32'>
                <div>
                    <img src="src/assets/box-svgrepo-com.svg" alt="logo" className="w-24 h-24 m-auto" />
                    <h1 className='text-2xl font-bold p-4 pt-0 text-center'>Wide World<br/>Importers</h1>
                </div>
                <div className='flex flex-col gap-2 p-4'>
                    {
                        userInfo?.Role === 1 &&
                        <div className="flex flex-col gap-2">
                            <NavBarButton text='Home' to='/home' />
                            <NavBarButton text='Clientes' to='/customers' />
                            <NavBarButton text='Proveedores' to='/suppliers' />
                            <NavBarButton text='Inventario' to='/inventory'/>
                            <NavBarButton text='Ventas' to='/orders' />
                        </div>
                    }
                    {
                        userInfo?.Role === 2 &&
                        <NavBarButton text='Estadisticas' to='statistics' />
                            
                    }
                </div>
                <div className='absolute flex flex-col gap-2 p-4 text-sm bottom-0 bg-zinc-800'>
                    <hr className='border-zinc-600' />
                    <p className='m-0'>{userInfo?.FullName}</p>
                    <p className='-mt-3 text-xs'>{userInfo?.Email}</p>
                    <p className='m-0'><LuMapPin className="inline-block pb-0.5"/> {userInfo?.Location}</p>

                    <button onClick={handleLogout} className='bg-red-500 p-2 rounded-xl text-white'>
                        <LuLogOut className='inline-block mr-1 pb-1 text-xl' />
                        Cerrar sesión
                    </button>
                </div>
            </div>
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;