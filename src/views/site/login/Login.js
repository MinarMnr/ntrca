import * as Yup from 'yup';

class LoginModel {

    /**
     * Model properties
     */
    constructor() {
        this.username = '';
        this.password = '';
    }

    /**
     * Get model instance from json
     */
    fromJson(data = {}) {
        let obj = new LoginModel();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }
        obj.username = data.username ?? '';
        obj.password = data.password ?? '';
        return obj;
    }

    /**
     * Get string from model instance
     */
    toString(data = {}) {
        let obj = new LoginModel()
            .fromJson(data);
        return JSON.stringify(obj);
    }

    /**
     * Validator schema
     */
    validator() {
        return Yup.object().shape({
            username: Yup.string()
                .required('Required'),
            password: Yup.string()
                .required('Required'),
        });
    }

}

export const Login = new LoginModel();
