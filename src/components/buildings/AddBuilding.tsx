import React, { useEffect, useState, useContext } from 'react';
import {
    Container, Button, FormGroup,
    FormControl, FormLabel, TextField, Select, MenuItem, InputLabel, Grid
} from '@material-ui/core';
import * as data from './../../data/countriesList.json';
import { AppContext } from '../../state/context';

const AddBuilding = () => {

    const [addBuildingState, setAddBuildingState] = useState({
        locations: [],
        locationId: '',
        buildingName: '',
    });
    const { locationId, locations, buildingName } = addBuildingState;
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        data && data.locations && setAddBuildingState((prevState) => ({ ...prevState, locations: data.locations }))
    }, []);

    const handleSubmit = () => {
        dispatch({
            type: 'CREATE',
            payload: {
                id: `building-${state.buildings.length + 1}`,
                name: buildingName,
                userId: state.selectedUser,
                locationId: locationId
            }
        })
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
                <Grid xs={8}>
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