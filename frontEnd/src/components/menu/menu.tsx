import { IconButton } from "@mui/material";
import {
    FavoriteBorder,
    PersonOutlineOutlined,
    Search,
    ShoppingBagOutlined
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./menu.css";
import { useEffect, useState } from "react";

import { authService } from "../../service/auth-service";
import type { userModel } from "../../models/user-model";



export function Menu() {

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const location = useLocation();

    const [user, setUser] = useState<userModel | null>(null);

    const changeLanguage = () => {
        i18n.changeLanguage(
            i18n.language === "he" ? "en" : "he"
        );
    };

    const goToProducts = () => {
        navigate("/products");
    };

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
        navigate("/")
    }

    useEffect(() => {

        const token = localStorage.getItem("token")
        if (!token) {
            setUser(null)
            return;
        }

        authService
            .getCurrentUser(token)
            .then(currentUser => {
                setUser(currentUser)
            })
            .catch(() => {
                localStorage.removeItem("token")
                setUser(null)
            })

    }, [location.pathname]);



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

                    {/* Logged user */}

                    {user && (
                        <div className="logged-user-area">

                            <span className="logged-user-name">
                                {t("menu.helloUser", {
                                    name: user.firstName
                                })}
                            </span>

                            <button className="logout-button"
                                onClick={logout}>
                                {t("menu.logout")}

                            </button>

                        </div>

                    )}

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
                        {t("menu.KISSUFIM")}
                    </div>

                    <div className="brand-hebrew">
                        {t("menu.KISSUFIM")}
                    </div>

                </div>


                <div className="header-spacer" />

            </div>


            {/* Navigation */}
            <nav className="main-navigation">

                {/* Admin only*/}

                {user?.role === "admin" && (

                    <button onClick={() => navigate("/product/add")}>
                        {t("menu.addProduct")}
                    </button>


                )}

                {/* <button onClick={goToProducts}>
                    {t("menu.new")}
                </button> */}

                <button onClick={() => navigate("/noami-page")}>
                    {t("menu.naomi")}
                </button>



                <button onClick={goToProducts}>
                    {t("menu.necklaces")}
                </button>
                {/* 
                <button onClick={goToProducts}>
                    {t("menu.earrings")}
                </button> */}

                {/* <button onClick={goToProducts}>
                    {t("menu.rings")}
                </button> */}

                {/* <button onClick={goToProducts}>
                    {t("menu.bracelets")}
                </button> */}

                <button onClick={goToProducts}>
                    {t("menu.favorites")}
                </button>

                {/* <button onClick={goToProducts}>
                    {t("menu.gifts")}
                </button> */}

            </nav>

        </header>
    );
}