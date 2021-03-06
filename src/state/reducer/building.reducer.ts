import { Building } from './../../models/index';
const buildingReducer = (state: Building[], action: any) => {
  switch (action.type) {
    case 'CREATE':
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          userId: action.payload.userId,
          locationId: action.payload.locationId
        }
      ]
    case 'DELETE':
      return [
        ...state.filter(building => building.id !== action.payload.id),
      ]
    case 'EDIT':
      const updatedBuilding = action.payload;

      const updatedBuildings = state.map(building => {
        if (building.id === updatedBuilding.id)
            return updatedBuilding;
        else return building;
      });
      return updatedBuildings;
    default:
      return state;
  }
}
export default buildingReducer;