function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();

    const githubHandle = $('input[type="text"]').val();
    getRepos(githubHandle);
  });

  $('#js-error-message').text('');
  $('input[type="text"]').val('');
}

function getRepos(handle) {
  const searchURL = `https://api.github.com/users/${handle}/repos`;

  fetch(searchURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      $('#js-error-message').text(`Something went wrong: ${error.message}`);
    });
}

function displayResults(responseJson) {
  $('#results-ul').empty();
  $('input[type="text"]').val('');

  let results = responseJson.map(index => {
    $('#results-ul').append(`
    <li>Repo Name: ${index.name} <a href="${
      index.owner.html_url
    }">Go to repo</a>
    </li>`);
  });

  $('#results').removeClass('hidden');
}

$(watchForm);
