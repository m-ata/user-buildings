import React, { useState, useContext } from 'react';
import { Container, Grid, Typography, AppBar, Button, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import AddBuilding from './AddBuilding';
import { AppContext } from '../../state/context';


const useStyles = makeStyles(() => ({
    container: {
        height: 400,
        border: 2,
        borderColor: 'gray',
        borderRadius: 5
    },
    list: {
        cursor: "pointer",
        "& .hiddenButton": {
            display: "none"
        },
        "&:hover .hiddenButton": {
            display: "inline"
        }
    }
}));

export const Index = () => {

    const classes = useStyles();
    const [buildingState, setBuildingState] = useState({
        formView: false,
        formType: '',
        selectedBuilding: null
    });
    const { formType, formView, selectedBuilding } = buildingState
    const { state, dispatch } = useContext(AppContext);

    const handleDelete = (id: number) => {
        dispatch({
            type: 'DELETE',
            payload: {
                id: id
            }
        })
    }

    return (
        <Container>
            <Grid container justify="flex-start" spacing={3} >
                <Grid item xs={4}>
                    <Typography component="div" className={classes.container} >
                        <AppBar color="primary" position="static">
                            Building List
                        </AppBar>
                        {
                            state?.buildings?.length > 0 && state.buildings.map((building, index) => {
                                return (
                                    building.userId === state.selectedUser &&
                                    <Typography component="div" key={index} className={classes.list}>
                                        { building.name}
                                        <IconButton
                                            aria-label="delete building"
                                            color="primary"
                                            onClick={() => handleDelete(building.id)}
                                        >
                                            <DeleteIcon className={'hiddenButton'} color={'primary'} />
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete building"
                                            color="primary"
                                            onClick={() => setBuildingState((prevState) => ({ ...prevState, formType: 'edit', formView: true, selectedBuilding: building }))}
                                        >
                                            <EditIcon className={'hiddenButton'} color={'primary'} />
                                        </IconButton>
                                    </Typography>
                                )
                            })
                        }
                        <Button color="primary" variant="contained"
                            onClick={() => {
                                setBuildingState((prevState) => ({ ...prevState, formType: 'add', formView: true }))
                            }} disabled={!state.selectedUser} >
                            Add Building
                        </Button>
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography component="div" className={classes.container} >
                        <AppBar color="primary" position="static">
                            {
                                formType === 'add' && <span> ADD </span>
                            }
                            {
                                formType === 'edit' && <span> EDIT </span>
                            }
                        </AppBar>
                        {
                            formView ? <AddBuilding formType={formType} formData={selectedBuilding} /> : <Typography>
                                Map View
                            </Typography>
                        }
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )

}