import { Footer } from "../footer/footer";
import { Menu } from "../menu/menu";
import { Routing } from "../routing/routing";
import "./layout.css";

export function Layout() {
    return (
        <div className="Layout">

			<header>
                <Menu />
            </header>

            <main>
                <Routing/>
            </main>
            
            <Footer />

        </div>
    );
}
