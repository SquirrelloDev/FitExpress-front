import {FormProvider, useForm} from "react-hook-form";
import Input from "../Input/Input";
import {Order} from "../../types/dbtypes/Order";
import OrderAddresses from "./OrderAddresses/OrderAddresses";
import {Address} from "../../types/dbtypes/Address";
import useOrderEdit, {OrderClientEditSchema, OrderPutData} from "../../queries/orders/edit";
import {TailSpin} from "react-loader-spinner";
import btnStyles from '../../sass/components/button.module.scss'
import classes from "../../sass/components/order-form.module.scss";
import clsx from "clsx";
import BackButton from "../BackBtn/BackButton";

interface OrderFormProps {
    order: Order,
    addresses: Address[]
    userToken: string
}

function OrderForm({order, addresses, userToken}: OrderFormProps) {
    const methods = useForm({
        defaultValues: {name: order.name, address: order.address_id ? order.address_id._id : null}
    })
    const {handleSubmit, control} = methods;
    const {mutate, isLoading} = useOrderEdit()
    const onSubmit = (data: OrderClientEditSchema) => {
        const updatedOrder: OrderPutData = {
            order: {
                name: data.name,
                addressId: data.address,
                dietId: order.diet_id._id,
                userId: order.user_id._id,
                subDate: order.sub_date,
                price: order.price,
                calories: order.calories,
                withWeekends: order.with_weekends,
                ...(order.flexi_tier && {flexiTier: order.flexi_tier})
            },
            id: order._id,
            token: userToken,
        }
        mutate(updatedOrder)
    }
    return (
        <FormProvider {...methods}>
            <div className={classes.form__wrapper}>
                <BackButton/>
                <h1>{order.name}</h1>
                {/*	@ts-expect-error data to post are mixed from order and form*/}
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <Input name={'name'} placeholder={'Nazwa diety'}/>
                    <OrderAddresses allAddresses={addresses}
                                    defaultAddressId={order.address_id ? order.address_id._id : null} control={control}
                                    name={'address'} isWeekend={order.with_weekends}/>
                    <button type={'submit'} disabled={isLoading}
                            className={clsx(btnStyles.btn, classes.form__button)}>{isLoading ?
                        <TailSpin/> : 'Potwierdź zmiany'}</button>
                </form>
            </div>
        </FormProvider>
    )
}

export default OrderForm