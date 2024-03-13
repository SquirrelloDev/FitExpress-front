import {useNavigate} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useHealthPatch, {healthCardSchema, PatchHealthData, UserHealthSchema} from "../../queries/user/healthCard";
import useUserPrefs from "../../hooks/useUserPrefs";
import {appRoutes} from "../../utils/routes";
import useAuthStore from "../../stores/authStore";
import {calculateAge, calculateBMI, calculateDemands} from "../../utils/calculateUserData";
import classes from "../../sass/pages/health-card.module.scss";
import ControlledSelect from "../../components/Select/ControlledSelect";
import Input from "../../components/Input/Input";
import ControlledDatePicker from "../../components/Datepicker/ControlledDatePicker";
import {palActive, palPassive} from "../../utils/palTypes";
import HealthCardRadio from "../../components/HealthCardRadio/HealthCardRadio";
import btnStyles from "../../sass/components/button.module.scss";
import {TailSpin} from "react-loader-spinner";
import clsx from "clsx";
import BackButton from "../../components/BackBtn/BackButton";

export function HealthEditPage() {
    const navigate = useNavigate()
    const methods = useForm({
        resolver: zodResolver(healthCardSchema)
    });
    const {assignHealthStore} = useUserPrefs();
    const {mutate, isLoading} = useHealthPatch(() => {
        navigate(appRoutes.healthCardSummary)
    })
    const userData = useAuthStore((state) => state.userData);
    const {handleSubmit} = methods
    const maxDate = new Date().setFullYear(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate())
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
            },
            birthDate: data.birth_date
        }
        mutate(healthData);
        assignHealthStore({calories: caloricDemand, user_goal: data.user_goal})
    }
    return (
        <FormProvider {...methods}>
            <div className={clsx(classes.hcard, classes['hcard--app'])}>
                <BackButton />
                <h1 className={classes.hcard__header}>Edycja karty zdrowia</h1>
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
                                          placeholderText={'Data urodzin'} locale={'pl'}
                                          minDate={new Date('1900-01-01')} maxDate={new Date(maxDate)}/>
                    <ControlledSelect options={palActive} control={methods.control} name={'pal_active'}
                                      placeholder={'Aktywność treningowa w tygodniu'}/>
                    <ControlledSelect options={palPassive} control={methods.control} name={'pal_passive'}
                                      placeholder={'Aktywność pozatreningowa'}/>
                    <HealthCardRadio name={'user_goal'} control={methods.control}/>
                    <button type='submit' className={btnStyles.btn} disabled={isLoading}>{isLoading ?
                        <TailSpin visible={true} color={"#fff"} height={20}
                                  width={20}/> : 'Aktualizuj'}</button>
                </form>
            </div>
        </FormProvider>

    )
}