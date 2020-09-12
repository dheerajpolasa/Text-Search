{
  const tagContainer = $('.tag-container');
  const tagInput = $('.tag-container input');
  const form = $('#new-question-form');
  const formSubmitBtn = $('#form-submit-btn');

  let tags = [];

  // Function to return the tag DOM
  function createTagDOM(label) {
    return `
    <div class="tag">
        <span>${label} </span> <i class="material-icons" data-attr=${label}> close </i>
    </div>
    `;
  }

  // Functio to reset all the tags in the tags container
  function resetTags() {
    $('.tag').each(function () {
      $(this).remove();
    });
  }

  // Function to add tags
  function addTags() {
    resetTags();
    tags
      .slice()
      .reverse()
      .forEach((tag) => {
        const tagInput = createTagDOM(tag);
        $(tagContainer).prepend(tagInput);
      });
  }

  // Function to add the new tag
  function addTag(e) {
    e.stopPropagation();
    if (e.key === 'Enter') {
      console.log(e.target);
      tags.push(e.target.value);
      addTags();
      $(e.target).val('');
    }
  }

  // function to stop form on submit
  function stopFormSubmit(e) {
    e.preventDefault();
  }

  // Function to delete the tag from DOM
  function deleteTag(event) {
    console.log('Documents', $(event.target));
    if ($(event.target).prop('tagName') === 'I') {
      console.log('Hey');
      const deleteTagValue = $(event.target).attr('data-attr');
      tags = tags.filter((tag) => tag !== deleteTagValue);
      console.log(tags);
      addTags();
    }
  }

  // Function to send Ajax request to server to add the question to db
  function sendAjaxRequest(event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.key === 'Enter') {
      console.log('Enter');
      return;
    }
    let form = new FormData();
    const question = $("#new-question-form input[name='question']").val();
    const topic = $("#new-question-form input[name='topic']").val();

    form.append('question', question);
    form.append('topic', topic);
    console.log(tags);
    form.append('tags', JSON.stringify(tags));

    for (let pair of form.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    console.log(form);

    $.ajax({
      type: 'post',
      data: {
        question: question,
        topic: topic,
        tags: JSON.stringify(tags),
      },
      url: '/questions/add',
      success: function (data) {
        console.log(data);
        sendNotySuccess(data.message);
        $('#new-question-form')[0].reset();
        resetTags();
        tags = [];
      },
    });
  }

  // Send Noty Success Error
  function sendNotySuccess(message) {
    new Noty({
      theme: 'relax',
      layout: 'topRight',
      timeout: 1500,
      type: 'success',
      text: message,
    }).show();
  }

  // Initialize all the event listeners here
  function init() {
    $(tagInput).keyup(addTag);
    $(form).submit(stopFormSubmit);
    $(document).click(deleteTag);
    $(formSubmitBtn).click(sendAjaxRequest);
  }

  init();
}
