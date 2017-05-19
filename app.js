const appState={
    results: [],
    dataObjects:[],
    hasSearched: false,
    userInput:{
        title:' ',
        description:' '
    }
};

const baseURL='http://tastedive-proxy.herokuapp.com/api/similar';
const googleURL='https://www.googleapis.com/books/v1/volumes';
/////////////Mod Functions////////////////////////
function getDataFromApi(searchQuery,callback){
    const tasteQuery={
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

    const googleQuery={
        q: searchQuery,
        k: 'AIzaSyDlUC2eqrlLx06vrOll0JSi7gR7YqYi8Us'
    };
    $.getJSON(googleURL, googleQuery, callback);
}

function newSearch(data){

    console.log(data);
    appState.dataObjects.push(data);
    console.log(appState);

    appState.hasSearched = true;

    appState.dataObjects[0].Similar.Results.forEach(function(obj){
      let result = {
        title: obj.Name,
        info: obj.wTeaser,
        url: obj.wUrl,
        details: false,
        link:' ',
        image:' '
    };
      appState.results.push(result);
  });

    appState.userInput.title= data.Similar.Info[0].Name;
    appState.userInput.description=data.Similar.Info[0].wTeaser;

    appState.results.link= appState.dataObjects[1].items[0].volumeInfo.infoLink;
    appState.results.image=appState.dataObjects[1].items[0].volumeInfo.imageLinks.thumbnail;

    render(appState);
    console.log(appState);
    
}

// function newSearch1(data) {
//   //appState.hasSearched = true;
//   let
// }

function reset(data){
    appState.hasSearched= false;
    appState.results = [];
    appState.userInput = {
      title:' ',
      description:' '
  };
}

function render(state){
    if(state.hasSearched == false){
      $('.startPage').show();
      $('.resultsPage').hide();

  }else{
      $('.resultsPage').show();
      $('.startPage').hide();

      $('.booktitle').html(`${state.userInput.title}`);
      $('.inputInfo').html(`${state.userInput.description}`);

      let html = '';
      let i = 0;
      let details = '';


      state.results.forEach(obj =>{
      // if(obj.details === true){
      //   details = `resultDetails well`
      // }
      // else if(obj.details === false){
      //   details = `resultDetails well hidden`
      // }

        let title = '';

        if(obj.title.length >= 40){
          title = obj.title.substring(0, 40) + '...';
      }
        else{
          title = obj.title;
      }

        html+= `<div class="result card"><h4 class="container-fluid">${title}<button class="btn btn-xs" id="details" type="button" data-toggle="collapse" data-target="#${i}" onclick="this.blur();"><span class="glyphicon glyphicon-collapse-down">&nbsp;</span></button></h4>
      <div class="resultDetails collapse card-block" id="${i}">${obj.info}</div></div>`;

        i = i+1;

      //console.log(i);

    });

      $('.resultsContainer').html(html);
  }
}


//////Event Handlers/////////////////////////////
function eventHandler(){
    $('#startID').submit(function(event){
      event.preventDefault();
      let searchInput= $('#searchId').val();
      getDataFromApi(searchInput,newSearch);
    // render(appState);
  });
  // $('.resultsContainer').on('click', '#details', (function (event){
  //   let i = $(this).next().attr('id');
  //   // console.log($(this).closest('.resultHeader').attr('id'));
  //   // console.log(appState.results[i].details)
  //   // showDetails(i);
  //   $(`[id="${i}"]`).toggleClass('hidden');
  //   // console.log($(this).next());
  // }))

}

$(function(){eventHandler();});