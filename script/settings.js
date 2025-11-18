let vocabulary = {
  'брошюра': false,
  'парашют':  false,
  'жюри': false,
  'Жюль': false
}
class JsonToggles {
    constructor(arr, key) {
        this.arr = arr
        this.key = key
    }
    SaveItem(){
        if(typeof this.arr == 'string'){
            localStorage.setItem(this.key, this.arr)
        }else{
            localStorage.setItem(this.key, JSON.stringify(this.arr))
        }
    }
    GetItem(){
        if(JSON.parse(localStorage.getItem(this.key))[0] == '[' || '{'){
        return JSON.parse(localStorage.getItem(this.key))
        }
        else{
            return localStorage.getItem(this.key)
        }
    }
     ToJson() {
     return JSON.stringify(this.arr)
    }
    ToArr() {
        return JSON.parse(this.arr)
    }
}
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

const str = new TextDeformation('привет');
let a = str.ListCreate(3, true)
let b = str.ToUpper(true)
console.log(a);
console.log(b);
const str2 = new TextDeformation('жы шы чю щю чя щя')
let a2 = str2.grammaticalCorrect()
console.log(a2)
