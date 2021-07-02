$(() => {
//renders listings specific to user-id
 $.get("/users/profile/mylistings")
  .then((listings) => {
    if (listings === false) {
      $(location).attr('href', 'http://localhost:8080/login');
     }
    renderListings(listings);
  }
  )

  $('body').on('click', '.btn-outline-danger', function(e) {
    const listing_id = e.target.value;

    $.post(`/users/profile/delete/${listing_id}`)
    .then((listings) => {
      $(location).attr('href', 'http://localhost:8080/users/profile');

    }
    )

  });

  $('body').on('click', '.btn-success', function(e) {
    const listing_id = e.target.value;
    $.post(`/users/profile/sold/${listing_id}`)
    .then((listings) => {
      $(location).attr('href', 'http://localhost:8080/users/profile');

    }
    )

  });

})

const renderListings = (listings) => {
  const $container = $('.container');
  for (let listing of listings) {
    $container.append(createListing(listing));
  }
}

const createListing = (listing) => {
  return $(`
  <section class="message">
  <div class="message_box">
  <a href="/en/listings/${listing.id}">
    <div class="photo">
      <img src="${listing.photo}" />
      </div>
    </a>

    <div class="message_body">
        ${listing.name} / ${(listing.price/100).toLocaleString("en-US", {style:"currency", currency:"USD"})}
      <div class="message_preview">
      </div>
      <div class="buttons">
        <button type="button" class="btn btn-primary btn-sm">Reply</button>
        <button type="button" class="btn btn-success btn-sm" value='${listing.id}'>Mark as sold</button>
        <button type="button" class="btn btn-outline-danger btn-sm" value='${listing.id}'>Delete</button>
      </div>

   </div>
  </div>
</section>
<hr/>`
  );

}
