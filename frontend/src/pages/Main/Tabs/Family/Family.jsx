import "./Family.css";
import {ReactComponent as InviteIcon} from "../../../../assets/icons/people_add.svg";
import {ReactComponent as TrashIcon} from "../../../../assets/icons/trash.svg";
import {ReactComponent as LogoutIcon} from "../../../../assets/icons/logout.svg";
import {ReactComponent as OwnerCrownIcon} from "../../../../assets/icons/owner_crown.svg";
import {ReactComponent as ArrowUpIcon} from "../../../../assets/icons/arrow_up.svg";
import {ReactComponent as ArrowDownIcon} from "../../../../assets/icons/arrow_down.svg";
import {useState} from "react";



function Family() {
	const [selectUserId, setSelectUserId] = useState(0);

	const ownerId = 104;
	const members = [
		{
			id: 104,
			name: "Александр",
			role: "Владелец",
			avatar: "orange",
			totals: {
				income: "7 544 753,82 ₽",
				expenses: "47 544 653,82 ₽"
			}
		},
		{
			id: 108,
			name: "Ольга",
			role: "Мать",
			avatar: "purple",
			totals: {
				income: "8 782,94 ₽",
				expenses: "42 843,04 ₽"
			}
		}
	]

	let membersList = []

	for (const member of members) {
		let position = "";
		if (membersList.length === 0) {
			position = "first";
		}
		if (membersList.length === member.length - 1) {
			position += "last";
		}
		membersList.push(
			{
				id: member.id,
				name: member.name,
				role: member.role,
				avatar: member.avatar,
				totals: member.totals,
				position: position
			}
		);
	}

	const ClickHandle = (memberId) => {
		if (selectUserId !== memberId) {
			setSelectUserId(memberId);
		} else {
			setSelectUserId(0);
		}
	}

	return (
		<>
			<div className="screen family">

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

				<div className="family-members">
					{membersList.map((member) => (
						<div className={`user-container ${member.position}`}>
							<div
								className="user-info"
								onClick={() => ClickHandle(member.id)}
							>
								<div className={`avatar ${member.avatar}`}>{member.name[0]}</div>
								<div className="user-text">
									<span className="name">{member.name}</span>
									{member.role}
								</div>
								{ownerId === member.id &&
									<div className="owner-icon-container">
										<OwnerCrownIcon className="icon"/>
									</div>
								}
							</div>
							<div
								className="finance-statistic"
								onClick={() => ClickHandle(member.id)}
							>
								<div className="user-stat income">
									<ArrowUpIcon className="icon" />
									{member.totals.income}
								</div>
								<div className="user-stat expenses">
									<ArrowDownIcon className="icon" />
									{member.totals.expenses}
								</div>
							</div>
							<div className={`button-delete-user ${member.id === selectUserId ? "" : "hide"}`}>
								<LogoutIcon className="icon"/>
								Выгнать
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="confirmation-window">
				<div className="background"></div>
				<div className="confirmation-container"></div>
			</div>
		</>
	)
}

export default Family;