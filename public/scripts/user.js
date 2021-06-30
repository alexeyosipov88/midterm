$(() => {

//renders listings specific to user-id
 $.get("/users/profile/mylistings")
  .then((listings) => {
    console.log(listings)
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
    <div class="photo">
      <img src="${listing.photo}" />
    </div>

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




// function myfav(fav) {
// const template = `
// <div class="message_box">
//           <div class="photo">
//             <img src="images/cat3.jpeg" />
//           </div>

//           <div class="message_body">

//             <div class="message_preview">
//               Item name / Price
//             </div>
//             <div class="buttons">
//               <button type="button" class="btn btn-primary btn-sm">Message seller</button>
//               <button type="button" class="btn btn-outline-danger btn-sm">Remove from favourites</button>
//             </div>

//          </div>
//         </div>
// `
// }




// function mylistings(list) {
//   const template = `
//   <div class="message_box">
//         <div class="photo">
//           <img src="${list.photo}" />
//         </div>

//         <div class="message_body">

//           <div class="message_preview">
//             Item name / Price
//           </div>
//           <div class="buttons">
//             <button type="button" class="btn btn-primary btn-sm">Reply</button>
//             <button type="button" class="btn btn-success btn-sm">Mark as sold</button>
//             <button type="button" class="btn btn-outline-danger btn-sm">Delete</button>
//           </div>

//         </div>
//       </div>

//       <hr />
//   `
//   return template;
// }


  // $("#mylistings").click(function() {
  //   $.get("/users/profile/mylistings", function(data, status){
  //     console.log("Data is: ", data );
  //     $message.empty();
  //     for(list of data){
  //       $(".message").prepend(mylistings(list));
  //     }
  //   });
  // });

  // $("#myfav").click(function() {
  //   $.get("/users/profile/myfav", function(data, status){
  //     console.log("Data is: ", data );
  //     $message.empty();
  //     for(list of data){
  //       $(".message").prepend(myfav(list));
  //     }
  //   });
  // });
