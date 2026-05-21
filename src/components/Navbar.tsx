import { Link } from "react-router-dom";


export default function Navbar() {
    return (
        <nav className="bg-surface p-4 flex gap-6">
            <NavbarLink to="/" children="Home" />
        </nav>
    );
}

function NavbarLink({ to, children }: { to: string; children: React.ReactNode }) {
    return (
        <Link to={to} className="hover:text-blue-400 text-text">
            {children}
        </Link>
    )
}
