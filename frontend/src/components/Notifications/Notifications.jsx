import "./Notifications.css"
import {ReactComponent as SuccessIcon} from "../../assets/icons/success_load.svg";
import {useEffect, useState} from "react";


function Notification({ data }) {
	const [isVisible, setIsVisible] = useState(false);
	const [cycleCount, setCycleCount] = useState(0);

	// Настройки времени (в миллисекундах)
	const SHOW_TIME = 2000; // Показывать 2 секунды
	const HIDE_TIME = 1000; // Скрывать 1 секунду
	const MAX_CYCLES = 5; // Максимальное количество циклов

	useEffect(() => {
		if (cycleCount >= MAX_CYCLES) return;

		const showTimer = setTimeout(() => {
			setIsVisible(true);
			setCycleCount(prev => prev + 1);
		}, HIDE_TIME);

		const hideTimer = setTimeout(() => {
			setIsVisible(false);
		}, HIDE_TIME + SHOW_TIME);

		return () => {
			clearTimeout(showTimer);
			clearTimeout(hideTimer);
		};
	}, [cycleCount]);


	return (
		<>
			{ isVisible &&
				<div className={`notification ${data.type}`}>
					<div className="content">
						<div className="icon-container">
							<SuccessIcon className="icon"/>
						</div>
						{data.text}
						{cycleCount >= MAX_CYCLES && <>ААА</>}
					</div>
					<div className="to-end-progress-bar">
						<div className="progress"></div>
					</div>
				</div>
			}
		</>
	)
}


function Notifications({ notifications }) {
	return (
		<div className="notifications-container">
			{notifications.map((data, index) => (
				<Notification key={index} data={data} />
			))}
		</div>
	)
}

export default Notifications;