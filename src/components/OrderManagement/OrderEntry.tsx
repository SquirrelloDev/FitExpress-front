import Card from "../Card/Card";
import {IconPencil, IconSquareChevronDown, IconSquareChevronUp, IconTrash} from "@tabler/icons-react";
import classes from "../../sass/pages/order-manage.module.scss";
import btnStyles from '../../sass/components/button.module.scss'
import clsx from "clsx";
import {useNavigate} from "react-router-dom";
import {appRoutes} from "../../utils/routes";
import {Order} from "../../types/dbtypes/Order";
import useOrderDelete from "../../queries/orders/delete";
import Modal from "../Modal/Modal";
import ViewDelete from "../Modal/Views/ViewDelete";
import {useCallback, useState} from "react";
import {useOrderActivity} from "../../queries/orders/edit";

interface OrderEntryProps {
    openedItem: number,
    index: number,
    setOpenedItem: (idx: number) => void,
    order: Order,
    token: string
}

function OrderEntry({order, index, openedItem, setOpenedItem, token}: OrderEntryProps) {
    const navigate = useNavigate()
    const {mutate: deleteOrder, isLoading} = useOrderActivity()
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const updateOrderStatus = useCallback(() => {
        deleteOrder({status: false, id: order._id, token: token})
        setModalOpen(false)
    }, [deleteOrder, order._id, token])
    return (
        <>
            <Card>
                <div className={classes.management__entry} onClick={() => setOpenedItem(index)}>
                    <div className={classes.management__entry__header}>
                        <h3 className={clsx(!order.is_active && classes['management__entry__header__text--disabled'])}>{order.name}</h3>
                        {openedItem === index ? <IconSquareChevronUp/> : <IconSquareChevronDown/>}
                    </div>
                    {openedItem === index && (
                        <>
                            <div className={classes.management__entry__info}>
                                <h4>Dane diety:</h4>
                                <p>Plan diety: {order.diet_id.diet_type}</p>
                                <p>Typ diety: {order.name}</p>
                                <p>Kaloryczność: {order.calories} kcal</p>
                                <p>Okres trwania planu:</p>
                                <p>{new Date(order.sub_date.from).toLocaleDateString()} - {new Date(order.sub_date.to).toLocaleDateString()}</p>
                                <p>Adres:</p>
                                <p>{order.address_id.street} {order.address_id.building_no}{order.address_id.apartment_no ? `/${order.address_id.apartment_no}` : ''}, {order.address_id.postal} {order.address_id.city}</p>
                            </div>
                            {order.is_active && (
                                <>
                                    <hr className={classes.management__entry__divider}/>
                                    <div className={classes.management__entry__actions}>
                                        <button onClick={() => navigate(appRoutes.dietManagement + `/${order._id}`)}
                                                className={clsx(btnStyles.btn, btnStyles['btn--outline'], classes.management__entry__actions__btn)}>
                                            <IconPencil/> Edycja
                                        </button>
                                        <button
                                            className={clsx(btnStyles.btn, btnStyles['btn--outline'], btnStyles['btn--outline--danger'], classes.management__entry__actions__btn)}
                                            onClick={() => setModalOpen(true)}><IconTrash/>
                                            <span>Zrezygnuj z diety</span></button>
                                    </div>
                                </>
                            )}
                        </>
                    )
                    }
                </div>
                {modalOpen && <Modal><ViewDelete id={order._id} closeModal={setModalOpen}
                                                 deleteMutation={updateOrderStatus} isDeleting={isLoading}/></Modal>}
            </Card>
        </>
    )
}

export default OrderEntry