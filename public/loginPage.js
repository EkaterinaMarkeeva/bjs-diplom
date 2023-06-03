"use strict"

const userForm = new UserForm();
userForm.loginFormCallback = function(data) {
    const callback = (serverResponse) => {
        if (serverResponse.success) {
            location.reload();
        } else {
            this.setLoginErrorMessage(serverResponse.error);
        }
    };
    ApiConnector.login(data, callback);
};

userForm.registerFormCallback = function(data) {
    const callback = (serverResponse) => {
        if (serverResponse.success) {
            location.reload();
        } else {
            this.setRegisterErrorMessage(serverResponse.error);
        }
    };
    ApiConnector.register(data, callback);
};