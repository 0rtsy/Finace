import "./CreateFamily.css"
import {Link, useNavigate} from "react-router";
import {ReactComponent as ArrowIcon} from "../../../assets/icons/keyboard_arrow_down.svg";
import {useState} from "react";
import familyApi from "../../../api/familyApi";


function CreateFamily({ isFamilyCreating, setIsFamilyCreating }) {
	const [title, setTitle] = useState(null);
	const [isPencilGif, setPencilGif] = useState(1);
	const [isSendGif, setSendGif] = useState(0);
	const [isSuccessGif, setSuccessGif] = useState(0);
	const [isCreated, setIsCreated] = useState(false);
	const navigate = useNavigate();

	const StartCreating = async (e) => {
		setIsFamilyCreating(true);
		e.target.disabled = true;
		setTitle("Загрузка...");

		const sleep = async (ms) => {
			new Promise(resolve => setTimeout(resolve, ms));
		}

		setSendGif(1);
		setPencilGif(2);
		await sleep(600);

		setPencilGif(0);
		setTitle("Создаём новую семью...");
		await sleep(1500);

		setTitle("Почти готово...")

		const answer = await familyApi.createMyFamily();

		if (answer.status) {
			setTitle("Семья успешно создана!");
			e.target.disabled = false;
			e.target.innerText = "Далее";
			setIsCreated(true);
			setSuccessGif(1);
			setSendGif(2);
			await sleep(500);

			setSendGif(0);
		} else {
			setTitle(answer.msg);
			setIsFamilyCreating(false);
			setPencilGif(1);
			setSendGif(2);
			await sleep(500);

			setSendGif(0);
			e.target.innerText = "Попробовать снова";
			e.target.disabled = false;
		}
	}

	return (
		<div className="fm-container success-create">
			<Link
				to={isFamilyCreating ? "?tab=create" : ""}
				className={`back-to-main left${isFamilyCreating ? " disabled" : ""}`}
			>
				<div className="btm-container">
					<ArrowIcon className="icon" />
					Назад
				</div>
			</Link>

			<div className="animation-container">
				{
					(isPencilGif === 1 || isPencilGif === 2) &&
					<img src="/animations/pencil.gif" alt="Pencil Animation" className={`animation pencil${isPencilGif === 2 ? " hide" : ""}`} />
				}
				{
					(isSendGif === 1 || isSendGif === 2) &&
					<img src="/animations/send.gif" alt="Send Animation" className={`animation send${isSendGif === 2 ? " hide" : ""}`}/>
				}
				{
					isSuccessGif === 1 &&
					<img src="/animations/success.gif" alt="Success Animation" className="animation success"/>
				}
			</div>
			<header className="title">{title === null ? <>Станьте владельцем своей семьи</> : title}</header>
			<div className="buttons-container">
				{isCreated
					? <button
						className="interactive-button created"
						onClick={() => navigate("/app")}
						>
							Далее
						</button>
					: <button
							className="interactive-button"
							onClick={(e) => StartCreating(e)}
						>
							Начать
						</button>
				}

			</div>
		</div>
	)
}

export default CreateFamily;