/* eslint-disable func-style */
$((db) => {

  console.log('db in index.js is: ',db);
  //home page route
  //fetch list of featured items - random
  $.get("/en/listing", function(data, status){

    console.log("Data is from endpoints.js: " + data ); //data is an array of objects
    console.log('data is: ',data[0]);
    //appending the header to the dom
    // console.log(req.session["user_id"]);

    //randomizing the data array - random function
    const random = () => {return Math.floor(Math.random() * 4) + 1 ;}
    for(let i=0; i<3; i++){
      $(".featured").append(listing(data[random()]));
    }
    // fetch all products for main feed
    for(list of data){
      $(".all_products").append(listing(list));
    }

  });

  $.get('en/listing/user', function(data) {
    console.log("data here should be the user logged in", data);
    const username = `<h3>Welcome ${data.name}</h3>`;
    const logoutBtn = `<a>logout</a>`
    const loginbtn = `<a>login</a>`

    $('.user').empty();
    $('.logout').empty();
    if(data.id)
    {
      $('.user').append(username);
      $('.logout').append(logoutBtn);

    } else {
      $('.user').append(`<h3> Welcome Guest </h3>`);
      $('.logout').append(loginbtn);
    }

  })
//search button on click event handler
  $("#search-button").click(function() {
    const search = $("#search-input").val();
    console.log("$%^&*_---",search);
    //sends a post request to route /search in endpoint.js
    $.post("/en/search",
  {
    search
  },
  function(data, status){
    console.log(data);
    //empty the DOM and append the New Title ---- this is not working. please take a look -------
    $(".featured_listings_title").empty();
    $(".featured_listings_title").append(`<h3>
    Search Results
  </h3>`);
  //emptying the body and appending the new result
    $(".featured").empty();
    for(item of data){
      $(".featured").append(searchTemplate(item));
    }
  });
  })
//filter button on click event handler
  $("#filter_by_price").click(function() {
    $.get("/en/listing", function(data, status){
      console.log("Data: " , data );
      $(".featured").empty();
      for (list of data) {
        $(".featured").append(listing(list));
      }
    });
  });

});

//appends the following template to the dom
function listing(list) {
  const template = `
  <div class="product">
  <div class="photo">
  <img class="listing-image" src="${list.photo}" />
  </div>
  <div class="item_description">

  ${list.name}<BR>
  ${(list.price/100).toLocaleString("en-US", {style:"currency", currency:"USD"})}
  </div>
  </div>
`;
  return template;
}

//appends the search template --- how the search.html look --
function searchTemplate(item) {
  const template = `
  <div class="product">
  <div class="photo">
  <img class="listing-image" src="${item.photo}" />
  </div>
  <div class="item_description">
  ${item.name}<BR>
  $${item.price}
  </div>
  </div>
`;
  return template;
}


