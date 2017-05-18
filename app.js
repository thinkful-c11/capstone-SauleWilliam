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
      q: 'book:' + searchQuery,
      limit: 6,
      info: 1
     }
 //$.getJSON(baseURL, query, callback);
    
    $.ajax({
        url: baseURL,
        type: 'GET',
        datatype: 'jsonp',
        data: query,
        success: callback
    })
}

function newSearch(data){

  appState.hasSearched = true;

  data.Similar.Results.forEach(function(obj){
    let result = {
      title: obj.Name,
      info: obj.wTeaser,
      url: obj.wUrl,
      details: false,
    };
    appState.results.push(result);
 });

  appState.userInput.title= data.Similar.Info[0].Name;
  appState.userInput.description=data.Similar.Info[0].wTeaser;
  
  render(appState);
}

function showDetails(i){
  if(appState.results[i].details === true){
    appState.results[i].details = false;
  }
  else{
    appState.results[i].details = true;
  }
  render(appState);
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
  if(state.hasSearched == false){
    $('.startPage').show();
    $('.resultsPage').hide();

  }else{
    $('.resultsPage').show();
    $('.startPage').hide();

    $('.booktitle').html(`${state.userInput.title}`);
    $('.inputInfo').html(`${state.userInput.description}`);

    let html = ``;
    let i = 0;
    let details = ``


    state.results.forEach(obj =>{
      // if(obj.details === true){
      //   details = `resultDetails well`
      // }
      // else if(obj.details === false){
      //   details = `resultDetails well hidden`
      // }
      html+= `<div class="result"><h4>${obj.title}</h4><button id="details" type="button">details</button>
      <div class="resultDetails well hidden" id="${i}">${obj.info}</div></div>`

      i = i+1

      console.log(i);

    });

    $('.resultsContainer').html(html);
  }
}


//////Event Handlers/////////////////////////////
function eventHandler(){
  $('#buttonId').click (function(event){
    event.preventDefault();
    let searchInput= $('#searchId').val();
    getDataFromApi(searchInput,newSearch);
    // render(appState);
  });
  $('.resultsContainer').on('click', '#details', (function (event){
    let i = $(this).next().attr('id');
    // console.log($(this).closest('.resultHeader').attr('id'));
    // console.log(appState.results[i].details)
    // showDetails(i);
    $(`[id="${i}"]`).toggleClass('hidden');
    // console.log($(this).next());
  }))

}

$(function(){eventHandler();});