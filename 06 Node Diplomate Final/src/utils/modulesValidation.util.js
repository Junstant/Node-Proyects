import ResponseBuilderModules from './builders/responseBuilderModules.builder.js';


const resHelp = (response, field, message) => {
    console.log(response, field, message);
    response.response.fieldErrors[field].messages.push(message);
    response.setOk(false);
    response.setStatus(400);
    response.setPayload({
        message: "Module not created",
    });
    return response;
};

const modulesValidations = (name, schedule, location, proffesor, dependencies, state, period) => {
    // Crear respuesta
    const response = new ResponseBuilderModules();

    //! --> Si no hay nombre
    if(!name){
        resHelp(response, 0, "Name is required");
    }
    //! --> Si la cantidad de caracteres del nombre es 0
    if(name.trim().length === 0){
        resHelp(response, 0, "Name has to be at least 1 character long");
    }
    //! --> Si el nombre no es un string
    if(typeof name !== 'string'){
        resHelp(response, 0, "Name has to be a string");
    }

    //! --> Si no hay horario
    if(!schedule){
        resHelp(response, 1, "Schedule is required");
    }

    //! --> Si schedule no cumple con el formato correcto de schedule.schema.js
    const daysV = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
    const fromHrV = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    const toHrV = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    //Verfica si hay un schedule y si es un array
    if(Array.isArray(schedule)){
        schedule.forEach((day) => {
            if(!day.name){
                resHelp(response, 1, "Day name is required");
            }
            if(typeof day.name !== 'string'){
                resHelp(response, 1, "Day name has to be a string");
            }
            if(!daysV.includes(day.name)){
                resHelp(response, 1, "Day name has to be a valid day of the week");
            }

            if(!day.fromHr){
                resHelp(response, 1, "From hour is required");
            }
            if(!fromHrV.test(day.fromHr)){
                resHelp(response, 1, "The format of from hour has to be HH:MM");
            }

            if(!day.toHr){
                resHelp(response, 1, "To hour is required");
            }
            if(!toHrV.test(day.toHr)){
                resHelp(response, 1, "The format of to hour has to be HH:MM");
            }
        });
    }

    //! --> Si no hay ubicación
    if(!location){
        resHelp(response, 2, "Location is required");
    }

    //! --> Si no hay profesor
    if(!proffesor){
        resHelp(response, 3, "Proffesor is required");
    }

    //! --> Si no hay dependencias
    if(!dependencies){
        resHelp(response, 4, "Dependencies are required");
    }

    //! --> Si las dependencias no son un array o no tienen el formato correcto
    if(Array.isArray(dependencies)){
        dependencies.forEach((dependency) => {
            if(!dependency){
                resHelp(response, 4, "Dependency is required");
            }
        });
    }

    //! --> Si no hay estado o no tiene el formato correcto
    const statesV = ['In Progress', 'Approved', 'Failed', 'Pending'];
    if(!state){
        resHelp(response, 5, "State is required");
    }
    if(!statesV.includes(state)){
        resHelp(response, 5, "State has to be a valid state");
    }

    //! --> Si no hay periodo
    if(!period){
        resHelp(response, 6, "Period is required");
    }

    //! --> Si el periodo no es un objeto
    if(typeof period !== 'object'){
        resHelp(response, 6, "Period has to be an object");
    }

    //! --> Si la propiedad year no es un número
    if(!period.year){
        resHelp(response, 6, "Year is required");
    }

    if(typeof period.year !== 'number'){
        resHelp(response, 6, "Year has to be a number");
    }

    //! --> Si la propiedad semester un string o no cumple con el formato correcto
    const semestersV = ['Bimonthly','Quarterly','Four-monthly','Annual'];

    if(!period.semester){
        resHelp(response, 6, "Semester is required");
    }
    if(typeof period.semester !== 'string'){
        resHelp(response, 6, "Semester has to be a string");
    }
    if(!semestersV.includes(period.semester)){
        resHelp(response, 6, "Semester has to be a valid semester");
    }

    // //! --> Si hubo un error en la validación
    if (response.ok === false) {
        return response;
    }

    //* --> Si esta todo correcto
    response.setOk(true);
    response.setStatus(200);
    response.setPayload({
        message: "Module created successfully",
    });
    return response;
}

export default modulesValidations;