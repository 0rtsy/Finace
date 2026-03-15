import "./Family.css";
import {ReactComponent as InviteIcon} from "../../../../assets/icons/people_add.svg";
import {ReactComponent as TrashIcon} from "../../../../assets/icons/trash.svg";
import {ReactComponent as LogoutIcon} from "../../../../assets/icons/logout.svg";
import {ReactComponent as OwnerCrownIcon} from "../../../../assets/icons/owner_crown.svg";
import {ReactComponent as ArrowUpIcon} from "../../../../assets/icons/arrow_up.svg";
import {ReactComponent as ArrowDownIcon} from "../../../../assets/icons/arrow_down.svg";
import {ReactComponent as SuccessIcon} from "../../../../assets/icons/success_load.svg";
import {ReactComponent as CopyIcon} from "../../../../assets/icons/copy_icon.svg";
import {useState} from "react";
import ValueLoading from "../../../../components/ValueLoading/ValueLoading";
import familyApi from "../../../../api/familyApi";
import useLoadFamilyData from "../../../../hooks/useLoadFamilyData";
import {useNavigate} from "react-router";



function Family({ familyData, user, createNewNotification, updateFamilyData, clearAllData }) {
	const [selectUserId, setSelectUserId] = useState(0);
	const [confirmationData, setConfirmationData] = useState({
		type: null,
		isHide: true,
		data: null
	});

	const clickHandle = (memberId) => {
		if (
			user.id === familyData.ownerId
			&& memberId !== familyData.ownerId
		) {
			if (selectUserId !== memberId) {
				setSelectUserId(memberId);
			} else {
				setSelectUserId(0);
			}
		}
	}

	const hideConfirmationWindow = () => {
		setConfirmationData({
			type: confirmationData.type,
			isHide: true,
			data: confirmationData.data
		});
		setTimeout(() => setConfirmationData({
			type: null,
			isHide: true,
			data: null
		}), 200)
	}

	const showConfirmationWindow = (type, data) => {
		setConfirmationData({
			type: type,
			isHide: false,
			data: data
		})
	}

	return (
		<>
			<div className="screen family">
				<div className="control-buttons">
					{familyData.ownerId === undefined
						? <>
								<ValueLoading height="91px" width="100%"/>
								<ValueLoading height="91px" width="100%"/>
							</>
						: <>
								{user.id === familyData.ownerId &&
									<div
										className="family-button invite"
										onClick={() => showConfirmationWindow(
											"inviteCode",
											familyData.inviteCode
										)}
									>
										<InviteIcon className="icon"/>
										Пригласить
									</div>
								}
								<div
									className="family-button leave"
									onClick={() => showConfirmationWindow(
										"leave",
										user.id === familyData.ownerId
									)}
								>
									<TrashIcon className="icon" />
									Выйти
								</div>
							</>
					}

				</div>

				<div className="family-members">
					{familyData.members === undefined
						? <>
								<ValueLoading height="98px"/>
								<ValueLoading height="98px"/>
								<ValueLoading height="98px"/>
							</>
						: familyData.members.map((member, index) => (
						<div className="user-container" key={index}>
							<div
								className="user-info"
								onClick={() => clickHandle(member.id)}
							>
								<div className={`avatar ${member.avatar}`}>{member.name[0]}</div>
								<div className="user-text">
									<span className="name">{member.id === user.id ? 'Вы' : member.name}</span>
									{member.role}
								</div>
								{familyData.ownerId === member.id &&
									<div className="owner-icon-container">
										<OwnerCrownIcon className="icon"/>
									</div>
								}
							</div>
							<div
								className="finance-statistic"
								onClick={() => clickHandle(member.id)}
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
							<div
								className={`button-delete-user ${member.id === selectUserId ? "" : "hide"}`}
								onClick={() => showConfirmationWindow(
									"kickUser",
									{
										id: member.id,
										name: member.name
									}
								)}
							>
								<LogoutIcon className="icon"/>
								Выгнать
							</div>
						</div>
					))}
				</div>
			</div>
			<div className={`family-confirmation-window ${confirmationData.isHide ? "hide" : ""}`}>
				<div
					className="background"
					onClick={() => hideConfirmationWindow()}
				></div>
				{confirmationData.type === "kickUser" && <ConfirmationMemberKick
					confirmationData={confirmationData}
					hideConfirmationWindow={hideConfirmationWindow}
					createNewNotification={createNewNotification}
					updateFamilyData={updateFamilyData}
				/>}
				{confirmationData.type === "leave" && <ConfirmationLeaveFamily
					confirmationData={confirmationData}
					hideConfirmationWindow={hideConfirmationWindow}
					createNewNotification={createNewNotification}
					clearAllData={clearAllData}
				/>}
				{confirmationData.type === "inviteCode" && <CopyInviteCode
					confirmationData={confirmationData}
					hideConfirmationWindow={hideConfirmationWindow}
				/>}
			</div>
		</>
	)
}



function ConfirmationMemberKick({ confirmationData, hideConfirmationWindow, createNewNotification, updateFamilyData }) {
	const loadFamilyData = useLoadFamilyData(updateFamilyData, false);

	const clickHandle = async () => {
		const answer = await familyApi.kickMember(confirmationData.data.id);

		if (!answer.status) {
			createNewNotification("error", answer.msg);
			hideConfirmationWindow();
		} else {
			loadFamilyData();
			createNewNotification("success", answer.msg);
			hideConfirmationWindow();
		}
	}

	return (
			<div className="confirmation-container">
				<div className="title">
					Вы уверены, что хотите исключить пользователя <span className="name">{confirmationData.data.name}</span> из семьи?
				</div>
				<div className="buttons-container">
					<div
						className="cw-button cancel"
						onClick={() => hideConfirmationWindow()}
					>Отмена</div>
					<div
						className="cw-button confirm"
						onClick={() => clickHandle()}
					>Исключить</div>
				</div>
			</div>
	)
}


function ConfirmationLeaveFamily({ confirmationData, hideConfirmationWindow, createNewNotification, clearAllData }) {
	const navigate = useNavigate();

	const clickHandle = async () => {
		const answer = await familyApi.leave();

		if (!answer.status) {
			createNewNotification("error", answer.msg);
			hideConfirmationWindow();
		} else {
			createNewNotification("success", "Вы успешно покинули семью!");
			hideConfirmationWindow();
			clearAllData();
			navigate("/family", {replace: true});
		}
	}

	return (
		<div className="confirmation-container">
			<div className="title">
				Вы уверены, что хотите выйти из семьи?
				{confirmationData.data
					? <div className="warning">Семья будет удалена, и все члены семьи останутся без семьи</div>
					: ""
				}
			</div>
			<div className="buttons-container">
				<div
					className="cw-button cancel"
					onClick={() => hideConfirmationWindow()}
				>Отмена</div>
				<div
					className="cw-button confirm"
					onClick={() => clickHandle()}
				>Выйти</div>
			</div>
		</div>
	)
}


function CopyInviteCode({ confirmationData, hideConfirmationWindow }) {
	const [isCopied, setCopied] = useState(false);
	const clickHandle = async () => {
		await navigator.clipboard.writeText(confirmationData.data);
		setCopied(true);
	}

	return (
		<div className="confirmation-container">
			<div className="title">Скопируйте код приглашения и поделитесь им с родными!</div>
			<div className="invite-code-container" onClick={() => clickHandle()}>
				<div className="invite-code">{confirmationData.data}</div>
				<div className={`copy-button${isCopied ? " success" : ""}`}>
					{isCopied
						? <SuccessIcon className="icon"/>
						: <CopyIcon className="icon"/>
					}
				</div>
			</div>
			<div className="buttons-container">
				<div className="cw-button" onClick={() => hideConfirmationWindow()}>Закрыть</div>
			</div>
		</div>
	)
}


export default Family;