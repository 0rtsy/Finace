import "./Notifications.css"
import {ReactComponent as SuccessIcon} from "../../assets/icons/success_load.svg";
import {useEffect} from "react";


function Notification({ data }) {
	// const [isVisible, setIsVisible] = useState(false);
	// const [cycleCount, setCycleCount] = useState(0);

	// const SHOW_TIME = 2000;
	// const HIDE_TIME = 1000;
	// const MAX_CYCLES = 5;

	// useEffect(() => {
	// 	if (cycleCount >= MAX_CYCLES) return;
	// 	const showTimer = setTimeout(() => {
	// 		// setIsVisible(true);
	// 		setCycleCount(prev => prev + 1);
	// 	}, HIDE_TIME);
	// 	const hideTimer = setTimeout(() => {
	// 		// setIsVisible(false);
	// 	}, SHOW_TIME + HIDE_TIME);
	//
	// 	return () => {
	// 		clearTimeout(showTimer);
	// 		clearTimeout(hideTimer);
	// 	};
	// }, [cycleCount]);
	//
	// if (cycleCount === MAX_CYCLES) {
	// 	deleteNotification();
	// }

	return (
		<div className={`notification ${data.type}`}> {/*${cycleCount >= 4 ? "hide" : ""}*/}
			<div className="content">
				<div className="icon-container">
					<SuccessIcon className="icon"/>
				</div>
				{data.text}
			</div>
			<div className="to-end-progress-bar">
				<div className="progress"></div>
			</div>
		</div>
	)
}


function Notifications({ notification, deleteNotification }) {

	useEffect(() => {
		if (notification !== undefined) {
			setTimeout(() => {
				deleteNotification();
			}, 5500)
		}
	}, [notification, deleteNotification]);

	return (
		<div className="notifications-container">
			{notification !== undefined && <Notification data={notification} />}
		</div>
	)
}

export default Notifications;