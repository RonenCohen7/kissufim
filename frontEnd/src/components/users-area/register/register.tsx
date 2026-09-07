import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { authService } from "../../../service/auth-service";

import "./register.css";


export function Register() {

    const navigate = useNavigate();
    const { t } = useTranslation();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");


    const register = async () => {

        try {

            setError("");

            await authService.register({
                firstName,
                lastName,
                email,
                phone,
                city,
                address,
                password
            });

            navigate("/login");

        }
        catch (err: any) {

            setError(
                err.response?.data?.error ||
                t("auth.register.error")
            );

        }

    };


    return (
        <div className="Register">

            <div className="register-card">

                <div className="register-header">

                    <Typography
                        variant="overline"
                        className="register-brand"
                    >
                        KISUUFIM
                    </Typography>

                    <Typography
                        variant="h4"
                        component="h1"
                        className="register-title"
                    >
                        {t("auth.register.title")}
                    </Typography>

                    <Typography className="register-subtitle">
                        {t("auth.register.subtitle")}
                    </Typography>

                </div>


                <div className="register-form">

                    <div className="register-row">

                        <TextField
                            fullWidth
                            label={t("auth.register.firstName")}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            label={t("auth.register.lastName")}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                    </div>


                    <TextField
                        fullWidth
                        type="email"
                        label={t("auth.register.email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />


                    <TextField
                        fullWidth
                        label={t("auth.register.phone")}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />


                    <div className="register-row">

                        <TextField
                            fullWidth
                            label={t("auth.register.city")}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            label={t("auth.register.address")}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                    </div>


                    <TextField
                        fullWidth
                        type="password"
                        label={t("auth.register.password")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />


                    {error && (
                        <Typography className="register-error">
                            {error}
                        </Typography>
                    )}


                    <Button
                        fullWidth
                        variant="contained"
                        className="register-button"
                        onClick={register}
                    >
                        {t("auth.register.button")}
                    </Button>

                </div>


                <div className="register-footer">

                    <Typography className="register-footer-text">
                        {t("auth.register.haveAccount")}
                    </Typography>

                    <button
                        type="button"
                        className="register-login-link"
                        onClick={() => navigate("/login")}
                    >
                        {t("auth.register.login")}
                    </button>

                </div>

            </div>

        </div>
    );
}