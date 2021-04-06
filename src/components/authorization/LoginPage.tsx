import * as React from "react";
import {useEffect} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {NavLink, Redirect, useRouteMatch} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/Hooks";
import {clearState, userSelector} from "../../store/userSlice";
import {Input} from "../UIElements/Input";
import {Button} from "../UIElements/Button";
import {loginUser} from "../../store/userSlice";
import {ReactComponent as Group} from "../svgs/Group.svg";
import styles from "./styles.module.css";

export type InputsLogin = {
    login: string;
    password: string;
};

export function LoginPage(): React.ReactElement {
    const {register, handleSubmit} = useForm<InputsLogin>();
    const dispatch = useAppDispatch();
    const {token, isSuccess, isError, errorMessage} = useAppSelector(userSelector);
    let {url} = useRouteMatch();

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

        if (isError) {
            console.log("err: ", errorMessage);
            dispatch(clearState());
        }
    }, [isSuccess, isError]);

    return (
        !!token ? <Redirect to="main/teams"/> :
        <div className={styles.signinPage}>
            <div className={styles.signinSide}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.signinWords}>Sign In</div>
                    <Input name="login" ref={register} inputLineName="Login" inputType="login"/>
                    <Input name="password" ref={register} inputLineName="Password" inputType="pswd"/>
                    <Button buttonName="Sign In" buttonType="signin"/>
                    <div className={styles.moveToSignUp}>
                        <p>Not a member yet? <NavLink to="/signup" className={styles.moveToSignUpLink}>Sign up</NavLink>
                        </p>
                    </div>
                </form>
            </div>
            <div className={styles.pictureSide}>
                <Group className={styles.picture}/>
            </div>
        </div>
    )
}
