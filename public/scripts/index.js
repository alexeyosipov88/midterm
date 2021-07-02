/* eslint-disable func-style */
$(() => {

  //home page route
  //fetch list of featured items - random
  $.get("/en/listing", function(data, status) {
    $(".featured_listings_title").empty();
    $(".featured_listings_title").append(`<h4>Featured products nearby 📍</h4>`);
    $('.user').empty();
    // $('.login').empty();
    // const username = `Welcome ${data.name}`;
    // const logoutBtn = `<a href="/logout">logout</a>`
    // //randomizing the data array - random function
    // if(data.id === Number){
    //   // $('.user').append(`Welcome Guest`);
    //   // $('.login').append(loginbtn);
    //   $('.user').empty();
    //   $('.login').empty();
    //   $('.user').append(username);
    //   $('.login').append(logoutBtn);
    // }

    const random = () => {
      return Math.floor(Math.random() * 6) + 1;
    };
    for (let i = 0; i < 3; i++) {
      $(".featured").append(listing(data[random()]));
    }
    // fetch all products for main feed
    for (list of data) {
      $(".all_products").append(listing(list));
    }
  });
  //another route just to grab the username to show to the page
  $.get('en/listings/username', function(data) {
    const username = `Welcome ${data.name}`;
    const logoutBtn = `<a href="/logout">logout</a>`
    if(data.id){
      $('.user').empty();
      $('.login').empty();
      $('.user').append(username);
      $('.login').append(logoutBtn);
    }

    // $('.user').empty();
    // $('.login').empty();
    //appending the header to the dom
    // if(data.id)
    // {
    //   $('.user').append(username);
    //   $('.login').append(logoutBtn);
    // }
  });

  //on clicking the login/logout button

  //search button on click event handler
  $("#search_button").click(function() {
    const search = $("#search_input").val();
    //sends a post request to route /search in endpoint.js
    $.post("/en/search",
      {
        search
      },
      function(data, status) {
        //emptying the body and appending the new result
        $(".featured_listings_title").empty();
        $(".featured_listings_title").append(`<h4>Search results 🎉</h4>`);
        for (item of data) {
          $(".featured").append(searchTemplate(item));
        }
        $(".main_feed").empty();
      });
  });
  //filter button on click event handler
  $("#filter_by_price").click(function() {
    $.get("/en/listing", function(data, status) {
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
  <a href="/en/listings/${list.id}">
  <img class="listing-image" src="${list.photo}" /></a>
  </div>
  <div class="item_description">

  ${list.name}<BR>
  ${(list.price / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}
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


