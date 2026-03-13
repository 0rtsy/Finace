import {Link, useNavigate} from "react-router";
import './CategoryInfo.css'

import { ReactComponent as IconBack } from "../../../assets/icons/arrow_left.svg";
import { ReactComponent as IconDelete } from "../../../assets/icons/trash.svg";
import { ReactComponent as FileIcon } from "../../../assets/icons/file.svg";
import { ReactComponent as IncomeIcon } from "../../../assets/icons/income-icon.svg";
import { ReactComponent as ExpensesIcon } from "../../../assets/icons/expenses_icon.svg";
import { ReactComponent as HistoryIcon } from "../../../assets/icons/history.svg";
import CategoryIcon from "../../CategoryIcon/CategoryIcon";
import {useEffect, useState} from "react";
import ValueLoading from "../../ValueLoading/ValueLoading";
import categoriesApi from "../../../api/categoriesApi";


function useLoadCategoryData(categoryId, createNewNotification) {
	const navigate = useNavigate();

	const request = async () => {
		const answer = await categoriesApi.getCategoryData(categoryId);
		if (!answer.status) {
			createNewNotification("error", answer.msg);
			navigate("/app/categories");
		} else {
			return answer;
		}
	}

	let result;
	useEffect(() => {
		result = request();
	}, [request, result]);

	return result;
}


function CategoryInfo({ categories, categoryId, createNewNotification }) {
	const [icon, setIcon] = useState(undefined);
	const [name, setName] = useState(undefined);
	const [color, setColor] = useState(undefined);
	const [recordsTitle, setRecordsTitle] = useState(undefined);
	const [creatorData, setCreatorData] = useState(undefined);
	const [categoryStatData, setCategoryStatData] = useState(undefined);
	const [recordsList, setRecordsList] = useState(undefined);
	const navigate = useNavigate();

	// const categoryData = useLoadCategoryData(categoryId, createNewNotification);

	useEffect(() => {
		if (categories) {
			for (const category of categories) {
				if (category.id === categoryId) {
					setIcon(category.iconName);
					setName(category.name);
					setColor(category.color);
					setRecordsTitle(category.records);
					break;
				}
			}

			const request = async () => {
				const answer = await categoriesApi.getCategoryData(categoryId);
				if (!answer.status) {
					createNewNotification("error", answer.msg);
					navigate("/app/categories");
				} else {
					setCreatorData(answer.creator);
					setCategoryStatData(answer.totals);
					setRecordsList(answer.lastestRecords);
				}
			}
			request().catch((error) => {
				console.log(error);
			});
		}
	}, [categories, categoryId, setCategoryStatData, createNewNotification, setCreatorData, setRecordsList]);


	return (
		<div className="content">
			<header className="fw-header">
				<Link
					to="/app/categories"
					className="back-button"
				>
					<IconBack className="icon"/>
				</Link>
				<div className="ci-delete-button">
					<IconDelete className="icon"/>
					Удалить
				</div>
			</header>

			<div className="ci-category-header">
				<div
					className="icon-container"
					style={{backgroundColor: color + '33'}}
				>
					<CategoryIcon className="icon" iconName={icon} style={{color: color}} />
				</div>
				<div className="category-title-section">
					<div className="category-name">{name}</div>
					<div className="category-meta">
						<div className="records-count">
							<FileIcon className="icon"/>
							{recordsTitle}
						</div>
						<div className="creator-chip green">
							{creatorData === undefined
								? <>
										<ValueLoading width="24px" height="24px" borderRadius="50%" />
										<ValueLoading width="150px" height="18px" />
									</>
								: <>
										<div className="creator-avatar">{creatorData.name[0]}</div>
										<div className="creator-name">{creatorData.name}</div>
										<div className="creator-role">{creatorData.role}</div>
									</>
							}
						</div>
					</div>
				</div>
			</div>

			<div className="ci-stats-grid">
				{categoryStatData === undefined
					? <>
							<ValueLoading height="88px" />
							<ValueLoading height="88px" />
						</>
					: <>
							<div className="stat-card">
								<div className="stat-label">
									<IncomeIcon className="icon income"/>
									Доходы
								</div>
								<div className="stat-value income">+{categoryStatData.income}</div>
							</div>
							<div className="stat-card">
								<div className="stat-label">
									<ExpensesIcon className="icon expenses"/>
									Расходы
								</div>
								<div className="stat-value expenses">-{categoryStatData.expenses}</div>
							</div>
						</>
				}

			</div>

			<div className="ci-lastest-records">
				<div className="header">
					<div className="title-sector">
						<HistoryIcon className="icon"/>
						Последние записи
					</div>
					<Link to="/app/history" className="history-href">
						История
						<IconBack className="icon"/>
					</Link>
				</div>
				<div className="records-wrapper">
					{recordsList === undefined
						? <>
								<ValueLoading height="60px" />
								<ValueLoading height="60px" />
								<ValueLoading height="60px" />
							</>
						: recordsList.length === 0
							? <div className="list-empty">Записей пока не было</div>
							: recordsList.map((record, index) =>
								<div
									className={`record-row ${record.amount.type} ${record.creator.avatar}`}
									style={{ animationDelay: `${0.3 + 0.1 * index}s` }}
								>{/* Colors: blue, green, purple, orange, red */}
									<div className="record-user-avatar">{record.creator.name[0]}</div>
									<div className="record-info">
										<div className="info-title">
											{record.creator.name}
											<span className="create-date">{record.createAt}</span>
										</div>
										<div className="record-description">{record.description}</div>
									</div>
									<div className="record-value">{record.amount.value}</div>
								</div>
							)
					}
					{/* Colors: blue, green, purple, orange, red */}
				</div>
			</div>
		</div>
	)
}

export default CategoryInfo;