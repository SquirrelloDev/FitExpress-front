import Card from "../Card/Card";
import {Report} from "../../types/dbtypes/Report";
import {IconChevronDown, IconTrashX} from "@tabler/icons-react";
interface ReportEntryProps {
	reportData: Report
}
export default function ReportEntry({reportData}: ReportEntryProps) {
	return (
		<Card>
			<div>
				<div>
					<p>id zgłoszenia: {reportData._id}</p>
					<p>Rodzaj zgłoszenia: </p>
					<p>Status: </p>
					<p>Data zgłoszenia: {new Date(reportData.created_at).toLocaleDateString()}</p>
					<div>
					<p>Treść zgłoszenia</p>
						<button><IconChevronDown /></button>
					</div>
				</div>
				<div>
					<button><IconTrashX /></button>
				</div>
			</div>
			<div>
				<p>{reportData.message}</p>
			</div>
		</Card>
	)
}