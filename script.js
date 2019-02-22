function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();

    const githubHandle = $('input[type="text"]').val();
    getRepos(githubHandle);
  });
}

function getRepos(handle) {
  const searchURL = `https://api.github.com/users/${handle}/repos`;

  fetch(searchURL)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson));
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
