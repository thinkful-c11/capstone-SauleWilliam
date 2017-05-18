const appState={
    results: [],
    hasSearched: false,
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
	console.log(data);
	// data.similar.results.forEach(obj =>{
	// 	appState.results.push( {
	// 		title: obj.name,
	// 	});
	// });
}

getDataFromApi('IT', modState);

//callback function

///////Render Functions//////////////////////////


//////Event Handlers/////////////////////////////