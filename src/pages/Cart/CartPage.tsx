import classes from "../../sass/pages/cart.module.scss";
import btnStyles from '../../sass/components/button.module.scss'
import {IconChevronLeft, IconPhotoOff, IconX} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import useCartStore from "../../stores/cartStore";
import useDietsListQuery from "../../queries/diets/listing";
import useAuthStore from "../../stores/authStore";
import {useEffect, useState} from "react";
import {Diet} from "../../types/dbtypes/Diet";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import {FormProvider, useFieldArray, useForm} from "react-hook-form";
import {DevTool} from "@hookform/devtools";
import CartCaloriesRadio from "../../components/Cart/CartCaloriesRadio/CartCaloriesRadio";
import CartSubDate from "../../components/Cart/CartSubDate/CartSubDate";
import {useUserAddressListQuery} from "../../queries/addresses/listing";
import CartAddresses from "../../components/Cart/CartAdresses/CartAddresses";
import CartPromocode from "../../components/Cart/CartPromocode/CartPromocode";
import {Address} from "../../types/dbtypes/Address";
import CartTotal from "../../components/Cart/CartTotal/CartTotal";
import {CartSchema, cartSchema, OrderPostData, usePaymentProcess} from "../../queries/orders/create";
import {zodResolver} from "@hookform/resolvers/zod";
import clsx from "clsx";
import useCartArray from "../../hooks/useCartArray";
import {getFlexiTier} from "../../utils/dietsCalc";
import {appRoutes} from "../../utils/routes";
import {calcDays} from "../../utils/calcDays";
import {toast} from "react-hot-toast";

export interface CartFormValues {
    address: Address
    cart: {
        calories: number,
        date: Date[],
        name: string,
        weekends: boolean
    }[]
}

function CartPage() {
    const navigate = useNavigate()
    const cartItems = useCartStore((state) => state.cartItems)
    const deleteItem = useCartStore((state) => state.deleteItem)
    const userData = useAuthStore((state) => state.userData);
    const [cartStep, setCartStep] = useState<number>(0)

    const [cartDiscount, setCartDiscount] = useState<number>(0)


    const {data, isLoading, isSuccess} = useDietsListQuery({
        token: userData.token,
        pageSize: 0,
        pageIndex: 0,
        dietType: ''
    })
    const {data: userAddresses, isLoading: isAddressesLoading} = useUserAddressListQuery({
        id: userData.id,
        token: userData.token
    })
    const [cartItemsFull, setCartItemsFull] = useState<Diet[] | undefined>([])
    const methods = useForm<CartFormValues>({
        resolver: zodResolver(cartSchema),
        defaultValues: {
            cart: []
        }
    })
    const {handleSubmit, getValues, watch} = methods
    const {replace} = useFieldArray({name: 'cart', control: methods.control})
    const cart = watch('cart')
    const filterArr = useCartArray()
    useEffect(() => {
        if (isSuccess) {
            const userDiets = filterArr(data!.diets, cartItems) as Diet[]
            setCartItemsFull(userDiets)
        }
    }, [cartItems, data, filterArr, isSuccess])
    const {mutate: paymentMutate} = usePaymentProcess()
    const onSubmit = (cartData: CartSchema) => {
        const orders: OrderPostData[] = cartData.cart.map((cartItem, idx) => {
            const dietId = cartItems[idx]
            const tier = getFlexiTier(data!.diets.find(diet => diet._id === dietId)?.name)
            return {
                order: {
                    name: cartItem.name,
                    dietId: dietId,
                    userId: userData.id,
                    addressId: cartData.address,
                    subDate: {
                        from: cartItem.date[0],
                        to: cartItem.date[1]
                    },
                    price: (cartItem.price * calcDays(cartItem.date ? cartItem.date[0] : new Date(), cartItem.date ? cartItem.date[1] : new Date(), cartItem.weekends) as number) * (1 - cartDiscount),
                    calories: cartItem.calories,
                    withWeekends: cartItem.weekends,
                    ...(tier && {flexiTier: tier})
                },
                token: userData.token
            }
        })
        paymentMutate(orders)
    }
    return (
        <FormProvider {...methods}>
            <div className={classes.cart}>
                {isLoading && <div><h1>Wczytuję koszyk...</h1></div>}
                {/*@ts-expect-error data are sent correctly*/}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {!isLoading && cartStep === 0 && isSuccess && (
                        <div>
                            <button onClick={() => navigate(-1)} className={classes.cart__back}><IconChevronLeft
                                color={'#fff'} size={30}/></button>
                            <div className={classes.cart__header}>
                                <p>Konfiguracja</p>
                            </div>
                            <div className={classes.cart__wrapper}>
                                <h3>Wybrane diety</h3>
                                {cartItems.length === 0 && (
                                    <div className={classes['cart__item--blank']}>
                                        <h3>Coś tu pusto...</h3>
                                        <p>Pora coś dodać!</p>
                                    </div>
                                )}
                                {cartItemsFull?.map((cartItem, index) => (
                                    <Card key={cartItem._id + index}>
                                        <h3>Dieta {index + 1}</h3>
                                        <Card clearPadding>
                                            <div className={classes.cart__item__diet}>
                                                {cartItem.imageBuffer ?
                                                    <img src={'data:;base64,' + cartItem.imageBuffer}
                                                         alt={`Obrazek diety ${cartItem.name}`}
                                                         className={classes.cart__item__diet__img}/> : <div
                                                        className={clsx(classes.cart__item__diet__img, classes['cart__item__diet__img--blank'])}>
                                                        <IconPhotoOff size={20}/></div>}
                                                <p>{cartItem.name}</p>
                                                <button onClick={() => {
                                                    deleteItem(index);
                                                    // @ts-expect-error cartItem isn't used here
                                                    replace(cart.filter((cartItem, idx) => idx !== index))
                                                    toast.success('Element usunięty!')
                                                }} className={classes.cart__item__delete}><IconX/></button>
                                            </div>
                                        </Card>
                                        <h4>Nadaj swojej diecie wyjątkową nazwę</h4>
                                        <Input name={`cart.${index}.name`} placeholder={'Nazwa'}/>
                                        <h3>Kaloryczność</h3>
                                        <p>Wybierz kaloryczność, która spełnia Twoje potrzeby</p>
                                        <CartCaloriesRadio name={`cart.${index}`} control={methods.control}
                                                           prices={cartItem.prices} index={index}/>
                                        <h3>Okres trwania diety</h3>
                                        <CartSubDate name={`cart.${index}`} control={methods.control}
                                                     prices={cartItem.prices}/>
                                    </Card>
                                ))}
                                <button className={clsx(btnStyles.btn, btnStyles['btn--outline'])}
                                        onClick={() => navigate(appRoutes.diets)}>Dodaj {cartItems.length > 0 ? 'kolejną' : 'pierwszą'} dietę
                                </button>
                            </div>
                        </div>
                    )}
                    {cartStep === 1 && (
                        <>
                            <button onClick={() => setCartStep(0)} className={classes.cart__back}><IconChevronLeft
                                color={'#fff'} size={30}/></button>
                            <div className={classes.cart__header}>
                                <p>Adres i płatność</p>
                            </div>
                            <div className={classes.cart__wrapper}>
                                <h3>Wybrane diety</h3>
                                {cartItemsFull?.map((cartItem, index) => (
                                    <>
                                        <Card key={cartItem._id + index}>
                                            <div>
                                                <Card clearPadding>
                                                    <div className={classes.cart__item__diet}>
                                                        {cartItem.imageBuffer ?
                                                            <img src={'data:;base64,' + cartItem.imageBuffer}
                                                                 alt={`Obrazek diety ${cartItem.name}`}
                                                                 className={classes.cart__item__diet__img}/> : <div
                                                                className={clsx(classes.cart__item__diet__img, classes['cart__item__diet__img--blank'])}>
                                                                <IconPhotoOff size={20}/></div>}
                                                        <p>{cartItem.name}</p>
                                                    </div>
                                                </Card>
                                                <h4>Nazwa diety</h4>
                                                <p>{getValues(`cart.${index}.name`)}</p>
                                                <h4>Kaloryczność</h4>
                                                <p>{`${getValues(`cart.${index}.calories`)} kcal`}</p>
                                                <h4>Okres trwania diety</h4>
                                                <p>{`${new Date(getValues(`cart.${index}.date.0`)).toLocaleDateString()} - ${new Date(getValues(`cart.${index}.date.1`)).toLocaleDateString()} ${getValues(`cart.${index}.weekends`) ? '+ weekendy' : ''}`}</p>
                                            </div>
                                        </Card>
                                    </>
                                ))}
                                <CartAddresses control={methods.control} name={'address'}
                                               addresses={userAddresses!.addresses}
                                               isAddressesLoading={isAddressesLoading}/>
                                <CartPromocode token={userData.token} setCurrentDiscount={setCartDiscount}/>
                            </div>
                        </>
                    )}
                    <CartTotal cartStep={cartStep} setCartStep={setCartStep} control={methods.control}
                               discount={cartDiscount}/>
                </form>
            </div>
            <DevTool control={methods.control}/>
        </FormProvider>
    )
}

export default CartPage