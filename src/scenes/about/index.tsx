import { useTranslation } from "react-i18next";

function About() {
    const { t } = useTranslation();
    return (
        <>
        About
        {t('aboutPage.date', { date: new Date()})}
        </>
    )
}

export default About;