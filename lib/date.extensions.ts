export {};

declare global {
  interface Date {
    format: (formatString: string) => string;
  }
}

Date.prototype.format = function (formatString: string)  {
  let formattedDate = formatString;
  const dateTokens = formatString.split(/[-: ]/g)

  dateTokens.forEach(token => {
    let date = '';
    switch (token) {
      case 'yyyy': {
        date = this.getFullYear().toString();
        break;
      }
      case 'MM': {
        date = (this.getMonth() + 1).toString().padStart(2, '0');
        break;
      }
      case 'dd': {
        date = this.getDate().toString();
        break;
      }
      case 'hh': {
        date = this.getHours().toString();
        break;
      }
      case 'mm': {
        date = this.getMinutes().toString();
        break;
      }
      case 'ss': {
        date = this.getSeconds().toString();
        break;
      }
    }
    formattedDate = formattedDate.replace(token, date.toString())
    
  })
  return formattedDate;
};
