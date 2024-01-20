const numberWithSpaces = (numbers:number)=> {
    return numbers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

}
export default numberWithSpaces