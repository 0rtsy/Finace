import "./InviteFamily.css"
import {ReactComponent as ArrowIcon} from "../../../assets/icons/keyboard_arrow_down.svg";
import {ReactComponent as CrownIcon} from "../../../assets/icons/owner_crown.svg";
import {ReactComponent as FamilyIcon} from "../../../assets/icons/family.svg";
import {ReactComponent as SignInIcon} from "../../../assets/icons/sign_in.svg";
import {Link, useNavigate} from "react-router";
import {useEffect, useRef, useState} from "react";
import familyApi from "../../../api/familyApi";


const CodeInput = ({
										 length = 6,
										 onComplete,
										 onPaste,
										 status = "waiting"
									 }) => {
	const [code, setCode] = useState(Array(length).fill(''));
	const [isPasting, setIsPasting] = useState(false);
	const inputsRef = useRef([]);

	useEffect(() => {
		inputsRef.current[0]?.focus();
	}, []);

	// const clearAll = () => {
	// 	setCode(Array(length).fill(''));
	// 	inputsRef.current[0]?.focus();
	// };

	const isValidChar = (char) => {
		return /^[A-Za-z0-9]$/.test(char);
	};

	const handleChange = (index, value) => {
		status = "waiting";

		const lastChar = value.slice(-1);

		const validChar = isValidChar(lastChar) ? lastChar.toUpperCase() : '';

		const newCode = [...code];
		newCode[index] = validChar;
		setCode(newCode);

		if (validChar && index < length - 1) {
			inputsRef.current[index + 1].focus();
		}

		const fullCode = newCode.join('');
		if (fullCode.length === length && newCode.every(cell => cell !== '')) {
			onComplete(fullCode);
		}
	};

	const handleKeyDown = (index, e) => {
		const isSpecialChar = e.key.length === 1 && !isValidChar(e.key) &&
			e.key !== 'Backspace' && e.key !== 'Delete' &&
			e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' &&
			e.key !== 'Tab' && !e.ctrlKey && !e.metaKey;

		if (isSpecialChar) {
			e.preventDefault();
			return;
		}

		if (e.key === 'Backspace') {
			e.preventDefault();

			if (!code[index] && index > 0) {
				const newCode = [...code];
				newCode[index - 1] = '';
				setCode(newCode);
				inputsRef.current[index - 1].focus();
			} else if (code[index]) {
				const newCode = [...code];
				newCode[index] = '';
				setCode(newCode);
			}
		}
	};

	const handlePaste = (e) => {
		e.preventDefault();

		const pastedData = e.clipboardData.getData('text');
		const validChars = pastedData.replace(/[^A-Za-z0-9]/g, '').split('');

		if (validChars.length === 0) return;

		const currentIndex = inputsRef.current.findIndex(input => input === document.activeElement);
		const startIndex = currentIndex !== -1 ? currentIndex : 0;

		const newCode = [...code];

		validChars.slice(0, length - startIndex).forEach((char, idx) => {
			if (startIndex + idx < length) {
				newCode[startIndex + idx] = char;
			}
		});

		setCode(newCode);


		setIsPasting(true);
		setTimeout(() => setIsPasting(false), 300);

		const nextEmptyIndex = newCode.findIndex((cell, idx) => cell === '' && idx >= startIndex);

		if (nextEmptyIndex !== -1) {
			inputsRef.current[nextEmptyIndex].focus();
		} else {
			inputsRef.current[length - 1].focus();
			const fullCode = newCode.join('');
			if (fullCode.length === length) {
				onComplete(fullCode);
			}
		}

		onPaste?.({
			pastedText: pastedData,
			validChars: validChars.join(''),
			startIndex,
			newCode: newCode.join('')
		});
	};

	return (
		<div className="code-input-container">
			<div className="code-inputs-wrapper">
				{code.map((digit, index) => (
					<input
						key={index}
						ref={e => {inputsRef.current[index] = e}}
						type="text"
						inputMode="text"
						pattern="[A-Za-z0-9]*"
						value={digit}
						onChange={(e) => handleChange(index, e.target.value)}
						onKeyDown={(e) => handleKeyDown(index, e)}
						onPaste={handlePaste}
						maxLength={1}
						className={`code-input-cell ${isPasting ? 'pasting' : ''} ${digit ? 'filled' : ''}`}
						placeholder=""
						autoComplete="off"
						title="Только английские буквы и цифры"
						disabled={status === "blocked"}
					/>
				))}
			</div>
		</div>
	);
};


function InviteFamily() {
	const [inputCodeStatus, setInputCodeStatus] = useState("waiting");
	const [familySearchStatus, setFamilySearchStatus] = useState("none");
	const [error, setError] = useState(undefined);
	const [familyData, setFamilyData] = useState({
		owner: {
			avatar: undefined,
			name: "Павел Иванович"
		},
		members: 0,
		inviteCode: undefined
	});
	const [isInputRoleError, setIsInputRoleError] = useState(false);
	const [roleValue, setRoleValue] = useState("");
	const [inviteButtonType, setInviteButtonType] = useState(null);

	const navigate = useNavigate();

	const onComplete = async (code) => {
		setInputCodeStatus("blocked");
		setFamilySearchStatus("search");

		const answer = await familyApi.check(code);

		if (!answer.status) {
			setInputCodeStatus("waiting");
			setError(answer.msg);
			setFamilySearchStatus("error");
		} else {
			setFamilyData({
					owner: {
						name: answer.owner.name,
						avatar: answer.owner.avatar,
					},
					members: answer.members,
					inviteCode: code
			});
			setInputCodeStatus("waiting");
			setFamilySearchStatus("found");
		}
	}

	const inviteFamily = async () => {
		setInputCodeStatus("blocked");
		setIsInputRoleError(false);

		if (roleValue.length > 2) {
			setInviteButtonType("waiting");

			const answer = await familyApi.invite(familyData.inviteCode, roleValue);

			if (!answer.status) {
				setInviteButtonType(null);
				setInputCodeStatus("waiting");
				setError(answer.msg);
				setFamilySearchStatus("error");

				if (answer.do === 1) {
					navigate("/app", {replace: true});
				}
			} else {
				setInviteButtonType("success");
				navigate("/app", {replace: true});
			}
		} else {
			setIsInputRoleError(true);
		}
	}

	return (
		<div className="fm-container invite-family">
			<div className="container-wrapper">
				<Link to="" className="back-to-main right">
					<div className="btm-container">
						Назад
						<ArrowIcon className="icon" />
					</div>
				</Link>
				<div className="animation-container">
					<img src="/animations/key.gif" alt="Key Animation" className="animation success"/>
				</div>
				<header className="title">Вступите в семью по коду владельца</header>
				<CodeInput onComplete={onComplete} status={inputCodeStatus} />
				<div className={`family-viewer${familySearchStatus === "none" ? " hide" : ""}`}>
					{familySearchStatus !== "none" && familySearchStatus === "found"
						? <div className="family-info">
								<div className="family-header">
									<div className={`owner-avatar ${familyData.owner.avatar}`}>
										{familyData.owner.name[0]}
									</div>
									<div className="family-title-container">
										<div className="owner-name">{familyData.owner.name}</div>
										<div className="title-meta">
											<CrownIcon className="icon"/>
											Создатель
										</div>
									</div>
								</div>

								<div className="members-block">
									<div className="members-block-left">
										<div className="icon-container">
											<FamilyIcon className="icon"/>
										</div>
										<span>Участников</span>
									</div>
									<div className="members-count">{familyData.members}</div>
								</div>

								<div className="join-form">
									<label className="join-label">Ваша роль в семье</label>
									<input
										type="text"
										className={`role-input${isInputRoleError ? " error" : ""}`}
										placeholder="Введите роль"
										value={roleValue}
										maxLength={16}
										onChange={(e) => setRoleValue(e.target.value)}
									/>
									<button
										className="join-button"
										onClick={() => inviteFamily()}
									>
										{inviteButtonType === null
											? <>
													<SignInIcon className="icon"/>
													Вступить
												</>
											: inviteButtonType === "waiting"
												? <>Подождите...</>
												: <>Успешно!</>
										}
									</button>
								</div>
							</div>

						: familySearchStatus === "search"
						? <div className="search-container">
								<svg width="40px" height="40px" viewBox="0 0 50 50">
									<circle
										cx="25"
										cy="25"
										r="20"
										fill="none"
										stroke="#333"
										strokeWidth="4"
									/>
									<circle
										cx="25"
										cy="25"
										r="20"
										fill="none"
										stroke="#6C63FF"
										strokeWidth="4"
										strokeLinecap="round"
										strokeDasharray="31.4 94.2"
										strokeDashoffset="0"
										transform="rotate(-90 25 25)"
									>
										<animateTransform
											attributeName="transform"
											type="rotate"
											from="0 25 25"
											to="360 25 25"
											dur="1s"
											repeatCount="indefinite"
										/>
									</circle>
								</svg>
								Поиск...
							</div>
						: <div className="error-container">{error}</div>
					}
				</div>
			</div>
		</div>
	)
}

export default InviteFamily;