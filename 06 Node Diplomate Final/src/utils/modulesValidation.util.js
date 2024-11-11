import ResponseBuilderModules from './builders/responseBuilderModules.builder.js';

const modulesValidations = (name, schedule, location, proffesor, dependencies, timeLeft, state, absents, period, nextBlock, notes, homeworks) => {
    // Crear respuesta
    const response = new ResponseBuilderModules();

    //! --> Si no hay nombre
    if(!name){
        response.fieldErrors[0].messages.push("Name is required");
    }

    //! --> Si no hay horario
    if(!schedule){
        response.fieldErrors[1].messages.push("Schedule is required");
        console.log(response.fieldErrors[0].messages);
    }

    //! --> Si schedule no cumple con el formato

    //* --> Si esta todo correcto
    response.setOk(true)
    .setStatus(200)
    .setPayload({
        message: "Module created successfully",
    });
    return response;
}

export default modulesValidations;