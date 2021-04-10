import * as React from "react";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {Input} from "../../UIElements/Input";
import {SecondaryButton} from "../../UIElements/SecondaryButton";
import {ButtonSubmit} from "../../UIElements/ButtonSubmit";
import {useAppDispatch, useAppSelector} from "../../../store/Hooks";
import {uploadPhotoTeam, clearState} from "../../../store/addTeamSlice";
import {userSelector} from "../../../store/userSlice";
import {ReactComponent as AddPhoto} from "../../svgs/add_a_photo_24px_rounded.svg";
import styles from "./stylesAddTeam.module.css";

export type InputsAdd = {
    name: string;
    division: string;
    conference: string;
    yearOfFoundation: number;
    imageUrl: string;
}

export function AddTeam(): React.ReactElement {
    const [uploadingFile, setUploadingFile] = useState<File>();
    const uploadFile = (file: File) => {
        setUploadingFile(file);
    }

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, []);

    const onUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            uploadFile(event.target.files[0]);
        }
    }

    const {register, handleSubmit} = useForm<InputsAdd>();
    const dispatch = useAppDispatch();
    const {token} = useAppSelector(userSelector);
    const history = useHistory();
    const onSubmit: SubmitHandler<InputsAdd> = data => {
        dispatch(uploadPhotoTeam({
            uploadingImage: uploadingFile,
            collectedData: data,
            token: token
        })).then(() => history.push('/main/teams'));
    }

    return (
        <div className={styles.container}>
            <div>
                <p className={styles.pageName}>Teams / Add new team</p>
            </div>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className={uploadingFile ? styles.backgroundHidden : styles.photoPlace}>
                        <img className={uploadingFile ? styles.uploadedPic : styles.noPic}
                             src={uploadingFile ? URL.createObjectURL(uploadingFile) : ""} alt="uploaded"/>
                        <AddPhoto/>
                        <input type="file" className={styles.photoInput} onChange={onUpload}/>
                    </div>
                </div>
                <div className={styles.textForm}>
                    <Input ref={register} name="name" inputLineName="Name" inputType="inputTxt"/>
                    <Input ref={register} name="division" inputLineName="Division" inputType="inputTxt"/>
                    <Input ref={register} name="conference" inputLineName="Conference" inputType="inputTxt"/>
                    <Input ref={register} name="foundationYear" inputLineName="Year of foundation"
                           inputType="inputTxt"/>
                    <div className={styles.buttons}>
                        <SecondaryButton buttonName="Cancel" linkTo='/main/teams'/>
                        <ButtonSubmit buttonName="Save" buttonSize="short"/>
                    </div>
                </div>
            </form>
        </div>
    )
}
