$(() => {
  // get current url
  const currentUrl = window.location.href;
  // get id from the last characters of the url
  const listing_id = currentUrl.substring('http://localhost:8080/en/listing'.length +1);

  $.get(`/en/item/${listing_id}`)
  .then((listing) => {
    $('.container').prepend(creatListing(listing));
  }
  )


  $('body').on('click', '.btn-danger', function(e) {
    const listing_id = e.target.value;
    $.post(`/users/profile/unfavourite/${listing_id}`)
    .then((listings) => {
      $(location).attr('href', 'http://localhost:8080/users/favourites');
    }
    )

  });






 })

 const creatListing = (listing) => {
  return $(`
  <section class="listing_body">

  <h1 class="title">${listing.name}</h1>

  <div class="listing_details">
    <img src="${listing.photo}" class="img-fluid" alt="Responsive image">


    <h4>
      ${listing.price}
    </h4>
    <h4>
    ${listing.animal_name} / ${listing.category_name}
    </h4>


<h5>Details</h4>
  ${listing.description}
</section>

  `);

}

