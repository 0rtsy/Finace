import "./Home.css"

import MonthlyResults from "../../../../components/Home/MonthlyResults/MonthlyResults";
import ValueLoading from "../../../../components/ValueLoading/ValueLoading";

function Home({ familyData }) {
	return (
		<div className="screen home">
			<div className="home-title">
				<div className="family-financial-situation">
					<span className="title">Общее финансовое положение семьи</span>
					<span className="value">
						{familyData.overallBalance === undefined
							? <ValueLoading width="70%" height="24px"/>
							: familyData.overallBalance}
					</span>
				</div>
			</div>
			<div className="content">
				<MonthlyResults forMonth={familyData.forMonth} />
			</div>
		</div>
	)
}

export default Home;