import { useTranslation } from "react-i18next";
import "./footer.css";

export function Footer() {

    const { t } = useTranslation();

    return (
        <footer className="Footer">

            <div className="footer-main">

                <div className="footer-brand">
                    <div className="footer-logo">
                        KISSUFIM
                    </div>

                    <div className="footer-hebrew">
                        כיסופים
                    </div>
                </div>

                <div className="footer-message">
                    {t("footer.message")}
                </div>

            </div>

            <div className="footer-bottom">

                <span>
                    © {new Date().getFullYear()} KISSUFIM
                </span>

                <span className="footer-credit">
                    {t("footer.developedBy")}{" "}

                    <a
                        href="https://ronencohen.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ronen Cohen
                    </a>
                </span>

            </div>

        </footer>
    );
}