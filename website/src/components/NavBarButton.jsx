import { NavLink } from 'react-router-dom';

function NavBarButton({text, to}) {
    // using the tools from react router dom, we can create a button that will navigate to a different page
    return (
        <NavLink
            to={to} 
            className={({ isActive }) => 
                isActive 
                    ? "px-4 py-2 bg-sky-500 rounded-xl text-black w-full hover:bg-sky-400" 
                    : "px-4 py-2 bg-inherit rounded-xl w-fit hover:text-sky-500"
            }
        >
            {text}
        </NavLink>
    )
}

export default NavBarButton;