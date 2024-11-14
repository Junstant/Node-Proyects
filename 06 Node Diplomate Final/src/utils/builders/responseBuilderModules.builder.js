//* Clase que construye la respuesta de la API
class ResponseBuilderModules{
    response = {
        ok: false,
        status: 400,
        message: "",
        fieldErrors: [
            {
                name: "name",
                messages: []
            },
            {
                name: "schedule",
                messages: []
            },
            {
                name: "location",
                messages: []
            },
            {
                name: "proffesor",
                messages: []
            },
            {
                name: "dependencies",
                messages: []
            },
            {
                name: "state",
                messages: []
            },
            {
                name: "period",
                messages: []
            },
        ],
        payload: {}
    }
    //Define la respuesta como correcta
    setOk(ok){
        this.response.ok = ok;
        return this;
    }
    //Define el estado de la respuesta
    setStatus(status){
        this.response.status = status;
        return this;
    }
    //Define el mensaje de la respuesta
    setMessage(message){
        this.response.message = message;
        return this;
    }

    //Define los errores de los campos
    setFieldErrors(fieldErrors){
        this.response.fieldErrors = fieldErrors;
        return this;
    }

    //Define el payload de la respuesta
    setPayload(payload){
        this.response.payload = payload;
        return this;
    }

    //Construye la respuesta
    build(){
        return this.response;
    }
}

export default ResponseBuilderModules;