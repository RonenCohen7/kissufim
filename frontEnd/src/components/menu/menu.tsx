import { IconButton } from "@mui/material";
import {
    FavoriteBorder,
    PersonOutlineOutlined,
    Search,
    ShoppingBagOutlined
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./menu.css";


export function Menu() {

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const changeLanguage = () => {
        i18n.changeLanguage(
            i18n.language === "he" ? "en" : "he"
        );
    };

    const goToProducts = () => {
        navigate("/products");
    };


    return (
        <header className="Menu">

            {/* Top Strip */}
            <div className="top-strip">
                {t("menu.shipping")}
            </div>


            {/* Main Header */}
            <div className="main-header">

                {/* Actions */}
                <div className="header-actions">

                    <button
                        className="language-button"
                        onClick={changeLanguage}
                    >
                        {i18n.language === "he" ? "EN" : "עברית"}
                    </button>

              


                    <IconButton
                        className="header-icon"
                        onClick={goToProducts}
                        aria-label={t("menu.search")}
                    >
                        <Search />
                    </IconButton>


                    <IconButton
                        className="header-icon"
                        aria-label={t("menu.wishlist")}
                    >
                        <FavoriteBorder />
                    </IconButton>


                    <IconButton
                        className="header-icon"
                        onClick={() => navigate("/login")}
                        aria-label={t("menu.account")}
                    >
                        <PersonOutlineOutlined />
                    </IconButton>


                    <IconButton
                        className="header-icon"
                        aria-label={t("menu.cart")}
                    >
                        <ShoppingBagOutlined />
                    </IconButton>

                </div>


                {/* Logo */}
                <div
                    className="brand"
                    onClick={() => navigate("/")}
                >

                    <div className="brand-name">
                        KISSUFIM
                    </div>

                    <div className="brand-hebrew">
                        כיסופים
                    </div>

                </div>


                <div className="header-spacer" />

            </div>


            {/* Navigation */}
            <nav className="main-navigation">

                <button onClick={goToProducts}>
                    {t("menu.naomi")}
                </button>

                <button onClick={goToProducts}>
                    {t("menu.new")}
                </button>

                <button onClick={goToProducts}>
                    {t("menu.necklaces")}
                </button>

                <button onClick={goToProducts}>
                    {t("menu.earrings")}
                </button>

                <button onClick={goToProducts}>
                    {t("menu.rings")}
                </button>

                <button onClick={goToProducts}>
                    {t("menu.bracelets")}
                </button>

                <button onClick={goToProducts}>
                    {t("menu.favorites")}
                </button>

                <button onClick={goToProducts}>
                    {t("menu.gifts")}
                </button>

            </nav>

        </header>
    );
}