import { createSlice } from '@reduxjs/toolkit'
import ViewType from '../constants/ViewType'


const initialState = {
    divisionName: "",
    districtName: "",
    thanaName: "",
    instituteType: "",
    instituteName: "",
    eiinNo: "",
    trackingNo: "",
    latitude: "",
    longitude: "",
    latitudeSignboard: "",
    longitudeSignboard: "",
    reviewStatusId: "",
    viewType: ViewType.DATA,
    layerFor: 1
}

export const filterSlice = createSlice({
    name: 'filterState',
    initialState,
    reducers: {
        setMapFilter: (state, { payload }) => {

            state.divisionName = payload.divisionName;
            state.districtName = payload.districtName;
            state.thanaName = payload.thanaName;
            state.eiinNo = payload.eiinNo;
            state.latitude = payload.latitude;
            state.longitude = payload.longitude;
            state.latitudeSignboard = payload.latitudeSignboard;
            state.longitudeSignboard = payload.longitudeSignboard;
            state.trackingNo = payload.trackingNo;
            state.instituteName = payload.instituteName;
            state.instituteType = payload.instituteTypeId;
            state.reviewStatusId = payload.reviewStatusId;
            state.layerFor = payload.thanaName !== "" ? 3 : payload.districtName !== "" ? 2 : 1

        },

    },
})

export const { setMapFilter } = filterSlice.actions

export default filterSlice.reducer