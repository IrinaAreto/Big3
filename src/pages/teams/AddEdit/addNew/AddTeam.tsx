import * as React from 'react';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {SubmitHandler} from 'react-hook-form';
import {InputsAdd} from '../../../../core/redux/types/InputsAdd';
import {useAppDispatch, useAppSelector} from '../../../../core/hooks/Hooks';
import {uploadPhotoTeam} from '../../../../modules/teamDetails/UploadPhotoTeamThunk';
import {uploadTeamCard} from '../../../../modules/teamDetails/UploadTeamCardThunk';
import {clearState} from '../../../../modules/teamDetails/TeamDetailsSlice';
import {userSelector} from '../../../../modules/user/UserSelector';
import {AddEditTeamInputs} from '../AddEditTeamInputs';
import {baseURL} from '../../../../api/BaseUrl';
import styles from '../stylesAddEditTeam.module.css';

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
            data.imageUrl = baseURL + receivedData.payload;
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
