import Input from "../../components/Input/Input";
import ControlledSelect from "../../components/Select/ControlledSelect";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormProvider, useForm} from "react-hook-form";
import {SelectOption} from "../../components/Select/types";
import useHealthPatch, {healthCardSchema, PatchHealthData, UserHealthSchema} from "../../queries/user/healthCard";
import btnStyles from '../../sass/components/button.module.scss'
import classes from "../../sass/pages/health-card.module.scss";
import HealthCardRadio from "../../components/HealthCardRadio/HealthCardRadio";
import ControlledDatePicker from "../../components/Datepicker/ControlledDatePicker";
import {DevTool} from "@hookform/devtools";
import useAuthStore from "../../stores/authStore";
import {calculateAge, calculateBMI, calculateDemands} from "../../utils/calculateUserData";
import {TailSpin} from "react-loader-spinner";
import useUserPrefs from "../../hooks/useUserPrefs";

const palActive: SelectOption[] = [
    {label: 'Brak treningów / jeden lekki', value: 1.2},
    {label: 'Pojedyncze treningi', value: 1.4},
    {label: '2-3 treningi w tygodniu', value: 1.6},
    {label: '4-6 trenigów w tygodniu', value: 1.8},
    {label: 'Codzienne treningi', value: 2.0},
]
const palPassive: SelectOption[] = [
    {label: 'Bardzo niska', value: 1.2},
    {label: 'Niska aktywność / praca biurowa', value: 1.4},
    {label: 'Średnia aktywność / praca mieszana', value: 1.6},
    {label: 'Wysoka aktywność / praca fizyczna', value: 1.8},
    {label: 'Bardzo wysoka aktywność / ciężka praca fizyczna', value: 2.0},
]

function HealthCardPage() {
    const methods = useForm({
        resolver: zodResolver(healthCardSchema)
    });
    const assignHealthPrefs = useUserPrefs();
    const {mutate, isLoading} = useHealthPatch()
    const userData = useAuthStore((state) => state.userData);
    const {handleSubmit} = methods
    const onSubmit = (data: UserHealthSchema) => {
        const userAge = calculateAge(data.birth_date);
        const {
            caloricDemand,
            waterDemand
        } = calculateDemands(data.gender, data.pal_active, data.pal_passive, data.user_weight_current, data.user_height, userAge, data.user_goal);
        const {
            currentBMI,
            plannedBMI
        } = calculateBMI(data.user_height, data.user_weight_current, data.user_weight_planned)
        const healthData: PatchHealthData = {
            _id: userData.id,
            token: userData.token,
            healthData: {
                user_height: data.user_height,
                user_weight_current: data.user_weight_current,
                user_weight_planned: data.user_weight_planned,
                gender: data.gender,
                pal_passive: data.pal_passive,
                pal_active: data.pal_active,
                user_goal: data.user_goal,
                age: userAge,
                calories_demand: caloricDemand,
                water_demand: waterDemand,
                bmi: currentBMI,
                bmi_planned: plannedBMI,
            }
        }
        mutate(healthData);
        assignHealthPrefs({cals: caloricDemand, user_goal: data.user_goal})
    }
    return (
        <FormProvider {...methods}>
            <div className={classes.hcard}>
                <h1 className={classes.hcard__header}>Powiedz coś więcej o sobie</h1>
                <p className={classes.hcard__subtext}>Zanim rozpoczniesz korzystanie z aplikacji, chcemy dowiedzieć się
                    więcej o Tobie, by wyliczyć odpowiednie zapotrzebowanie kaloryczne dla Ciebie</p>
                {/*@ts-expect-error data are sent correctly*/}
                <form className={classes.hcard__form} onSubmit={handleSubmit(onSubmit)}>
                    <ControlledSelect options={[{label: 'Mężczyzna', value: 'M'}, {label: 'Kobieta', value: 'F'}]}
                                      control={methods.control} name={'gender'} placeholder={'Płeć'} isRequired/>
                    <Input name={'user_height'} type='number' min={120} max={250} placeholder={'Wzrost (w cm)'}/>
                    <Input name={'user_weight_current'} type='number' min={40} max={500}
                           placeholder={'Aktualna waga (w kg)'}/>
                    <Input name={'user_weight_planned'} type='number' min={40} max={500}
                           placeholder={'Planowana waga (w kg)'}/>
                    <ControlledDatePicker control={methods.control} name={'birth_date'}
                                          placeholderText={'Data urodzin'}/>
                    <ControlledSelect options={palActive} control={methods.control} name={'pal_active'}
                                      placeholder={'Aktywność treningowa w tygodniu'}/>
                    <ControlledSelect options={palPassive} control={methods.control} name={'pal_passive'}
                                      placeholder={'Aktywność pozatreningowa'}/>
                    <HealthCardRadio name={'user_goal'} control={methods.control}/>
                    <button type='submit' className={btnStyles.btn} disabled={isLoading}>{isLoading ? <TailSpin visible={true} color={"#fff"} height={20} width={20} /> : 'Oblicz zapotrzebowanie'}</button>
                </form>
            </div>
            <DevTool control={methods.control}/>
        </FormProvider>

    )
}

export default HealthCardPage;