$(() => {


  $.get("/users/profile/myFavourites")
   .then((listings) => {
     console.log(listings);
     renderFavourites(listings);
   }
   )

 })

 const renderFavourites = (listings) => {
   const $container = $('.container');
   for (let listing of listings) {
     $container.append(createListing(listing));
   }
 }

 const createListing = (listing) => {
  return $(`
  <div class="message_box">
  <div class="photo">
    <img src="${listing.photo}" />
  </div>
  <div class="message_body">
    <div class="message_details">
      <h5>${listing.name}</h5>
      ${(listing.price/100).toLocaleString("en-US", {style:"currency", currency:"USD"})}
    </div>
    <div class="buttons">
      <div class="listing_buttons">
        <button type="button" class="btn btn-primary">Message seller</button>&nbsp; &nbsp;
        <button type="button" class="btn btn-danger">Unfavourite listing 💔</button>
      </div>
    </div>
 </div>
</div>
<hr/>
  `
  );

}
