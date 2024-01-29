//http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
export function getParameterByName(name: string, url: string | null) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
export const addImageProcess = (src: string) => {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export const isItFriday = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const friday = urlParams.get('friday'); //you can escape friday if you say its not friday
  console.log("JR NOTE: is it friday?", new Date().getDay())
  if (((new Date().getDay() === 5 && friday !== "false") || friday === "true")) {
    return true;
  }
  return false;

}

//if you give it new values for existing params it layers them on
export const updateURLParams = (params: string) => {

  //if we're not overwriting we want it to handle 
  const queryString = window.location.search;
  const currentParams = new URLSearchParams(queryString);
  const newParams = new URLSearchParams(params);

  //overwrites original, adds new
  for (let [key, value] of newParams) {
    currentParams.set(key, value);
  }

  //params += `&${urlParams.toString()}`;
  var pageUrl = '?' + `${currentParams.toString()}`;
  window.history.pushState('', '', pageUrl);
}