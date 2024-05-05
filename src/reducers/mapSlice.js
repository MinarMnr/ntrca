import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    fromPoint: [],
    toPoint: [],
    showRoute: true,
    zoomIn: 0,
    zoomOut: 0,
    circleCenter: { lat: 0, lng: 0 },
    surveyMarkerPoint: { lat: 0, lng: 0 },
    markerClickAndSelectCenterMode: false,
    radiusSearchInstitute: [],
    radiusSearchTableViewShow: false,
}

export const mapSlice = createSlice({
    name: 'routeState',
    initialState,
    reducers: {
        refresh: (state, { payload }) => {

            state.showRoute = payload;
        },
        setFromPoint: (state, action) => {
            state.fromPoint = [...action.payload]
        },
        setToPoint: (state, action) => {
            state.toPoint = [...action.payload]
        },
        clearPoints: (state, action) => {
            state.fromPoint = action.payload;
            state.toPoint = action.payload
        },
        zoomIn: (state, action) => {
            state.zoomIn = state.zoomIn + 1;
        },
        zoomOut: (state, action) => {
            state.zoomOut = state.zoomOut - 1;
        },
        setCircleCenter(state, action) {
            state.circleCenter = action.payload;
        },
        setSurveyMarkerPoint(state, action) {
            state.surveyMarkerPoint = action.payload;
        },
        setRadiusSearchMarkerMode(state, action) {
            state.markerClickAndSelectCenterMode = action.payload;
        },
        setRadiusSearchInstitute(state, action) {
            state.radiusSearchInstitute = action.payload;
        },
        setRadiusTableviewShowStatus(state, action) {
            state.radiusSearchTableViewShow = action.payload;
        }

    },
})

export const {
    setFromPoint,
    setToPoint,
    clearPoints,
    refresh,
    zoomIn,
    zoomOut,
    setCircleCenter,
    setRadiusSearchMarkerMode,
    setSurveyMarkerPoint,
    setRadiusSearchInstitute,

    setRadiusTableviewShowStatus

} = mapSlice.actions

export default mapSlice.reducer