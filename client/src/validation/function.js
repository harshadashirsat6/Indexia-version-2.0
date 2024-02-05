// function changeIntoDate(value) {

//     const numericValue = value.replace(/\D/g, '');
//     const formattedDate = numericValue.replace(/(\d{0,2})(\d{0,2})(\d{0,4})/, function(_, day, month, year) {
//       return (day ?  (+day>31?31:day) + (month ? '-' + (+month>12?12:month) + (year ? '-' + year : '') : '') : '');
//     });

//     return formattedDate


// }

// export {changeIntoDate}


function changeIntoDate(value, dateFormat) {
    const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters

    // const day = numericValue.slice(0, 2);
    // const month = numericValue.slice(2, 4);
    // const year = numericValue.slice(4, 8);

    // const formattedDay = ('00' + (+day > 31 ? 31 : +day)).slice(-2);
    // const formattedMonth = ('00' + (+month > 12 ? 12 : +month)).slice(-2);

    let formattedDate;

    switch (dateFormat) {
        case 'DD-MM-YYYY':
            // formattedDate = day ? `${formattedDay}-${formattedMonth}-${year}` : '';

        formattedDate = numericValue.replace(/(\d{0,2})(\d{0,2})(\d{0,4})/, function(_, day, month, year) {
      return (day ?  (+day>31?31:day) + (month ? '-' + (+month>12?12:month) + (year ? '-' + year : '') : '') : '');
    });

            break;
        case 'YYYY-MM-DD':
            formattedDate = numericValue.replace(/(\d{0,4})(\d{0,2})(\d{0,2})/, function(_, year,month,day) {
                console.log(year,month,day)
                

          return (year ? (year ? '' + year : '-')+  (month ? '-' + (+month>12?12:month)+(day?'-'+(day>31?31:day):'')    : '') : '');
        })
            break;
        default:
            formattedDate = '';
    }
    console.log(formattedDate)

    return formattedDate;
}

export { changeIntoDate };