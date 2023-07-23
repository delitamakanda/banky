import { useTranslation } from "react-i18next";
import { DateTime } from 'luxon';

const getGreetingTime = () => {
    const d = DateTime.now();
	const split_afternoon = 12; // 24hr time to split the afternoon
	const split_evening = 17; // 24hr time to split the evening
	const currentHour = parseFloat(d.toFormat('dd'));
	
	if (currentHour >= split_afternoon && currentHour <= split_evening) {
		return 'afternoon';
	} else if (currentHour >= split_evening) {
		return 'evening';
  }
	return 'morning';
}

const About = () => {
    const { t } = useTranslation();
    return (
        <>
        About
        {t('aboutPage.date', { date: new Date(), context: getGreetingTime()})}
        </>
    )
}

export default About;