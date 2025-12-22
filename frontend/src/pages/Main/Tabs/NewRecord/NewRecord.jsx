import "./NewRecord.css"

import {ReactComponent as WalletAddIcon} from "../../../../assets/icons/wallet_add.svg";
import SumType from "../../../../components/NewRecord/SumType/SumType";
import Description from "../../../../components/NewRecord/Description/Description";
import CreateButton from "../../../../components/NewRecord/CreateButton/CreateButton";
import Categories from "../../../../components/NewRecord/Categories/Categories";

function NewRecord({ newRecordData, updateNewRecordData, clearNewRecordData }) {
	return (
		<div className="screen new-record">
			<div
				className="new-record-title"
				onClick={() => {clearNewRecordData()}}
			>
				<div className={`background ${newRecordData.type}`}>
					<div className="circle"></div>
					<div className="circle"></div>
				</div>
				<div className="content">
					<WalletAddIcon className="icon"/>
					Новая запись
				</div>
			</div>
			<div className="nrc-container">
				<SumType newRecordData={newRecordData} updateNewRecordData={updateNewRecordData} />
				<Description newRecordData={newRecordData} updateNewRecordData={updateNewRecordData} />
				<Categories newRecordData={newRecordData} updateNewRecordData={updateNewRecordData} />
				<CreateButton newRecordData={newRecordData} clearNewRecordData={clearNewRecordData} />
			</div>
		</div>
	)
}

export default NewRecord;