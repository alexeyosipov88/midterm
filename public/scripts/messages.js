$(() => {

  //renders listings specific to user-id
  $.get("/users/inbox/messages")
    .then((messages) => {
      console.log(renderMessages(messages));
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
          <img src="${message.photo}" />
        </div>
        <div class="memo_body">
          <div class="memo_details">
            <h5>${message.user_name}</h5>
            ${message.name} / ${message.price}
          </div>
          <h5>Message:</h5>
          <div="message_from_buyer>
          ${message.content}
          </div>
          <div class="contact_details">
            Phone: ${message.phone_number}| email: ${message.email}
          </div>
        </div>
          <div class="inbox_buttons">
            <button type="button" class="btn btn-outline-danger" value="${message.id}" >Delete</button>
          </div>
       </div>
    </section>
    <hr/>
  `);

}

