export const getUnique=(arraydata=[])=>{

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  
  var unique = arraydata.filter(onlyUnique);

return unique
}