import * as React from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {ReactComponent as AddPhoto} from "../../svgs/add_a_photo_24px_rounded.svg";
import {Input} from "../../UIElements/Input";
import {SecondaryButton} from "../../UIElements/SecondaryButton";
import {ButtonSubmit} from "../../UIElements/ButtonSubmit";
import {InputsAdd} from "./addNew/AddTeam";
import {ITeamDetails} from "../../../store/types";
import styles from "./stylesAddEditTeam.module.css";

interface AddEditProps {
    uploadingFile: File | undefined;
    onSubmit: SubmitHandler<InputsAdd>;
    onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    teamDetails?: ITeamDetails;
}

export function AddEditTeamInputs({uploadingFile, onSubmit, onUpload, teamDetails}: AddEditProps): React.ReactElement {
    const {register, handleSubmit} = useForm<InputsAdd>({defaultValues: teamDetails});

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className={uploadingFile || teamDetails?.imageUrl ? styles.backgroundHidden : styles.photoPlace}>
                    <img className={uploadingFile || teamDetails ? styles.uploadedPic : styles.noPic}
                         defaultValue={teamDetails?.imageUrl}
                         src={uploadingFile ? URL.createObjectURL(uploadingFile) : (teamDetails?.imageUrl ? teamDetails.imageUrl : "")}
                         alt="uploaded"/>
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
    )
}