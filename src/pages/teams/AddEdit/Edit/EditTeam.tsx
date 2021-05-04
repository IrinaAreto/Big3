import * as React from 'react';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {SubmitHandler} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../../../core/hooks/Hooks';
import {uploadPhotoTeam} from '../../../../modules/teamDetails/UploadPhotoTeamThunk';
import {editTeamCard} from '../../../../modules/teamDetails/EditTeamCardThunk';
import {clearState} from '../../../../modules/teamDetails/TeamDetailsSlice';
import {teamDetailsSelector} from '../../../../modules/teamDetails/TeamDetailsSelector';
import {userSelector} from '../../../../modules/user/UserSelector';
import {AddEditTeamInputs} from '../AddEditTeamInputs';
import {baseURL} from '../../../../api/BaseUrl';
import styles from '../stylesAddEditTeam.module.css';

export type InputsEdit = {
    name: string;
    division: string;
    conference: string;
    yearOfFoundation: number;
    imageUrl: string;
    id?: number;
}

export function EditTeam(): React.ReactElement {
    const [newUploadingFile, setNewUploadingFile] = useState<File>();
    const uploadFile = (file: File) => {
        setNewUploadingFile(file);
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
    const history = useHistory();
    let dataId = useParams();
    const {token} = useAppSelector(userSelector);
    const teamDetails = useAppSelector(teamDetailsSelector);

    const onSubmit: SubmitHandler<InputsEdit> = data => {
        data.id = teamDetails.id;
        data.imageUrl = teamDetails.imageUrl;

        newUploadingFile === undefined ?
            (dispatch(editTeamCard({
                collectedData: data,
                token: token
            })).then(() => history.push(`/main/teams/teamDetails/${dataId}`))) :
            (dispatch(uploadPhotoTeam({
                uploadingImage: newUploadingFile,
                token: token
            })).then((receivedData) => {
                data.imageUrl = baseURL + receivedData.payload;
                dispatch(editTeamCard({
                    collectedData: data,
                    token: token
                }))
            }).then(() => history.push(`/main/teams/teamDetails/${dataId}`)))
    }

    return (
        <div className={styles.container}>
            <div>
                <p className={styles.pageName}>Teams / Edit team</p>
            </div>
            <AddEditTeamInputs uploadingFile={newUploadingFile} onSubmit={onSubmit} onUpload={onUpload}
                               teamDetails={teamDetails}/>
        </div>
    )
}
