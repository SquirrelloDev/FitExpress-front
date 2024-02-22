import classes from "../../sass/components/button.module.scss";
import {IconChevronLeft} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";

export default function BackButton() {
    const navigate = useNavigate()
    return (
        <button onClick={() => navigate(-1)} className={classes.btn__back}><IconChevronLeft color={'#fff'} size={30}/></button>
    )
}