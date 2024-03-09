import buttonStyles from "../sass/components/button.module.scss";
import classes from "../sass/pages/welcome.module.scss";
import clsx from "clsx";
import {useNavigate} from "react-router-dom";
import {appRoutes} from "../utils/routes";
import {Carousel} from "@mantine/carousel";
import '@mantine/carousel/styles.css';

export function WelcomePage() {
    const navigate = useNavigate()
    return (
        <div className={classes.welcome}>
            <div className={classes.welcome__carousel__wrapper}>
                <Carousel slideSize={{base: "100%", sm: '50%', md: '80%'}} align={'center'}
                          withControls={false} className={classes.welcome__carousel}>
                    <Carousel.Slide>
                        <div className={classes.welcome__carousel__item}>
                            <img src={'welcome-1.svg'} alt={'test1'} className={classes.welcome__carousel__item__image}/>
                            <div className={classes.welcome__carousel__item__text}>
                                <h2>Dieta w zasięgu ręki</h2>
                                <p>Dzięki FitExpress masz dostęp do szerokiej gamy diet dostosowanych dla każdego</p>
                            </div>
                        </div>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <div className={classes.welcome__carousel__item}>
                            <img src={'welcome-2.svg'} alt={'test1'} className={classes.welcome__carousel__item__image}/>
                            <div className={classes.welcome__carousel__item__text}>
                                <h2>Nie tylko catering</h2>
                                <p>Oprócz przygotowywania posiłków pomagamy Ci w osiągnięciu swojego celu!</p>
                            </div>
                        </div>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <div className={classes.welcome__carousel__item}>
                            <img src={'welcome-3.svg'} alt={'test1'} className={classes.welcome__carousel__item__image}/>
                            <div className={classes.welcome__carousel__item__text}>
                                <h2>Delegacja? Żaden problem!</h2>
                                <p>Przy pomocy kilku kliknięć możesz zmienić adres dostawy i nadal cieszyć się posiłkiem!</p>
                            </div>
                        </div>
                    </Carousel.Slide>
                </Carousel>
            </div>
            <div className={classes.welcome__buttons}>
                <button onClick={() => navigate(appRoutes.login)} className={buttonStyles.btn}>Zaloguj się</button>
                <button onClick={() => navigate(appRoutes.register)}
                        className={clsx(buttonStyles.btn, buttonStyles['btn--outline'])}>Zarejestruj się
                </button>
            </div>
        </div>
    )
}