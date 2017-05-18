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

function newSearch(data){

  appState.hasSearched = true;

  data.Similar.Results.forEach(function(obj){
    let result = {
      title: obj.Name,
      info: obj.wTeaser,
      url: obj.wUrl
    };
    appState.results.push(result);
 });

  appState.userInput.title= data.Similar.Info[0].Name;
  appState.userInput.description=data.Similar.Info[0].wTeaser;
  
}

function reset(data){
  appState.hasSearched= false;
  appState.results = [];
  appState.userInput = {
        title:' ',
        description:' '
    };
};

function render(state){
  if(state.hasSearched = false){
    $('.startPage').show();
    $('.resultsPage').hide();
  }
  else{
    $('.resultsPage').show();
    $('.startPage').hide();

    $('.booktitle').html(`${state.userInput.title}`);
    $('.inputInfo').html(`${state.userInput.description}`);

    let html = ``

    state.results.forEach(obj =>{
      html+= `<div class="resultHeader"><h4>${obj.title}</h4><button type="button">details</button></div>
      <div class="resultDetails well">${obj.info}</div>`
    });

    $('.resultsContainer').html(html);
  }
}

getDataFromApi('IT', newSearch);

//callback function

///////Render Functions//////////////////////////


//////Event Handlers/////////////////////////////