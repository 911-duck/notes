class TextDeformation {
  constructor(str) {
    this.str = str;
  }

  ToUpper(FirstLetter) {
    if (FirstLetter === true) {
      let a = this.str.split('')
      a[0] = a[0].toUpperCase()
      return a.join('')
    } else {
      return this.str.toUpperCase()
    }
  }
  ListCreate(col,OlOrUl){
    let list = []
    for(col;col > list.length;){
        list.push(`<li>${this.str}</li>`)
    }
    if(OlOrUl === true){
      return '<ol>' + list.join(' ') + '</ol>'
    }
    else{
      return '<ul>' + list.join(' ') + '</ul>'
    }
  }
MathInit() {
 let d = this.str.split(' ').filter(el => {
 return !Number.isNaN(+el) || ['+', '-', '/', '*', '**', '%'].includes(el);
 });

 let op;
 d = d.reduce((sum, el, i) => {
 if (i === 0) {
 return +el;
 } else if (i % 2 !== 0) {
 op = el;
 return sum;
 } else {
 if (op === '+') {
 return sum + +el;
 } else if (op === '-') {
 return sum - +el;
 } else if (op === '/') {
 return sum / +el;
 } else if (op === '*') {
 return sum * +el;
 } else if (op === '**') {
 return sum ** +el;
 } else if (op === '%') {
 return sum % +el;
 }
 }
 }, 0);
 
 return d;
 }
grammaticalCorrect() {
  let vocabulary = {
  'брошюра': false,
  'парашют':  false,
  'жюри': false,
  'Жюль': false
}
        let d = this.str.split(' ');
        for (let i = 0; i < d.length; i++) {
            if (i > 0 && d[i - 1].length - 1 === '.') {
                if(d[i].length == 1){
                  d[i] = d[i][0].toUpperCase()
                }
                else{
                  d[i] = d[i][0].toUpperCase() + d[i].slice(1);
                }
            }
            if (d[i][0] === d[i][0].toUpperCase() && i > 0) {
                d[i - 1] += '.';
            }
            if (d[i].includes('ж') && d[i][d[i].indexOf('ж') + 1] === 'ы') {
                d[i] = d[i].slice(0, d[i].indexOf('ж')) + 'жи' + d[i].slice(d[i].indexOf('ж') + 2);
            }
            if (d[i].includes('ш') && d[i][d[i].indexOf('ш') + 1] === 'ы') {
                d[i] = d[i].slice(0, d[i].indexOf('ш')) + 'ши' + d[i].slice(d[i].indexOf('ш') + 2);
            }
            if (d[i].includes('ч') && d[i][d[i].indexOf('ч') + 1] === 'я') {
                d[i] = d[i].slice(0, d[i].indexOf('ч')) + 'ча' + d[i].slice(d[i].indexOf('ч') + 2);
            }
            if (d[i].includes('щ') && d[i][d[i].indexOf('щ') + 1] === 'я') {
                d[i] = d[i].slice(0, d[i].indexOf('щ')) + 'ща' + d[i].slice(d[i].indexOf('щ') + 2);
            }
            if (d[i].includes('ч') && d[i][d[i].indexOf('ч') + 1] === 'ю') {
                if(vocabulary[b[i]] == undefined){
                  d[i] = d[i].slice(0, d[i].indexOf('ч')) + 'чу' + d[i].slice(d[i].indexOf('ч') + 2);
                }
            }
            if (d[i].includes('щ') && d[i][d[i].indexOf('щ') + 1] === 'ю') {
                if(vocabulary[b[i]] == undefined){
                  d[i] = d[i].slice(0, d[i].indexOf('щ')) + 'щу' + d[i].slice(d[i].indexOf('щ') + 2);
                }
            }
        }
        d[0] = d[0][0].toUpperCase() + d[0].slice(1);
        return d.join(' ');
    }
}
export default TextDeformation