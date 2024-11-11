const modulesValidations = (name, schedule, location, proffesor, dependencies, timeLeft, state, absents, period, nextBlock, notes, homeworks) => {
    
    //! --> Si no hay nombre
    if(!name){
        response.fieldErrors[0].messages.push("Name is required");
    }

    //! --> Si no hay horario
    if(!schedule){
        response.fieldErrors[1].messages.push("Schedule is required");
    }
}