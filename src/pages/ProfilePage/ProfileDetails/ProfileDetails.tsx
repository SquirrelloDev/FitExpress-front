import UserEditForm from "../../../components/UserEditForm/UserEditForm";
import UserHealthCard from "../../../components/UserHealthCard/UserHealthCard";
import {useOneUserListQuery} from "../../../queries/user/listing";
import useAuthStore from "../../../stores/authStore";
import btnStyles from '../../../sass/components/button.module.scss'
import clsx from "clsx";
import BackButton from "../../../components/BackBtn/BackButton";
import classes from "../../../sass/pages/profile-details.module.scss";
import Modal from "../../../components/Modal/Modal";
import AccountDeleteModal from "../../../components/AccountDeleteModal";
import {useDisclosure} from "@mantine/hooks";
import useUserDelete from "../../../queries/user/delete";
function ProfileDetails() {
    const [opened, {open, close}] = useDisclosure(false)
    const userData = useAuthStore(state => state.userData)
    const {data, isLoading} = useOneUserListQuery({id: userData.id, token: userData.token})
    const {mutate, isLoading: isDeleting} = useUserDelete()
    const deleteUser = () => {
      mutate({id: userData.id, token: userData.token})
    }
    return (
        <section className={classes.details}>
            <BackButton/>
            <h1>Moje dane</h1>
            {!isLoading && (
                <>
                    <UserEditForm token={userData.token} id={userData.id} name={data!.user.name} email={data!.user.email} phone={data!.user.phone}/>
                    <div>
                    {/*hasło*/}
                    </div>

                    <div>
                        <UserHealthCard healthData={data!.user.health_data} link={'/health/edit'}/>
                    </div>
                    <div className={classes.details__delete}>
                        <h2>Usuwanie konta</h2>
                        <p>Wszystkie dane konta zostaną usunięte. Utracisz dostęp do korzystania z aplikacji</p>
                        <p>Otrzymasz zwrot pieniędzy na konto bankowe w ciągu 3 dni od skasowania konta w przypadku istniejącej aktywnej diety.</p>
                        <button onClick={open} className={clsx(btnStyles.btn, btnStyles['btn--danger'])}>Usuń konto</button>
                    </div>
                    {opened &&
                    <Modal>
                         <AccountDeleteModal closeModal={close} isDeleting={isDeleting} deleteMutation={deleteUser}/>
                    </Modal>
                    }
                </>
            )}
        </section>
    )
}

export default ProfileDetails