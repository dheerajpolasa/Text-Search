{
  const tagContainer = $('.tag-container');
  const tagInput = $('.tag-container input');
  const form = $('#new-question-form');
  const formSubmitBtn = $('#form-submit-btn');
  const searchInput = $('#search-input');

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
    if ($(event.target).prop('tagName') === 'I') {
      const deleteTagValue = $(event.target).attr('data-attr');
      tags = tags.filter((tag) => tag !== deleteTagValue);
      addTags();
    }
  }

  // Function to send Ajax request to server to add the question to db
  function sendAjaxRequest(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
      return;
    }
    const question = $("#new-question-form input[name='question']").val();
    const topic = $("#new-question-form input[name='topic']").val();
    if (question === '' || !question) {
      sendNotyError('Question is required');
      return;
    }

    if (topic === '' || !topic) {
      sendNotyError('Topic is required');
      return;
    }

    if (tags.length == 0) {
      sendNotyError('Atleast one tag is required');
      return;
    }

    $.ajax({
      type: 'post',
      data: {
        question: question,
        topic: topic,
        tags: JSON.stringify(tags),
      },
      url: '/questions/add',
      success: function (data) {
        sendNotySuccess(data.message);
        $('#new-question-form')[0].reset();
        resetTags();
        tags = [];
        const questionDOM = getQuestionDOM(data.data.question);
        $('#questions-container .questions').prepend(questionDOM);
      },
      error: function (err) {
        sendNotyError(JSON.parse(err.reponseText));
      },
    });
  }

  // To get the question DOM
  function getQuestionDOM(question) {
    return `
    <div class="question">
      <h1>${question.question}</h1>
      <div class="question-sub-topics">
        <div class="topic">${question.topic}</div>
        <div>
          <ul class="question-tags">
            ${question.tags
              .map(function (tag) {
                return "<li class='question-tag'>" + tag + '</li>';
              })
              .join('')}
          </ul>
        </div>
      </div>
    </div>
    `;
  }

  // Send Noty Success
  function sendNotySuccess(message) {
    new Noty({
      theme: 'relax',
      layout: 'topRight',
      timeout: 1500,
      type: 'success',
      text: message,
    }).show();
  }

  // Send Noty Success
  function sendNotyError(message) {
    new Noty({
      theme: 'relax',
      layout: 'topRight',
      timeout: 1500,
      type: 'error',
      text: message,
    }).show();
  }

  // Search for the questions
  function searchQuestions(event) {
    event.preventDefault();

    if (event.key == 'Enter') {
      $('#questions-container .questions').empty();
      $('#questions-container .questions').html(`
        <div id="spinner-container">  
          <div class="spinner-border text-primary" role="status" id="spinner">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      `);
      $.ajax({
        type: 'get',
        url: '/questions/search?text=' + $(this).val(),
        success: function (data) {
          $('#questions-container .questions').empty();
          for (let question of data.data.questions) {
            const questionDOM = getQuestionDOM(question);
            $('#questions-container .questions').prepend(questionDOM);
          }
        },
        error: function (err) {
          sendNotyError(JSON.parse(err.reponseText));
        },
      });
    }
  }

  // Initialize all the event listeners here
  function init() {
    $(tagInput).keyup(addTag);
    $(form).submit(stopFormSubmit);
    $(document).click(deleteTag);
    $(formSubmitBtn).click(sendAjaxRequest);
    $(searchInput).keyup(searchQuestions);
  }

  init();
}
