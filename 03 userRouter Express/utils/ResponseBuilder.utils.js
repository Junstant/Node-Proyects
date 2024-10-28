class ResponseBuilder{
    static codes = Object.freeze({ // Objeto con los codigos de respuesta inmutables
        GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
        GET_USER_SUCCESS: 'GET_USER_SUCCESS',
        CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
        UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
        DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
        GET_USER_NOT_FOUND: 'GET_USER_NOT_FOUND',
        CREATE_USER_ERROR: 'CREATE_USER_ERROR',
        UPDATE_USER_ERROR: 'UPDATE_USER_ERROR',
        DELETE_USER_ERROR: 'DELETE_USER_ERROR',
        GET_USERS_ERROR: 'GET_USERS_ERROR',
    });

    // Constructor de la clase ResponseBuilder que va a ser la plantilla de respuestas
    constructor(){
        // Inicializamos la respuesta el caso mas comun es que la respuesta no sea correcta
        this.response = {
            ok: false,
            status: 500,
            payload: {},
        }
    }
    // Metodo para cambiar el estado de la respuesta
    setStatus(status){
        this.response.status = status;
        return this;
    }
    // Metodo para cambiar el payload de la respuesta
    setOk(ok){
        this.response.ok = ok;
        return this;
    }
    setCode(code){
        this.response.payload.code = code;
        return this;
    }
    // Metodo para cambiar el payload de la respuesta
    setPayload(payload){
        this.response.payload = payload;
        return this;
    }
    // Metodo para construir la respuesta
    build(){
        return this.response;
    }
}
//* Esta clase nos permite construir respuestas de una manera mas ordenada y facil de entender
// const anwser = new ResponseBuilder();
// anwser.setOk(true).setStatus(200).setPayload({message: 'Hola mundo'}).build();

export default ResponseBuilder;