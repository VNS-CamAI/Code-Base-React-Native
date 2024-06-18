const { GET_INFO_USER, GET_USER_TYPE_CODE, GET_EMAIL, SET_INFO_LOGIN_USER } = require("../actions/getUserAction")

const initialState = {
    userInfo: {},
    userTypeCode: null,
    email: null,
    infoLoginUser: {
        name: '',
        userName: '',
        companyTax: '',
    }
};

const userReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
        case GET_INFO_USER:
            return {
                ...state,
                userInfo: action.payload
            }
        case GET_USER_TYPE_CODE:
            return {
                ...state,
                userTypeCode: action.payload
            }
        case GET_EMAIL:
            return {
                ...state,
                email: action.payload
            }
            case SET_INFO_LOGIN_USER: {
                return {
                    ...state,
                    infoLoginUser: {
                        name: action.payload.name,
                        userName: action.payload.userName,
                        companyTax: action.payload.companyTax,
                    }
                }
            }
        default:
            return state
    }
}

export default userReducer;