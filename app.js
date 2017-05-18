const appState={
    results: [],
    hasSearched: false,
    userInput:{
        title:' ',
        description:' '
    }
}

const baseURL="http://tastedive-proxy.herokuapp.com/api/similar";
/////////////Mod Functions////////////////////////
function getDataFromApi(searchQuery,callback){
    const query={
      k:"270170-ThinfulC-SJOP8QJA",
      q: searchQuery,
      limit: 6,
      info: 1
     }
    $.getJSON(baseURL, query, callback);
}

function modState(data){
	//console.log(data);
	data.similar.results.forEach(function(obj) {
        appState.results.push({
          title:obj.Name,
          info:obj.wTeaser,
          url: obj.wUrl
      });
      appState.userInput.title= data.Similar.Info[0].Name;
      appState.userInput.description=data.Similar.Info[0].wTeaser;
}

getDataFromApi('IT', modState);

//callback function

///////Render Functions//////////////////////////


//////Event Handlers/////////////////////////////