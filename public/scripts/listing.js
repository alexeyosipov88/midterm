$(() => {


  $('body').on('click', '.btn-danger', function(e) {
    const listing_id = e.target.value;
    $.post(`/users/profile/unfavourite/${listing_id}`)
    .then((listings) => {
      $(location).attr('href', 'http://localhost:8080/users/favourites');
    }
    )

  });






 })

