module.exports = (string, size, char)=>{
    return Array(size-String(string).length+1).join(char||'0')+string;
}