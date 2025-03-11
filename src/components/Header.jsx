import { Link } from "react-router-dom";
export default function Header() {

    return (
        <header>
            <nav style={{display: "flex", gap: "20px"}}>
                <p>
                    <Link to="">Home</Link>
                </p>
                <p>
                    <Link to="first">Spil anbefaler</Link>
                </p>
                <p>
                    <Link to="second">Energidrik Udvægler</Link>
                </p>
            </nav>
        </header>
    )
}