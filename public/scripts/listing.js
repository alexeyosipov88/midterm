/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
let user_id;
$(() => {
  // get current url
  const currentUrl = window.location.href;
  // get id from the last characters of the url
  const listing_id = currentUrl.substring('http://localhost:8080/en/listings'.length + 1);

  $.get(`/en/item/${listing_id}`)
    .then((listing) => {
      let seller = false;
      if (listing.seller === true) {
        seller = true;
      }
      $('.container').prepend(createListing(listing));
      if (seller) {
        $('#user-buttons').hide();
      } else {
        $('#seller-buttons').hide();
      }
    });

  $('body').on('click', '#seller-delete', function(e) {
    const listing_id = e.target.value;
    $.post(`/users/profile/delete/${listing_id}`)
      .then(() => {
        $(location).attr('href', 'http://localhost:8080/');
      });
  });

  $('body').on('click', '#user-favourite', function(e) {
    const listing_id = e.target.value;
    $.post(`/users/profile/favourite/${listing_id}`)
      .then(() => {
        $(location).attr('href', 'http://localhost:8080/users/favourites');
      });
  });

  $('body').on('click', '#seller-edit', function(e) {
    const listing_id = e.target.value;
    $.get(`/en/edit/${listing_id}`)
      .then(() => {
        $(location).attr('href', `http://localhost:8080/en/edit/${listing_id}`);
      });
  });

  let user_id = 1;
  $('body').on('click', '#send_msg', function(e) {

    /* const listing_id = e.target.value; */
    e.preventDefault();
    $.get(`http://localhost:8080/en/item/${listing_id}`)
      .then((result) => {
        user_id = result.user_id;
        console.log(result);
        console.log(user_id);;
      })
    const msg = {};
    msg.content =$('#messageToSeller').val();
    msg.listing_id = listing_id;
    msg.user_id = user_id;
    console.log(msg);

    console.log('this is it', user_id);
    $.post(`/users/message/${user_id}`, msg)
      .then(() => {
        console.log(msg);

      });
  });
});

// modal function
const openModal = function() {
  document.getElementById("backdrop").style.display = "block";
  document.getElementById("messageModal").style.display = "block";
  document.getElementById("messageModal").classList.add("show");
};
const closeModal = function () {
  document.getElementById("backdrop").style.display = "none";
  document.getElementById("messageModal").style.display = "none";
  document.getElementById("messageModal").classList.remove("show");
};

// template for listing page
const createListing = (listing) => {
  return $(`
  <h1 class="title">${listing.name}</h1>


  <section class="listing_body">


    <div class="listing_image">
    <a href="/en/listings/${listing.id}">
      <img src="${listing.photo}" class="listing_image_properties" alt="Responsive image">
    </a>
    </div>

    <div class = "listing_details">
      <div class = "listing_category_description">
        <h4>
          ${(listing.price / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}
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
          <button id='seller-edit' type="button" class="btn btn-primary" value='${listing.id}'>Edit listing</button>
        </div>


        <!-- user buttons -->
        <div id='user-buttons' class="listing_buttons">
          <button id='user-favourite' type="button" class="btn btn-danger" value='${listing.id}'>Favourite listing ❤️</button> &nbsp; &nbsp;
          <button id='user-message' type="button" class="btn btn-primary" onclick='openModal()' value='${listing.id}'>Message seller</button>
        </div>

      </div>
    </div>


   <!-- Modal -->
   <div class="modal fade" id="messageModal" tabindex="-1" aria-labelledby="messageModalLabel" aria-modal="true" role="dialog">
     <div class="modal-dialog" role="document">
       <div class="modal-content">
         <div class="modal-header">
           <h5 class="modal-title" id="messageModalLabel">Send a message</h5>
           <button type="button" class="close" aria-label="Close"  onclick="closeModal()">
             <span aria-hidden="true">×</span>
           </button>
         </div>
         <form action="/users/message/${listing.user_id}" method="POST">
         <div class="modal-body">
          What would you like to say to the seller?
           <div class="md-form">
             <i class="fas fa-pencil prefix grey-text"></i>
             <textarea type="text" id="messageToSeller" class="md-textarea form-control" rows="4" placeholder="Enter your message here."></textarea>
             <!-- <label data-error="wrong" data-success="right" for="form8">Please enter a message.</label> -->
           </div>

         </div>
         <div class="modal-footer">
           <button type="button" class="btn btn-secondary" onclick="closeModal()">Close</button>
           <button type="submit" class="btn btn-primary" id="send_msg">Send message</button>
         </div>
       </div>
     </div>
   </div>
   </form>
   <div class="modal-backdrop fade show" id="backdrop"  style="display: none;"></div>

   <script>


   </script>



  </section>
  `);
};
