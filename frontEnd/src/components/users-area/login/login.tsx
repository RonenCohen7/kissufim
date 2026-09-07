import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { authService } from "../../../service/auth-service";

import "./login.css";


export function Login() {

    const navigate = useNavigate();
    const { t } = useTranslation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const login = async () => {

        try {

            setError("");

            const token = await authService.login({
                email,
                password
            });

            localStorage.setItem("token", token);

            navigate("/products");

        }
        catch (err: any) {

            setError(
                err.response?.data?.error ||
                t("auth.login.error")
            );

        }

    };


    return (
        <div className="Login">

            <div className="login-card">

                <div className="login-header">

                    <Typography
                        variant="overline"
                        className="login-brand"
                    >
                        KISUUFIM
                    </Typography>

                    <Typography
                        variant="h4"
                        component="h1"
                        className="login-title"
                    >
                        {t("auth.login.title")}
                    </Typography>

                    <Typography className="login-subtitle">
                        {t("auth.login.subtitle")}
                    </Typography>

                </div>


                <div className="login-form">

                    <TextField
                        fullWidth
                        type="email"
                        label={t("auth.login.email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        fullWidth
                        type="password"
                        label={t("auth.login.password")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />


                    {error && (
                        <Typography className="login-error">
                            {error}
                        </Typography>
                    )}


                    <Button
                        fullWidth
                        variant="contained"
                        className="login-button"
                        onClick={login}
                    >
                        {t("auth.login.button")}
                    </Button>

                </div>


                <div className="login-footer">

                    <Typography className="login-footer-text">
                        {t("auth.login.noAccount")}
                    </Typography>

                    <button
                        type="button"
                        className="login-register-link"
                        onClick={() => navigate("/register")}
                    >
                        {t("auth.login.register")}
                    </button>

                </div>

            </div>

        </div>
    );
}