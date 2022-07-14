class ApiError extends Error {
    status;
    error;
   
    constructor(status, message, error = null) {
        super(message, error);
        this.status = status;

        if(status == 400) this.error = 'bad_request';
        if(status == 401) this.error = 'unauthorized';
        if(status == 500) this.error = 'internal_server_error';
        if(error != null) this.error = error;
    } 

    static UnauthorizedError(message = 'Пользователь не авторизован') {
        return new ApiError(401, message);
    }

    static BadRequest(message) {
        return new ApiError(400, message);
    }

    static EmptyFields() {
        return new ApiError(400, 'Не все обязательные поля заполнены.');
    }
}

export default ApiError;