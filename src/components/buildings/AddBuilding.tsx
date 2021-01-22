import React, { useEffect, useState, useContext } from 'react';
import {
    Container, Button,
    FormControl, FormLabel, TextField, Select, MenuItem, InputLabel, Grid
} from '@material-ui/core';
import * as data from './../../data/countriesList.json';
import { AppContext } from '../../state/context';
import { Building } from '../../models';
import { Types } from '../../state/constants';

interface BuildingProps {
    formType: string,
    formData?: Building,

}

const AddBuilding: React.FC<BuildingProps> = (props) => {
    
    const [addBuildingState, setAddBuildingState] = useState({
        locations: [],
        locationId: props?.formData?.locationId || '',
        buildingName: props?.formData?.name || '',
    });
    const { locationId, locations, buildingName } = addBuildingState;
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        data?.locations && setAddBuildingState((prevState) => ({ ...prevState, locations: data.locations }))
    }, []);

    useEffect(() => {
        props?.formType === 'edit' && setAddBuildingState((prevState) => ({ ...prevState, buildingName: props?.formData?.name, locationId: props?.formData?.locationId }));
    }, [props?.formType]);

    const handleSubmit = () => {
        props?.formType === 'add' ?
        dispatch({
            type: Types.CREATE,
            payload: {
                id: `building-${state.buildings.filter(x => x.userId === state.selectedUser).length + 1}`,
                name: buildingName,
                userId: state.selectedUser,
                locationId: locationId
            }
        }) : dispatch({
            type: Types.EDIT,
            payload: {
                id: props?.formData?.id,
                name: buildingName,
                userId: state.selectedUser,
                locationId: locationId
            }
        })
        setAddBuildingState((prevState) => ({ ...prevState, buildingName: '', locationId: '' }))
    }

    return (
        <Container>
            <Grid container>
                <Grid item xs={4}>
                    <FormControl>
                        <FormLabel component="legend"> Name </FormLabel>

                    </FormControl>
                </Grid>
                <Grid item xs={8}>
                    <FormControl>
                        <TextField variant="outlined" value={buildingName}
                            onChange={(e: React.ChangeEvent<{ value: string }>) => {
                                e.persist();
                                setAddBuildingState((prevState) => ({ ...prevState, buildingName: e.target.value }))
                            }} />
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={4}>
                    <FormControl>
                        <FormLabel component="legend"> Location </FormLabel>
                    </FormControl>
                </Grid>
                <Grid item xs={8}>
                    <FormControl>
                        <InputLabel htmlFor="grouped-native-select">Select Location</InputLabel>
                        <Select
                            value={locationId}
                            variant="outlined"
                            onChange={(e: React.ChangeEvent<{ value: string }>) => {
                                setAddBuildingState((prevState) => ({ ...prevState, locationId: e.target.value }))
                            }}
                        >
                            {
                                locations.length && locations.map(loc => {
                                    return <MenuItem key={loc.id} value={loc.id}> {loc.name} </MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Button variant="outlined" onClick={handleSubmit} > CREATE </Button>
        </Container>
    )
}
export default AddBuilding;