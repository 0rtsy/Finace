import "./Notifications.css"
import {ReactComponent as SuccessIcon} from "../../assets/icons/success_load.svg";
import {useEffect, useState} from "react";


function Notification({ data, deleteNotification }) {
	// const [isVisible, setIsVisible] = useState(false);
	const [cycleCount, setCycleCount] = useState(0);

	const SHOW_TIME = 2000;
	const HIDE_TIME = 1000;
	const MAX_CYCLES = 5;

	useEffect(() => {
		if (cycleCount >= MAX_CYCLES) return;
		const showTimer = setTimeout(() => {
			// setIsVisible(true);
			setCycleCount(prev => prev + 1);
		}, HIDE_TIME);
		const hideTimer = setTimeout(() => {
			// setIsVisible(false);
		}, SHOW_TIME + HIDE_TIME);

		return () => {
			clearTimeout(showTimer);
			clearTimeout(hideTimer);
		};
	}, [cycleCount]);

	if (cycleCount === MAX_CYCLES) {
		deleteNotification(data.id);
	}

	return (
		<>
			{ !(cycleCount >= MAX_CYCLES) &&
				<div className={`notification ${data.type} ${cycleCount >= 4 ? "hide" : ""}`}>
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


function Notifications({ notifications, deleteNotification }) {
	return (
		<div className="notifications-container">
			{notifications.map((data, index) => (
				<Notification key={index} data={data} deleteNotification={deleteNotification} />
			))}
		</div>
	)
}

export default Notifications;