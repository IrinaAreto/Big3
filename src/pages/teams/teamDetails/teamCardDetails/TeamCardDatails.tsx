import * as React from 'react';
import {useHistory} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../../core/hooks/Hooks';
import {deletePhotoTeam} from '../../../../modules/teamDetails/DeletePhotoTeamThunk';
import {teamDetailsSelector} from '../../../../modules/teamDetails/TeamDetailsSelector';
import {deleteTeamDetails} from '../../../../modules/teamDetails/DeleteTeamDetailsThunk';
import {ReactComponent as Pencil} from '../../../../assets/svgs/create_rounded.svg';
import {ReactComponent as Garbage} from '../../../../assets/svgs/delete_rounded.svg';
import styles from './styles.module.css';

export function TeamCardDetails(): React.ReactElement {
    const teamDetails = useAppSelector(teamDetailsSelector);
    const dispatch = useAppDispatch();
    const history = useHistory();

    const editTeam = () => {
        history.push('/main/teams/editTeam');
    }

    let url = teamDetails.imageUrl.replace('http://dev.trainee.dex-it.ru/', '/');

    const deleteTeam = () => {
        dispatch(deleteTeamDetails({
            id: teamDetails.id,
            token: localStorage.getItem('token')
        })).then(() => {
            dispatch(deletePhotoTeam({
                imageURL: url,
                token: localStorage.getItem('token')
            }))
        }).then(() => history.push('/main/teams'));
    }

    return (
        <div className={styles.cardContainer}>
            <div className={styles.upperPart}>
                <p className={styles.namePath}>Teams / {teamDetails.name}</p>
                <div className={styles.addDelete}>
                    <Pencil onClick={editTeam} className={styles.iconPencil}/>
                    <Garbage onClick={deleteTeam} className={styles.iconGarbage}/>
                </div>
            </div>
            <div className={styles.lowerPart}>
                <div className={styles.teamLogo}>
                    <img className={styles.logoImg} src={teamDetails.imageUrl}/>
                </div>
                <div className={styles.teamInfo}>
                    <div><p className={styles.teamName}>{teamDetails.name}</p></div>
                    <div className={styles.firstLine}>
                        <div><p className={styles.label}>Year of foundation</p>
                            <p className={styles.teamData}>{teamDetails.foundationYear}</p></div>
                        <div><p className={styles.label}>Division</p>
                            <p className={styles.teamData}>{teamDetails.division}</p></div>
                    </div>
                    <div><p className={styles.label}>Conference</p>
                        <p className={styles.teamData}>{teamDetails.conference}</p></div>
                </div>
            </div>
        </div>
    )
}