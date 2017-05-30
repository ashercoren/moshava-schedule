import remove from 'lodash.remove';
import findindex from 'lodash.findindex';

const list = [];

class ActivityList {

  static getList(){
    return list;
  };

  static addActivity(activity){
    list.push(activity);
  }

  static updateActivity(activity){
    let index = findindex(list,{name:activity.name});
    if (index>-1){
      list.splice(index,1,activity);
    }
  }

  static removeActivity(name){
    remove(list, activity => activity.name === name);
  }
}

export default ActivityList;