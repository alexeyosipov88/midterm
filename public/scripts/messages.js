$(() => {

  //renders listings specific to user-id
  $.get("/users/inbox/messages")
    .then((messages) => {
      renderMessages(messages);
    }
    )

    $('body').on('click', '.btn-outline-danger', function(e) {
      const message_id = e.target.value;
      $.post(`/users/inbox/messages/delete/${message_id}`)
      .then((result) => {
        $(location).attr('href', 'http://localhost:8080/users/inbox');
      }
      )
    });
})

const renderMessages = (messages) => {
  const $container = $('.container');
  for (let message of messages) {
    $container.append(creatMessage(message));
  }
}

const creatMessage = (message) => {
  return $(`
<section class="memo">
      <div class="memo_box">

        <div class="photo">
        <a href="/en/listings/${message.listing_id}">
          <img src="${message.photo}" />
        </a>
        </div>

        <div class="memo_body">
          <div class="memo_details">
            <h5>${message.user_name}</h5>
            <p>${message.name} / ${message.price}</p>
          </div>


          <div="message_from_buyer">
          <span class="contact_details"> Message: </span>
           <p> ${message.content} </p>

            <span class="contact_details">Phone</span>&nbsp;&nbsp; ${message.phone_number} <br>
            <span class="contact_details">Email</span>&nbsp;&nbsp; ${message.email}

          </div>

          <div class="inbox_buttons">
            <button type="button" class="btn btn-danger btn-sm" value="${message.id}" >Delete</button>
          </div>

        </div>

      </div>

    </section>
    <hr/>
  `);

}

