import { removeItemOnce } from "./ArrayUtils";
import { TIME_KEY } from "./constants";

export const isStringInArrayWithKey =(key:string,target:string)=>{
  return valueAsArray(key).includes(target);
}

export const addStringToArrayWithKey =(key:string,target:string)=>{
  const tmp = valueAsArray(key);
  tmp.push(target);
  localStorage[key] = JSON.stringify(tmp);
}

export const addNumToArrayWithKey =(key:string,target:number)=>{
  const tmp = valueAsArray(key);
  tmp.push(target);
  localStorage[key] = JSON.stringify(tmp);
}


export const removeStringFromArrayWithKey =(key:string,target:string)=>{
  let tmp = valueAsArray(key);
  tmp = removeItemOnce(tmp, target);
  localStorage[key] = JSON.stringify(tmp);
}

export const initEmptyArrayAtKey =(key:string)=>{
  const tmp:any[] = [];
  localStorage[key] = JSON.stringify(tmp);
  return tmp;
}

export const initArrayWithInitialValuesAtKey =(key:string, values:any[])=>{
  localStorage[key] = JSON.stringify(values);
}

export const valueAsArray = (key: string)=>{
  if(localStorage[key]){
    return JSON.parse(localStorage[key]) as any[];
  }else{
    return initEmptyArrayAtKey(key);
  }
}


export const saveTime = (index: number, timeNumber: number)=>{
  const storedValues = localStorage.getItem(TIME_KEY);
  console.log(`JR NOTE: trying to store ${timeNumber} at ${index}`)
  let ret = false;
  if(storedValues){
    const parsedValues = valueAsArray(TIME_KEY);
    //only save it if its smaller plz
    if(parsedValues[index]){
      console.log(`JR NOTE: parsed value is ${parsedValues[index]}`)

      if(timeNumber < parsedValues[index]){
        console.log("JR NOTE: Congrats on beating your personal best :) :) :)")
        parsedValues[index] = timeNumber;
        ret = true;
      }
    }else{
      console.log("JR NOTE: Congrats on beating this level for the first time!")
      parsedValues[index] = timeNumber;
      ret =  true;
    }

    console.log("JR NOTE: about to store the value like so: ", parsedValues)
    localStorage.setItem(TIME_KEY, JSON.stringify(parsedValues));
  }else{
    console.log("JR NOTE: Congrats for starting this journey!")
    initArrayWithInitialValuesAtKey(TIME_KEY, [timeNumber]);
    ret = true;
  }
  return ret;
}