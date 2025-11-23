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
export default JsonToggles