import * as React from "react";
import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {SubmitHandler} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../../../store/Hooks";
import {uploadPhotoTeam, clearState, uploadTeamCard} from "../../../../store/teamDetailsSlice";
import {userSelector} from "../../../../store/userSlice";
import {AddEditTeamInputs} from "../AddEditTeamInputs";
import styles from "../stylesAddEditTeam.module.css";

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

    const dispatch = useAppDispatch();
    const {token} = useAppSelector(userSelector);
    const history = useHistory();
    let dataId = useParams();

    const onSubmit: SubmitHandler<InputsAdd> = data => {
        dispatch(uploadPhotoTeam({
            uploadingImage: uploadingFile,
            token: token
        })).then((receivedData) => {
            data.imageUrl = 'http://dev.trainee.dex-it.ru' + receivedData.payload;
            dispatch(uploadTeamCard({
                collectedData: data,
                token: token
            }))
        }).then(() => history.push(`/main/teams/teamDetails/${dataId}`));
    }

    return (
        <div className={styles.container}>
            <div>
                <p className={styles.pageName}>Teams / Add new team</p>
            </div>
            <AddEditTeamInputs uploadingFile={uploadingFile} onSubmit={onSubmit} onUpload={onUpload}/>
        </div>
    )
}
