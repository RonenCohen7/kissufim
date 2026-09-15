import { useTranslation } from "react-i18next";

import "./noami-page.css";

import noami from "../../../assets/images/noami.jpg";

export function NoamiPage() {

    const { t } = useTranslation();

    return (
        <div className="NoamiPage">

            <section className="noami-page-content">

                <div className="noami-text">

                    <span className="noami-overline">
                        {t("noami.overline")}
                    </span>

                    <h1>
                        {t("noami.title")}
                    </h1>

                    <strong>
                        {t("noami.subtitle")}
                    </strong>

                    <p>
                        {t("noami.description")}
                    </p>

                </div>

                <div className="noami-image-wrapper">

                    <img
                        className="noami-image"
                        src={noami}
                        alt={t("noami.title")}
                    />

                </div>

            </section>

        </div>
    );
}