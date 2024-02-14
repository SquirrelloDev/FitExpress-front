import classes from "../../sass/pages/cart.module.scss";
import {IconChevronLeft} from "@tabler/icons-react";
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
import useOrderCreate, {CartSchema, cartSchema, OrderPostData} from "../../queries/orders/create";
import {zodResolver} from "@hookform/resolvers/zod";
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
    const userData = useAuthStore((state) => state.userData);
    const [cartStep, setCartStep] = useState<number>(0)

    const [cartDiscount, setCartDiscount] = useState<number>(0)


    const {data, isLoading, isSuccess} = useDietsListQuery({
        token: userData.token,
        pageSize: 0,
        pageIndex: 0,
        dietType: ''
    })
    const {data: userAddresses, isLoading: isAddressesLoading} = useUserAddressListQuery({id: userData.id, token: userData.token})
    const [cartItemsFull, setCartItemsFull] = useState<Diet[]>([])
    const methods = useForm({
        resolver: zodResolver(cartSchema),
        defaultValues: {
            cart: cartItemsFull
        }
    })
    const {handleSubmit, getValues} = methods
    const {fields} = useFieldArray({name: 'cart', control: methods.control})
    useEffect(() => {
        if (isSuccess) {
            const userDiets = data!.diets.filter((diet) => cartItems.includes(diet._id));
            setCartItemsFull(userDiets)
        }
    }, [cartItems, data, isSuccess])
    const {mutate} = useOrderCreate()
    const onSubmit = (data: CartSchema) => {
        console.log("Przeszło");
        console.log(data)
        const orders:OrderPostData[] = data.cart.map((cartItem, idx) => {
            return {
                order: {
                    name: cartItem.name,
                    dietId: cartItems[idx],
                    userId: userData.id,
                    addressId: data.address,
                    subDate: {
                        from: cartItem.date[0],
                        to: cartItem.date[1]
                    },
                    price: 2000,
                    calories: cartItem.calories,
                    withWeekends: cartItem.weekends
                },
                token: userData.token
            }
        })
        console.log("Orders", orders)
        orders.forEach(order => {
            mutate(order)
        })
    }
    return (
        <FormProvider {...methods}>
            <div className={classes.cart}>
                {isLoading && <div><h1>Wczytuję koszyk...</h1></div>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {!isLoading && cartStep === 0 && isSuccess && (
                        <div>
                            <button onClick={() => navigate(-1)} className={classes.cart__back}><IconChevronLeft
                                color={'#fff'} size={30}/></button>
                            <div>
                                <p>Konfiguracja</p>
                            </div>
                            <h3>Wybrane diety</h3>
                            {cartItemsFull.map((cartItem, index) => (
                                <Card key={cartItem._id}>
                                    <Card>
                                        <div>
                                            {cartItem.imageBuffer ? <img src={'data:;base64,' + cartItem.imageBuffer}
                                                                         alt={`Obrazek diety ${cartItem.name}`}/> : <div> </div>}
                                            <p>{cartItem.name}</p>
                                        </div>
                                    </Card>
                                    <h4>Nadaj swojej diecie wyjątkową nazwę</h4>
                                    <Input name={`cart.${index}.name`} placeholder={'Nazwa'}/>
                                    <h3>Kaloryczność</h3>
                                    <p>Wybierz kaloryczność, która spełnia Twoje potrzeby</p>
                                    <CartCaloriesRadio name={`cart.${index}`} control={methods.control} prices={cartItem.prices} />
                                    <h3>Okres trwania diety</h3>
                                    <CartSubDate name={`cart.${index}`} control={methods.control}/>
                                </Card>
                            ))}

                            {/*<div>*/}
                            {/*    <p>Cena za dzień: 46 zł</p>*/}
                            {/*    <p>Razem: 46 zł</p>*/}
                            {/*    <button onClick={() => setCartStep(1)} className={btnStyles.btn}>Adres i płatność</button>*/}
                            {/*</div>*/}
                        </div>
                    )}
                    {cartStep === 1 && (
                        <>
                            <button onClick={() => setCartStep(0)} className={classes.cart__back}><IconChevronLeft
                                color={'#fff'} size={30}/></button>
                            <div>
                                <p>Adres i płatność</p>
                            </div>
                            <h3>Wybrane diety</h3>
                            {cartItemsFull.map((cartItem, index) => (
                                <>
                                    <Card key={cartItem._id}>
                                        <div>
                                            <Card>
                                                <div>
                                                    <img src={'data:;base64,' + cartItem.imageBuffer}
                                                         alt={`Obrazek diety ${cartItem.name}`}/>
                                                    <p>{cartItem.name}</p>
                                                </div>
                                            </Card>
                                            <h4>Nazwa diety</h4>
                                            <p>{getValues(`cart.${index}.name`)}</p>
                                            <h4>Kaloryczność</h4>
                                            <p>{`${getValues(`cart.${index}.calories`)} kcal`}</p>
                                            <h4>Okres trwania diety</h4>
                                            <p>{`${new Date(getValues(`cart.${index}.date.0`)).toLocaleDateString()} - ${new Date(getValues(`cart.${index}.date.1`)).toLocaleDateString()}`}</p>
                                        </div>
                                    </Card>
                                </>
                            ))}
                            <CartAddresses control={methods.control} name={'address'} addresses={userAddresses!.addresses} isAddressesLoading={isAddressesLoading}/>
                            <h3>Kod promocyjny</h3>
                           <CartPromocode token={userData.token} setCurrentDiscount={setCartDiscount}/>
                            {/*<div>*/}
                            {/*    <p>Cena za dzień: 46 zł</p>*/}
                            {/*    <p>Razem: 46 zł</p>*/}
                            {/*    <button type={'submit'}>Zapłać za zamówienie</button>*/}
                            {/*</div>*/}
                        </>
                    )}
                    <CartTotal cartStep={cartStep} setCartStep={setCartStep} control={methods.control} discount={cartDiscount} />
                </form>

            </div>
        <DevTool control={methods.control}/>
        </FormProvider>
    )
}

export default CartPage