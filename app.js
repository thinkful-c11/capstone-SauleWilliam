'use strict';
//Please note that this first line of 'use strict' along with all indentation suggestions are a result of eslint!

const appState = {
  results: [],
  googleQueries:[],
  hasSearched: false,
  error: false, //(I commented this back in based on note below on line 54)
  userInput: {
    title:' ',
    description:' '
  }
};

const baseURL='http://tastedive-proxy.herokuapp.com/api/similar';
const googleURL='https://www.googleapis.com/books/v1/volumes';
/////////////Mod Functions////////////////////////
function getDataFromApi(searchQuery, callback) {
  const tasteQuery = {
    k:'270170-ThinfulC-SJOP8QJA',
    q: 'book:' + searchQuery,
    limit: 12,
    info: 1
  };
  $.getJSON(baseURL, tasteQuery, callback);
    
    // $.ajax({
    //     url: baseURL,
    //     type: 'GET',
    //     datatype: 'jsonp',
    //     data: tasteQuery,
    //     success: callback
    // });

}

function getGoogleApi(searchQuery, position) {
  const googleQuery = {
    q: searchQuery,
    k: 'AIzaSyB08XIJZV0A8qNojtkmczed_WZ9ZKEeqA0'
  };

  $.getJSON(googleURL, googleQuery, data => {
    appState.googleQueries[position] = data;
    render(appState);
  });
}

function newSearch(data) {

  // appState.dataObjects.push(data);

  appState.hasSearched = true;
  appState.error = false; //I noticed that on line 8, your error property is in fact commented out. Is it supposed to be commented in based on this?

  // if(appState.dataObjects.length === 2){
  data.Similar.Results.forEach(function(obj) {
    let result = {
      title: obj.Name,
      info: obj.wTeaser,
      url: obj.wUrl,
       // link:'',
        //image:''
    };

    appState.results.push(result);

    appState.googleQueries.push(null);
    getGoogleApi(obj.Name, appState.googleQueries.length - 1);

  });

  appState.userInput.title = data.Similar.Info[0].Name;
  appState.userInput.description = data.Similar.Info[0].wTeaser;

  if(appState.results.length === 0) {
    appState.hasSearched = false;
    appState.error = true;
    render(appState);
  }

  // appState.results.link= appState.dataObjects[1].items[0].volumeInfo.infoLink;
  // appState.results.image= appState.dataObjects[1].items[0].volumeInfo.imageLinks.thumbnail;

  // }


  // console.log(appState);
	//commented the above out due to eslint
    
}

// function newSearch1(data) {
//   //appState.hasSearched = true;
//   let
// }

function reset(state){
  state.hasSearched= false;
  state.results = [];
  state.googleQueries=[];
  state.error = false;
  state.userInput = {
    title:' ',
    description:' ',
  };
  render(appState);
}

function render(state) {
  if(state.hasSearched === false){
    $('.startPage').show();
    $('.resultsPage').hide();
    $('#searchId').val('');
    if(appState.error === true){
      $('errorDiv').show();
    }

  } else{
    for (let i = 0; i < appState.googleQueries.length; i++) {
      if (appState.googleQueries[i] === null) {
        $('.loader').show();
        console.log('not ready yet'); //perhaps instead of console thrown an alert? I also console, but eslint doesn't seem to like this
        return;
      }
    }
    console.log('boing!'); //perhaps instead of console thrown an alert? I also console, but eslint doesn't seem to like this
    $('.loader').hide();
    $('.resultsPage').show();
    $('.startPage').hide();
    $('.errorDiv').hide();

    $('.booktitle').html(`${state.userInput.title}`);
    $('.inputInfo').html(`${state.userInput.description}`);

    let html = '';
    let i = 0;
    // let details = ''; I commented this out because it's not being used currently!


    state.results.forEach(obj => {
      // if(obj.details === true){
      //   details = `resultDetails well`
      // }
      // else if(obj.details === false){
      //   details = `resultDetails well hidden`
      // }

      let title = '';

      if(obj.title.length >= 40) {
        title = obj.title.substring(0, 40) + '...';
      }
      else {
        title = obj.title;
      }

      html += `<div class="result card"><h4 class="container-fluid">${title}<button class="btn btn-xs" id="details" type="button" data-toggle="collapse" data-target="#${i}" onclick="this.blur();"><span class="glyphicon glyphicon-collapse-down">&nbsp;</span></button></h4>
      <div class="resultDetails collapse card-block" id="${i}"> <a target="_blank" href="${appState.googleQueries[i].items[0].volumeInfo.infoLink}"><img class= "coverImage" src="${appState.googleQueries[i].items[0].volumeInfo.imageLinks.thumbnail}"></a> ${obj.info}</div></div>`;

      i = i + 1;

      //console.log(i);

    });

    $('.resultsContainer').html(html);
  }
}


//////Event Handlers/////////////////////////////
function eventHandler() {
  $('#startID').submit(function(event){
    event.preventDefault();
    let searchInput= $('#searchId').val();
    getDataFromApi(searchInput,newSearch);
    // render(appState);
  });
  $('.startOverClick').click(function(event) {
    event.preventDefault();
   //$('#searchId').val('');
    reset(appState);

  });

}

$(function() {
  eventHandler();
});