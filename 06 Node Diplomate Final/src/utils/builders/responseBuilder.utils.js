//* Clase que construye la respuesta de la API
class ResponseBuilder{
    response = {
        ok: false,
        status: 400,
        message: "",
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

export default ResponseBuilder;