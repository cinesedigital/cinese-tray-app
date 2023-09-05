import Logo from "./Logo";
import SessionButton from "./SessionButton";

function Header(){
    return (
        <header className="w-full px-5 py-5 justify-between flex items-center">
            <Logo />
            <SessionButton />
        </header>
    )
}

export default Header;