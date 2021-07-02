$(() => {


  $.get("/users/profile/myFavourites")
   .then((listings) => {
     if (listings === false) {
      $(location).attr('href', 'http://localhost:8080/login');
     }
     renderFavourites(listings);
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

 const renderFavourites = (listings) => {
   const $container = $('.container');
   for (let listing of listings) {
     $container.append(createListing(listing));
   }
 }

 const createListing = (listing) => {
  return $(`
  <section class="message">
  <div class="message_box">
  <div class="photo">
    <img src="${listing.photo}" />
  </div>
  <div class="message_body">
    <div class="messagemessage">
      ${listing.name}<br>
      ${(listing.price/100).toLocaleString("en-US", {style:"currency", currency:"USD"})}
      </div>
      <div class="buttons">
          <button type="button" class="btn btn-primary btn-sm">Message seller</button>&nbsp; &nbsp;
          <button type="button" class="btn btn-danger btn-sm" value='${listing.id}'> Unfavourite</button>

      </div>
    </div>
 </div>
</div>
</section>
<hr/>
  `
  );

}
