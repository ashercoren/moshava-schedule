import remove from 'lodash.remove';

const list = [
    {name:"Swimming",         location:"Pool"},
    {name:"BasketBall",       location:"Boys Court"},
    {name:"Chavaya Yisraelit",location:"Chavaya Tent"}
];

class ActivityList {

  static getList(){
    return list;
  };

  static addActivity(name,location){
    list.push({name:name,location:location});
  }

  static removeActivity(name){
    remove(list, activity => activity.name === name);
  }
}

export default ActivityList;