import * as React from 'react';
import {useEffect} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {NavLink, Redirect} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../core/hooks/Hooks';
import {clearState} from '../../modules/user/UserSlice';
import {userSelector} from '../../modules/user/UserSelector';
import {Input} from '../../ui/input/Input';
import {ButtonSubmit} from '../../ui/buttons/ButtonSubmit';
import {loginUser} from '../../modules/user/LoginUserThunk';
import {ReactComponent as Group} from '../../assets/svgs/Group.svg';
import styles from './styles.module.css';

export type InputsLogin = {
    login: string;
    password: string;
};

export function LoginPage(): React.ReactElement {
    const {register, handleSubmit} = useForm<InputsLogin>();
    const dispatch = useAppDispatch();
    const {token, isSuccess, isError} = useAppSelector(userSelector);

    const onSubmit: SubmitHandler<InputsLogin> = async data => {
        await dispatch(loginUser(data))
    };

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, []);

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearState());
        }
    }, [isSuccess]);

    return (
        !!token ? <Redirect to='main/teams'/> :
            <div className={styles.signinPage}>
                <div className={styles.signinSide}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.signinWords}>Sign In</div>
                        <Input name='login' ref={register} inputLineName='Login' inputType='inputTxt'/>
                        <Input name='password' ref={register} inputLineName='Password' inputType='pswd' err={isError}/>
                        <ButtonSubmit buttonName='Sign In' buttonSize='long'/>
                        <div className={styles.moveToSignUp}>
                            <p>Not a member yet? <NavLink to='/signup' className={styles.moveToSignUpLink}>Sign
                                up</NavLink>
                            </p>
                        </div>
                    </form>
                </div>
                <div className={styles.pictureSide}>
                    {isError ?
                        <div className={styles.notification}>
                            <div className={styles.notificationText}>User with the specified username / password was not
                                found.
                            </div>
                        </div>
                        : ''}
                    <Group className={styles.picture}/>
                </div>
            </div>
    )
}
