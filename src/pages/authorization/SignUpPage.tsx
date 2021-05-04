import * as React from 'react';
import {useEffect} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {NavLink, Redirect} from 'react-router-dom';
import {SignUpType} from '../../core/redux/types/SignUpType';
import {Input} from '../../ui/input/Input';
import {ButtonSubmit} from '../../ui/buttons/ButtonSubmit';
import {Checkbox} from '../../ui/checkbox/Checkbox';
import {ReactComponent as SignUpPic} from '../../assets/svgs/signup.svg';
import {useAppSelector, useAppDispatch} from '../../core/hooks/Hooks';
import {signupUser} from '../../modules/user/SignupUserThunk';
import {userSelector} from '../../modules/user/UserSelector';
import {clearState} from '../../modules/user/UserSlice';
import styles from './styles.module.css';

type InputsSignUp = {
    userName: string;
    login: string;
    password: string;
    passwordRepeat: string;
    acceptAgreement: boolean;
}

export function SingUpPage(): React.ReactElement {
    const {register, handleSubmit} = useForm<InputsSignUp>();
    const dispatch = useAppDispatch();
    const {token, isSuccess, isError, errorMessage} = useAppSelector(userSelector);

    const onSubmit: SubmitHandler<InputsSignUp> = data => {
        let signUpData: SignUpType = {
            userName: '',
            login: '',
            password: ''
        };
        if (data.password === data.passwordRepeat && data.acceptAgreement) {
            signUpData.userName = data.userName;
            signUpData.login = data.login;
            signUpData.password = data.password;
        }
        dispatch(signupUser(signUpData));
    }

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, []);

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearState());
        }

        if (isError) {
            console.log(errorMessage);
            dispatch(clearState());
        }
    }, [isSuccess, isError]);

    return (
        !!token ? <Redirect to='main/teams'/> :
            <div className={styles.signinPage}>
                <div className={styles.signinSide}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.signinWords}>Sign Up</div>
                        <Input name='userName' ref={register} inputLineName='Name' inputType='inputTxt'/>
                        <Input name='login' ref={register} inputLineName='Login' inputType='inputTxt'/>
                        <Input name='password' ref={register} inputLineName='Password' inputType='pswd'/>
                        <Input name='passwordRepeat' ref={register} inputLineName='Enter your password again'
                               inputType='pswd'/>
                        <Checkbox name='acceptAgreement' checkboxText='I accept the agreement' id='acceptAgr'
                                  ref={register}/>
                        <ButtonSubmit buttonName='Sign In' buttonSize='long'/>
                        <div className={styles.moveToSignUp}>
                            <p>Already a member? <NavLink to='/' className={styles.moveToSignUpLink}>Sign
                                in</NavLink>
                            </p>
                        </div>
                    </form>
                </div>
                <div className={styles.pictureSide}>
                    <SignUpPic className={styles.picture}/>
                </div>
            </div>
    )
}
