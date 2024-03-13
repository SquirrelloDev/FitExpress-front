import {FormProvider, useForm, useWatch} from "react-hook-form";
import ControlledSelect from "../Select/ControlledSelect";
import ControlledDatePicker from "../Datepicker/ControlledDatePicker";
import TextArea from "../TextArea/TextArea";
import clsx from "clsx";
import btnStyles from '../../sass/components/button.module.scss'
import {Order} from "../../types/dbtypes/Order";
import {ReportFormOrders} from "../ReportFormOrder/ReportFormOrder";
import useReportCreate, {ReportPostData, ReportSchema, reportSchema} from "../../queries/reports/create";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserData} from "../../types/dbtypes/UserData";
import {TailSpin} from "react-loader-spinner";
import {SelectOption} from "../Select/types";
import classes from "../../sass/pages/report-create.module.scss";
import {useEffect, useState} from "react";

interface ReportFormProps {
	orders: Order[],
	userData: UserData
}
const reportCategories: SelectOption[] =[
	{label: 'Otwarta paczka', value: 'openedPackage'},
	{label: 'Brak posiłku', value: 'missingMeal'},
	{label: 'Słaba jakość posiłku', value: 'lowQualityMeal'},
	{label: 'Posiłek inny niż w zamówieniu', value: 'differentMeal'},
	{label: 'Uszkodzona paczka', value: 'damagedPackage'},
	{label: 'Brakująca paczka', value: 'missingPackage'},
	{label: 'Inne', value: 'other'},
]
export default function ReportForm({orders, userData}:ReportFormProps) {
	const [minDate, setMinDate] = useState<Date>(new Date(1970, 0, 1))
	const {mutate, isLoading} = useReportCreate()
	const methods = useForm({
		resolver: zodResolver(reportSchema),
		mode: 'onTouched'
	})
	const {handleSubmit, control} = methods
	const orderIdWatch = useWatch({name: 'orderId', control})
	useEffect(() => {
		const orderMinDate = orders.find(order => order._id === orderIdWatch)?.sub_date.from
		if(orderMinDate){
			setMinDate(new Date(orderMinDate))
		}
	}, [orderIdWatch, orders])
	const onSubmit = (data: ReportSchema) => {
		const newReport: ReportPostData = {
			report: {
				orderId: data.orderId,
				userId: userData.id,
				deliveryDate: new Date(data.deliveryDate),
				category: data.category,
				message: data.message
			},
			token: userData.token
		}
		mutate(newReport)
	}
	return (
		<FormProvider {...methods}>
			{/*@ts-expect-error data are compatible*/}
			<form onSubmit={handleSubmit(onSubmit)} className={classes.create__form}>
				<ControlledSelect options={reportCategories} control={control} name={'category'} placeholder={'Wybierz kategorię zgłoszenia'}/>
				<h3>Której diety dotyczy to zgłoszenie?</h3>
				<ReportFormOrders orders={orders} name={'orderId'} control={control} />
				{orderIdWatch && (
					<>
						<ControlledDatePicker control={control} name={'deliveryDate'} placeholderText={'Data dostawy'} minDate={minDate} maxDate={new Date()}/>
						<TextArea name={'message'} placeholder={'Treść zgłoszenia'}/>
						<button type={'submit'} disabled={(isLoading || orders.length === 0)} className={clsx(btnStyles.btn)}>{isLoading ? <TailSpin /> : 'Dodaj zgłoszenie'}</button>
					</>
				)}
			</form>
		</FormProvider>
	)
}