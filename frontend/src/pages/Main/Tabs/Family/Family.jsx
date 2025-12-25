import "./Family.css";
import {ReactComponent as InviteIcon} from "../../../../assets/icons/people_add.svg";
import {ReactComponent as TrashIcon} from "../../../../assets/icons/trash.svg";
import {ReactComponent as FamilyIcon} from "../../../../assets/icons/family.svg";
import {ReactComponent as OwnerCrownIcon} from "../../../../assets/icons/owner_crown.svg";
import {ReactComponent as ArrowUpIcon} from "../../../../assets/icons/arrow_up.svg";
import {ReactComponent as ArrowDownIcon} from "../../../../assets/icons/arrow_down.svg";



function Family() {
	return (
		<div className="screen family">
			<header className="family-title">
				<div className="graphic">Graphic</div>
				<div className="line"></div>
				<div className="control-buttons">
					<div className="family-button invite">
						<InviteIcon className="icon" />
						Пригласить
					</div>
					<div className="family-button leave">
						<TrashIcon className="icon" />
						Выйти
					</div>
				</div>
			</header>
			<div className="family-parents">
				<header className="title">
					<FamilyIcon className="icon" />
					Родители
				</header>
				<div className="line"></div>
				<div className="users-container">
					<div className="user-container">
						<div className="user-info">
							<div className="avatar">
								А.
							</div>
							<div className="user-text">
								<span className="name">Александр</span>
								Отец
							</div>
							<div className="owner-icon-container">
								<OwnerCrownIcon className="icon" />
							</div>
						</div>
						<div className="finance-statistic">
							<div className="user-stat income">
								<ArrowUpIcon className="icon" />
								7 544 753,82 ₽
							</div>
							<div className="user-stat expenses">
								<ArrowDownIcon className="icon" />
								47 544 653,82 ₽
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Family;