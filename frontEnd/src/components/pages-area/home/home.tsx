import { Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./home.css";

import gpt1 from "../../../assets/images/gpt1.jpeg";
import gpt3 from "../../../assets/images/gpt3.jpeg";
import gpt5 from "../../../assets/images/gpt5.jpeg";
import gpt8 from "../../../assets/images/gpt8.png";
import gpt9 from "../../../assets/images/gpt9.png";


export function Home() {

    const navigate = useNavigate();
    const { t } = useTranslation();


    const stories = [
        {
            id: "memory",
            text: t("home.stories.memory"),
            image: gpt1
        },
        {
            id: "close",
            text: t("home.stories.close"),
            image: gpt3
        },
        {
            id: "moment",
            text: t("home.stories.moment"),
            image: gpt8
        },
        {
            id: "touch",
            text: t("home.stories.touch"),
            image: gpt9
        }
    ];


    const goToProducts = () => {
        navigate("/products");
    };


    return (
        <div className="Home">

            {/* Hero */}
            <section className="hero-section">

                <Container maxWidth="xl">

                    <Grid
                        container
                        spacing={5}
                        className="hero-grid"
                    >

                        {/* Hero Content */}
                        <Grid size={{ xs: 12, md: 6 }}>

                            <div className="hero-content">

                                <Typography
                                    variant="overline"
                                    className="hero-overline"
                                >
                                    {t("home.hero.overline")}
                                </Typography>


                                <Typography
                                    variant="h2"
                                    component="h1"
                                    className="hero-title"
                                >
                                    {t("home.hero.titleLine1")}

                                    <br />

                                    {t("home.hero.titleLine2")}
                                </Typography>


                                <Typography
                                    variant="body1"
                                    className="hero-description"
                                >
                                    {t("home.hero.descriptionLine1")}

                                    <br />

                                    {t("home.hero.descriptionLine2")}
                                </Typography>


                                <Button
                                    variant="contained"
                                    size="large"
                                    className="hero-button"
                                    onClick={goToProducts}
                                >
                                    {t("home.hero.button")}
                                </Button>

                            </div>

                        </Grid>


                        {/* Hero Image */}
                        <Grid size={{ xs: 12, md: 6 }}>

                            <div className="hero-image">

                                <img
                                    src={gpt5}
                                    alt={t("home.hero.imageAlt")}
                                />

                            </div>

                        </Grid>

                    </Grid>

                </Container>

            </section>


            {/* Longing Stories */}
            <section className="categories-section">

                <Container maxWidth="xl">

                    <Typography
                        variant="h4"
                        className="categories-title"
                    >
                        {t("home.stories.title")}
                    </Typography>


                    <Typography
                        className="categories-subtitle"
                    >
                        {t("home.stories.subtitle")}
                    </Typography>


                    <Grid
                        container
                        spacing={3}
                    >

                        {stories.map((story) => (

                            <Grid
                                key={story.id}
                                size={{
                                    xs: 12,
                                    sm: 6,
                                    md: 3
                                }}
                            >

                                <div
                                    className="category-card"
                                    onClick={goToProducts}
                                >

                                    <div className="category-image">

                                        <img
                                            src={story.image}
                                            alt={story.text}
                                        />

                                    </div>


                                    <Typography
                                        variant="h6"
                                        className="category-title"
                                    >
                                        {story.text}
                                    </Typography>

                                </div>

                            </Grid>

                        ))}

                    </Grid>

                </Container>

            </section>


            {/* Brand Story */}
            <section
                className="story-section"
                id="story"
            >

                <Container maxWidth="md">

                    <div className="story-content">

                        <Typography
                            variant="overline"
                            className="story-overline"
                        >
                            {t("home.story.overline")}
                        </Typography>


                        <Typography
                            variant="h4"
                            className="story-title"
                        >
                            {t("home.story.title")}
                        </Typography>


                        <Typography
                            className="story-description"
                        >
                            {t("home.story.description")}
                        </Typography>

                    </div>

                </Container>

            </section>

        </div>
    );
}