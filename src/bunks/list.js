import remove from 'lodash.remove';

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

var list = [
  {edah: "hey",   gender:"boys",  name:"b1"},
  {edah: "hey",   gender:"boys",  name:"b2"},
  {edah: "hey",   gender:"girls", name:"g1"},
  {edah: "hey",   gender:"girls", name:"g2"},
  {edah: "alpeh", gender:"boys",  name:"b3"},
  {edah: "alpeh", gender:"boys",  name:"b4"},
  {edah: "alpeh", gender:"girls", name:"g3"},
  {edah: "alpeh", gender:"girls", name:"g4"},
]
list.sort(sortBunks);

class BunkList {
  static getList(){
    return list;
  };

  static addBunk(edah,gender,name){
    list.push({edah:edah,gender:gender,name:name});
    list.sort(sortBunks);
  }

  static removeBunk(name){
    remove(list, bunk => bunk.name === name);
  }
}

export default BunkList;