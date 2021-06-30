$(() => {

  $("#mylistings").click(function() {
    $.get("/users/profile/mylistings", function(data, status){
      console.log("Data is: ", data );
    });
  });

  $("#myfav").click(function() {
    $.get("/users/profile/myfav", function(data, status){
      console.log("Data is: ", data );
      $message.empty();
      for(list of data){
        $(".message").prepend(myfav(list));
      }
    });
  });



/////
})

function myfav(fav) {
const template = `
<div class="message_box">
        <div class="circular--landscape">
          <img src="${fav.photo}" />
        </div>

        <div class="message_body">

          <div class="message_preview">
            Item name / Price
          </div>
          <div class="buttons">
            <button type="button" class="btn btn-primary btn-sm">Reply</button>
            <button type="button" class="btn btn-success btn-sm">Mark as sold</button>
            <button type="button" class="btn btn-outline-danger btn-sm">Delete</button>
          </div>

        </div>
      </div>

      <hr />
`
}
