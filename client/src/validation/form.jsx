function YupStringValidator(value) {
    const validator = {
      errorMessages:'',
  
      min(length,errorMessage) {
        if (value.length < length) {
          validator.errorMessages = `${errorMessage}`;
        }  
        return validator;
      },
      minNumber(total,errorMessage){
        if (+value<total) {
            validator.errorMessages = `${errorMessage}`;
          }  
          return validator;
      },
      length(length,errorMessage){
        if (value.length > length) {
            validator.errorMessages = `${errorMessage}`;
          }  
          return validator;
      },
      required(errorMessage) {
        if (value?.trim() === '') {
            validator.errorMessages = `${errorMessage}`;
        }
        return validator;
      },
      isInt(errorMessage){

        if (!Number.isInteger(Number(value))) {
            validator.errorMessages = `${errorMessage}`;
          }
        return validator;
      },
      matches(regex,errorMessage) {
        const panCardRegex = regex;
      
        if (!panCardRegex.test(value)) {
            validator.errorMessages = `${errorMessage}`;
        }
        return validator; 
      },
      test(fun,errorMessage){
        if (fun()) {
            validator.errorMessages = `${errorMessage}`;
        }
        return validator;
      },
      validate() {
        if (validator.errorMessages.length > 0) {
            return validator.errorMessages;

        }
        return false;
      },
      
    
    };
  
    return validator;
  }
  
  function YupString(value) {
    return YupStringValidator(value);
  }
  

  

  export default YupString