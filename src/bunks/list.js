import remove from 'lodash.remove';
import findindex from 'lodash.findindex';

const edahOrder = ["hey","alpha","bet","gimmel","dalet","machal"];

function sortBunks(b1,b2){
  if (b1.edah !== b2.edah){
    return edahOrder.indexOf(b2.edah) - edahOrder.indexOf(b1.edah);
  }
  if (b1.gender !== b2.gender){
    return b2.gender < b1.gender;
  }
  return b2.name < b1.name;
}

var list = []
list.sort(sortBunks);

class BunkList {
  static getList(){
    return list;
  };

  static addBunk(bunk){
    list.push(bunk);
    list.sort(sortBunks);
  }

  static updateBunk(Bunk){
    let index = findindex(list,{name:Bunk.name});
    if (index>-1){
      list.splice(index,1,Bunk);
    }
  }

  static removeBunk(bunkToRemove){
    remove(list, bunk => bunk.name === bunkToRemove.name);
  }
}

export default BunkList;