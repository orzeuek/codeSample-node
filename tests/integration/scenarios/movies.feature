Feature:
#
  Scenario: Add single movie and read it
    When POST request with 'singleMovieRequest.json' content has been sent to '/movies'
    Then I should receive movie identifiers
    When GET request has been sent to '/movies/0'
    Then Movie object should be returned

  Scenario: Add multiple movies and get list of all movies
    When POST request with 'multipleMovieRequest.json' content has been sent to '/movies'
    Then I should receive movie identifiers
    When GET request has been sent to '/movies'
    Then List of 3 movies should be returned

  Scenario: Get non exiting movie
    When GET request has been sent to '/movies/0'
    Then Object with id 0 should not be found
