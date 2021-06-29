$(() => {
  console.log("a lot");
  //fetch my listings
  $.get("/en/listing", function(data, status){
    console.log("Data: " + data[0].name );
    // $("#menu").append('<li><a href="#">New list item</a></li>');
    for(list of data){
    $(".featured").append(listing(list));
  }
  });

  $("#search-button").click(function() {
    const search = $("#search-input").val() ;
    console.log("$%^&*_---",search);
    $.post("/en/search",
  {
    search
  },
  function(data, status){
    // alert("Data: " + data + "\nStatus: " + status);
    console.log(data);
    $("featured_listings_title").empty();
    $("featured_listings_title").append(`<h3>
    Search Results
  </h3>`);

    $(".featured").empty();
    for(item of data){
      $(".featured").append(searchTemplate(item));
    }

  });
  })

  $("#filter_button").click(function() {

    $.get("/en/listing", function(data, status){
      console.log("Data: " , data );
      $(".featured").empty();
      for(list of data){
      $(".featured").append(listing(list));
    }
  })
  });

  $(".active").click(function() {
    $.get("/en/user") ;
  })
  // $.ajax({
  //   method: "GET",
  //   url: '/en/listing'
  // }).then((listings) => {
  //   // alert(listings);
  //   console.log("listings are: @#$%_*& ",listings);
  //   // for(list of listings) {
  //   //   $("<div>").text(list).appendTo($("#listing"));
  //   // }
  // });

});

function listing(list) {
const template = `<div class="row gx-5">
<div class="col-6 col-sm-3">
  <div class="circular--landscape">
    <img class="listing-image" src="${list.photo}" />
  </div>
  <div class="item_description">
    ${list.name}<BR>
    $${list.price}
  </div>
</div>
`

return template ;
}

function searchTemplate(item) {
const template = `
<div class="row gx-5">
<div class="col-6 col-sm-3">
  <div class="circular--landscape">
    <img class="listing-image" src="${item.photo}" />
  </div>
  <div class="item_description">
    ${item.name}<BR>
    $${item.price}
  </div>
</div>
`
return template ;
}
