/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
$(() => {
  // get current url
  const currentUrl = window.location.href;
  // get id from the last characters of the url
  const listing_id = currentUrl.substring('http://localhost:8080/en/edit'.length + 1);

  $.get(`/en/item/${listing_id}`)
    .then((listing) => {
      const defaultValues = {
        itemTitle: listing.name,
        itemPrice: listing.price,
        itemCategory: listing.category_name,
        itemPet: listing.animal_name,
        itemPhoto: listing.photo,
        itemDescription: listing.description,
      };

      setDefaultValues(defaultValues);

      // let seller = false;
      // if (listing.seller === true) {
      //   seller = true;
      // }
      // $('.container').prepend(createListing(listing));
      // if (seller) {
      //   $('#user-buttons').hide();
      // } else {
      //   $('#seller-buttons').hide();
      // }
    });


    $('body').on('click', '#editSubmit', function(e) {

    })
});

const setDefaultValues = function(defaultValues) {
  console.log(defaultValues.itemCategory)
  $('#itemTitle').val(defaultValues.itemTitle);
  $('#itemPrice').val(defaultValues.itemPrice);
  $(`#itemCategory option[value=${defaultValues.itemCategory}]`).attr('selected','selected');
  $(`#itemPet option[value=${defaultValues.itemPet}]`).attr('selected','selected');
  $('#itemPhoto').val(defaultValues.itemPhoto);
  $('#itemDescription').val(defaultValues.itemDescription);
}

// const editPost = function(listing) {
//   return $(`

//   <form action="/users/post" method="POST" id="form">

//   <label for="titleofitem" class="col-sm-2 col-form-label">Title</label>
//   <div class="col-sm-10">
//     <input required name='name' type="text" class="form-control" id="itemTitle" value=`$(itemTitle)`>
//   </div>


//   <label for="price" class="col-sm-2 col-form-label">Price</label>
//   <div class="col-sm-10">
//     <input required name='price' type="text" class="form-control" id="itemPrice" value=`$(itemPrice)`>
//   </div>

//   Category
//   <select required name ='category_id' id="itemCategory"class="form-select" aria-label="Default select example">
//     <option selected>`$(itemCategory)`</option>
//     <option value="1">Food</option>
//     <option value="2">Toys</option>
//     <option value="3">Supplies</option>
//   </select>

//   Pet
//   <select required name='animal_id' id="itemPet"class="form-select" aria-label="Default select example">
//     <option selected>`$(itemPet)`</option>
//     <option value="1">Cat</option>
//     <option value="2">Dog</option>
//     <option value="3">Fish</option>
//     <option value="4">Reptile</option>
//     <option value="5">Small pet</option>
//   </select>

//   <!-- photo upload field -->

//   <label for="photo" class="col-sm-2 col-form-label">Photo</label>
//   <input required name='photo' type="text" class="form-control" id="itemPhoto" value="`$(itemPhoto)`">

//   <div>

//     <div class="mb-3">
//       <label for="exampleFormControlTextarea1" class="form-label">Description</label>
//       <textarea name='description' class="form-control" id="itemDescription" rows="5" required value=`${itemDescription}`></textarea>
//     </div>

//   </div>

//   <div>
//     <button type="submit" id="editSubmit" class="btn btn-primary">Submit</button>

//     <button type="submit" class="btn btn-outline-danger">Cancel</button>

//   </div>

// </form>

//   `);
// };
