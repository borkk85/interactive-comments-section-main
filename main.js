fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    renderComments(data);
  })
  .catch((error) => console.error(error));

const renderComments = (data) => {
  const commentWrap = document.querySelector(".comment_wrap");
  const commentMain = document.querySelector("main");

  commentWrap.innerHTML = "";

  data.comments.forEach((comment, index) => {
    const body = `
    <div class="comment_body">
      <div class="comment_card">
        <div class="comment_counter">
            
          <svg alt="plus-icon" class='plus' width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/></svg>
             
          <span class="counter">${comment.score}</span>
              
          <svg alt="minus-icon" class='minus' width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/></svg>
             
        </div>
        <div class="comment_main_section">
          <div class="header">
            <div class="social">
              <img src="${comment.user.image.png}" alt="User avatar" />
              <p class="user">${comment.user.username}</p>
              <p class="duration">${comment.createdAt}</p>
            </div>
            <div class="reply_button">
              <img src="./images/icon-reply.svg" alt="" />
              <a class="reply">Reply</a>
            </div>${comment.replies.username === "juliusomo" ? 
            `
            <div class="edit_delete_buttons">
              <img src="./images/icon-edit.svg" alt="" class="edit_button" />
              <img src="./images/icon-delete.svg" alt="" class="delete_button" />
            </div>
            `
            : ""}
                         
          </div>
            <div class="text">
              ${comment.replyingTo ? 
                `
                <span class="reply-to">@${comment.replyingTo}</span>
                `
               : ""}
              <span class="db-text">${comment.content}</span>
            </div>
              ${comment.replies.length > 0 ? 
                `
          </div>
        </div>
      </div>

      <div class="border comment_replies">
        ${comment.replies
          .map(
            (reply) => `
      <div class="comment_body">
        <div class="comment_card">
          <div class="comment_counter">
            <img src="./images/icon-plus.svg" alt="plus-icon" class='plus'/>
            <span class="counter">${reply.score}</span>
            <img src="./images/icon-minus.svg" alt="minus-icon" class='minus'/>
          </div>
          <div class="comment_main_section">
            <div class="header">
              <div class="social">
                <img src="${reply.user.image.png}" alt="User avatar" />
                <p class="user">${reply.user.username}</p>
                <p class="duration">${reply.createdAt}</p>
              </div>
              
              <div class="reply_button">
                ${reply.user.username === "juliusomo" ? 
                `
                  <div class='edit-button'>
                    <a class="edit">
                      <img src="./images/icon-edit.svg" alt="" class="edit_button"/>
                    Edit</a>
                  </div>
                  <div class='delete-button'>
                    <a class="delete"> 
                      <img src="./images/icon-delete.svg" alt="" class="delete_button"/>
                    Delete</a>
                  </div>
                `
                    : `
                    <img src="./images/icon-reply.svg" alt="" /><a class="reply">Reply</a>
                    `
                }
                </div>
             
            </div>
            <div class="text">
              <span class="reply-to">@${reply.replyingTo}</span>
              <span class="db-text">${reply.content}</span>
            </div>
            </div>
          </div>
        </div>
        `
          )
          .join("")}
      </div>
      `
                           : ""
                       }
                     </div>
        </div>
        </div>
    </div>
    `;

    commentWrap.innerHTML += body;
  });

  const plusIcons = document.querySelectorAll(".plus");
  const minusIcons = document.querySelectorAll(".minus");

  plusIcons.forEach((plusIcon) => {
    plusIcon.addEventListener("click", () => {
      const counter = plusIcon.parentElement.querySelector(".counter");
      const currentScore = parseInt(counter.textContent);
      const newScore = currentScore + 1;
      counter.textContent = newScore;
    });
  });

  minusIcons.forEach((minusIcon) => {
    minusIcon.addEventListener("click", () => {
      const counter = minusIcon.parentElement.querySelector(".counter");
      const currentScore = parseInt(counter.textContent);
      const newScore = currentScore - 1;
      counter.textContent = newScore;
    });
  });

  const replyButtons = commentWrap.querySelectorAll(".reply_button");
  replyButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const commentElement = e.target.closest(".comment_body");

      let containerElement = commentElement.nextElementSibling;

      if (
        containerElement &&
        containerElement.classList.contains("border", "comment-replies")
      ) {
        containerElement.classList.toggle("hidden");
        button.style.opacity = "1";
        button.style.opacity = "1";
      } else {
        const containerElement = document.createElement("div");
        containerElement.classList.add("border", "comment_replies");

        const replyTemplate = document.createElement("div");
        replyTemplate.classList.add("comment_body");

        replyTemplate.innerHTML = `
        <div class="comment_card comment">
          <img src="./images/avatars/image-juliusomo.webp" alt="" />
          <textarea placeholder="Add a comment..."></textarea>
          <button class='reply-button'>Reply</button>
        </div>
      `;

        containerElement.appendChild(replyTemplate);
        commentElement.after(containerElement);

        button.style.opacity = "0.6";
        button.style.opacity = "0.6";
      }
    });
  });

  const editButtons = commentWrap.querySelectorAll(".edit-button");
  editButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const commentElement = e.target.closest(".comment_body");
      const commentText = commentElement.querySelector(".db-text");
      const replyText = commentElement.querySelector(".reply-to");

      const editButton = commentElement.querySelector(".edit-button");
      const deleteButton = commentElement.querySelector(".delete-button");
      let updateButton = commentElement.querySelector(".update-button");

      const textWrap = document.createElement("div");
      textWrap.classList.add("text");
      textWrap.contentEditable = true;

      const replySpan = document.createElement("span");
      replySpan.classList.add("reply-to");
      replySpan.textContent = replyText.textContent;

      textWrap.appendChild(replySpan);
      textWrap.appendChild(commentText.cloneNode(true));

      replyText.parentNode.replaceChild(textWrap, replyText);
      commentText.remove();

      textWrap.focus();

      if (!updateButton) {
        editButton.style.opacity = "0.6";
        deleteButton.style.opacity = "0.6";

        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("update_button");

        updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.classList.add("update-button");

        buttonDiv.appendChild(updateButton);
        commentElement.appendChild(buttonDiv);

        commentElement.setAttribute("data-updated", "true");
      } else {
        const buttonDiv = updateButton.parentNode;
        buttonDiv.classList.remove("hidden");
        editButton.style.opacity = "1";
        deleteButton.style.opacity = "1";
      }
    });
  });

  const deleteButtons = commentWrap.querySelectorAll(".delete-button");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (e) => {
      const commentElement = e.target.closest(".comment_body");

      const deleteSection = document.querySelector(".delete-section");

      const deleteCont = document.createElement("div");
      deleteCont.classList.add("delete-container");

      deleteCont.innerHTML = `
      <div class="delete-text">
            <h3>Delete comment</h3>
            <p>
              Are you sure you want to delete this comment? This will remove the
              comment and cant be undone
            </p>
          </div>
          <div class="delete-buttons">
            <button class="yes">YES, DELETE</button>
            <button class="no">NO, CANCEL</button>
          </div>
      `;

      deleteSection.appendChild(deleteCont);
      commentElement.after(deleteSection);
      deleteSection.classList.remove("hidden");

      const yesButton = deleteSection.querySelector(".yes");
      const noButton = deleteSection.querySelector(".no");

      yesButton.addEventListener("click", () => {
        commentElement.classList.add("hidden");
        deleteSection.classList.add("hidden");
      });

      noButton.addEventListener("click", () => {
        deleteSection.classList.add("hidden");
        commentElement.classList.remove("hidden");
      });
    });
  });
};
