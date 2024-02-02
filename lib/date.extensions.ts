export {};

declare global {
  interface Date {
    format: (formatString: string) => string;
    tokenize: (dateToken: string) => string;
  }
}

type DateToken = "y" | "M" | "d" | "h" | "m" | "s";
Date.prototype.tokenize = function (dateToken: string) {
  const dateGetterMap = {
    y: () => this.getFullYear(),
    M: () => this.getMonth() + 1, // months are zero-based, so add 1
    d: () => this.getDate(),
    h: () => this.getHours() > 12 ? this.getHours() - 12 : this.getHours(),
    H: () => this.getHours(),
    m: () => this.getMinutes(),
    s: () => this.getSeconds(),
    a: () => this.getHours() < 12 ? 'AM' : 'PM'
  };
  let dateString = dateGetterMap[dateToken[0] as DateToken]().toString();
  const dateLength = dateString.length;
  // Date 객체에서 가져온 문자열이 포맷 토큰보다 짧으면 앞에 0 추가, 길면 그만큼 제거
  // 오전/오후는 제외.
  if (dateToken[0] === 'a') return dateString;
  if (dateToken.length > dateLength)
    dateString = dateString.padStart(dateToken.length, '0');
  else if (dateToken.length < dateLength)
    dateString = dateString.slice(dateToken.length - dateLength);
  return dateString;
};

Date.prototype.format = function (formatString: string) {
  let formattedDate = formatString;
  const dateTokens = formatString.split(/[-:,\/ ]/g).filter(token => token.length != 0);
  const dateTokenPattern = /^(\S)\1*$/; // check if all characters are same.
  console.log(dateTokens)
  if (dateTokens.every((token) => dateTokenPattern.test(token)))
    for (let token of dateTokens) {

      // dateToken이 모두 같은 문자여야 한다.
      const splittedToken = token.split("");
      if (!splittedToken.every((char) => char === token[0])) break;
      const tokenizedDate = this.tokenize(token)
      formattedDate = formattedDate.replace(token, tokenizedDate);
    }
    else throw new Error('Date format invalid')
  return formattedDate;
};
