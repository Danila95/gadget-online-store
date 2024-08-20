/* Заготовка формы для ошибок */

export default class ApiError extends Error {
    public status: string;
    public message: string;

    constructor(status: string, message: string) {
        super(message)
        this.status = status
        this.message = message
    }

    static badRequest(message: string) {
        return new ApiError('404', message)
    }

    static internal(message: string) {
        return new ApiError('500', message)
    }

    static forbidden(message: string) {
        return new ApiError('403', message)
    }
}
