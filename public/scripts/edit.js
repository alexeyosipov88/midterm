/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
$(() => {
  // const { editListing } = require('./database');
  // get current url
  const currentUrl = window.location.href;
  // get id from the last characters of the url
  const listing_id = currentUrl.substring('http://localhost:8080/en/edit'.length + 1);

  $.get(`/en/item/${listing_id}`)
    .then((listing) => {
      const defaultValues = {
        itemID: listing.id,
        itemTitle: listing.name,
        itemPrice: listing.price,
        itemCategory: listing.category_name,
        itemPet: listing.animal_name,
        itemPhoto: listing.photo,
        itemDescription: listing.description,
      };

      setDefaultValues(defaultValues);
    });


  // $('body').on('click', '#editSubmit', function(e) {
  //   const editedListing = getEditedListing(listing_id);
  //   $.post(`/en/edit/listing`, editedListing)
  //     .then(() => {
  //       $(location).attr('href', `http://localhost:8080/`);
  //     });
  // });
});

const setDefaultValues = function(defaultValues) {
  $('#itemID').val(defaultValues.itemID);
  $('#itemTitle').val(defaultValues.itemTitle);
  $('#itemPrice').val(defaultValues.itemPrice);
  $(`#itemCategory option[value=${defaultValues.itemCategory}]`).attr('selected','selected');
  $(`#itemPet option[value=${defaultValues.itemPet}]`).attr('selected','selected');
  $('#itemPhoto').val(defaultValues.itemPhoto);
  $('#itemDescription').val(defaultValues.itemDescription);
};

const getEditedListing = function(listing_id) {
  const listingValues = {
    name: $('#itemTitle').val(),
    price: $('#itemPrice').val(),
    description: $('#itemDescription').val(),
    photo: $('#itemPhoto').val(),
    category_id: $('#itemCategory').val(),
    animal_id: $('#itemPet').val(),
    listing_id: listing_id
  };
  return listingValues;
};
