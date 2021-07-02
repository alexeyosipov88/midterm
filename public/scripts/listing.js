$(() => {
  // get current url
  const currentUrl = window.location.href;
  // get id from the last characters of the url
  const listing_id = currentUrl.substring('http://localhost:8080/en/listings'.length +1);

  $.get(`/en/item/${listing_id}`)
  .then((listing) => {
    let seller = false;
    if (listing.seller === true) {
      seller = true;
    }
    $('.container').prepend(creatListing(listing));

    if (seller) {
      $('#user-buttons').hide();
    } else {
      $('#seller-buttons').hide();
    }
  }
  )



  $('body').on('click', '#seller-delete', function(e) {
    const listing_id = e.target.value;
    $.post(`/users/profile/delete/${listing_id}`)
    .then((listings) => {
      $(location).attr('href', 'http://localhost:8080/');
    }
    )

  });


  $('body').on('click', '#user-favourite', function(e) {
    const listing_id = e.target.value;
    $.post(`/users/profile/favourite/${listing_id}`)
    .then((listings) => {
      $(location).attr('href', 'http://localhost:8080/users/favourites');
    }
    )

  });




 })

 // template for listing page

 const creatListing = (listing) => {
  return $(`
  <h1 class="title">${listing.name}</h1>


  <section class="listing_body">


    <div class="listing_image">
      <img src="${listing.photo}" class="listing_image_properties" alt="Responsive image">
    </div>

    <div class = "listing_details">
      <div class = "listing_category_description">
        <h4>
          ${(listing.price/100).toLocaleString("en-US", {style:"currency", currency:"USD"})}
        </h4>
        <h4>
          ${listing.animal_name} / ${listing.category_name}
        </h4>

        <h5>Details</h4>
          ${listing.description}
      </div>

      <div class="listing_buttons">

        <!-- seller buttons -->
        <div id ='seller-buttons' class="listing_buttons">
          <button id='seller-delete' type="button" class="btn btn-danger" value='${listing.id}'>Delete</button> &nbsp; &nbsp;
          <button id='seller-edit' type="button" class="btn btn-primary" value='${listing.id}'>Edit post</button>
        </div>


        <!-- user buttons -->
        <div id='user-buttons' class="listing_buttons">
          <button id='user-favourite' type="button" class="btn btn-danger" value='${listing.id}'>Favourite listing ❤️</button> &nbsp; &nbsp;
          <button id='user-message' type="button" class="btn btn-primary" data-toggle="modal" data-target="message_popup" value='${listing.id}'>Message seller</button>
        </div>

      </div>
    </div>

  </section>

  `);

}


//  const creatListing = (listing) => {
//   return $(`
//   <section class="listing_body">

//   <h1 class="title">${listing.name}</h1>

//   <div class="listing_details">
//     <img src="${listing.photo}" class="img-fluid" alt="Responsive image">


//     <h4>
//     ${(listing.price/100).toLocaleString("en-US", {style:"currency", currency:"USD"})}
//     </h4>
//     <h4>
//     ${listing.animal_name} / ${listing.category_name}
//     </h4>


// <h5>Details</h4>
//   ${listing.description}
// </section>

// <!-- seller buttons -->
// <div id='seller-buttons' class="listing_buttons">
//   <button type="button" class="btn btn-danger" value='${listing.id}''>Delete</button> &nbsp; &nbsp;
//   <button type="button" class="btn btn-primary" value ='${listing.id}'>Edit post</button>
// </div>


// <!-- user buttons -->
// <div id='user-buttons' class="listing_buttons">
//   <button type="button" class="btn btn-danger" value='${listing.id}'>Favourite listing ❤️</button> &nbsp; &nbsp;
//   <button type="button" class="btn btn-primary" value='${listing.id}'>Message seller</button>
// </div>

//   `);

// }

