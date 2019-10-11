Feature:

  Scenario: Add single comment and read it
    When POST request with 'singleMovieRequest.json' content has been sent to '/movies'
    Then I should receive movie identifiers
    When POST request with 'comment.json' content has been sent to '/movies/0/comments'
    Then I should receive comment identifier
    When GET request has been sent to '/comments/0'
    Then Comment object should be returned

  Scenario: Add comments to movie and read all comments for movie
    When POST request with 'singleMovieRequest.json' content has been sent to '/movies'
    Then I should receive movie identifiers
    When POST request with 'comment.json' content has been sent to '/movies/0/comments'
    Then I should receive comment identifier
    When POST request with 'comment.json' content has been sent to '/movies/0/comments'
    Then I should receive comment identifier
    When GET request has been sent to '/movies/0/comments'
    Then Comments list with 2 elements should be returned

  Scenario: Get non comment movie
    When GET request has been sent to '/comments/0'
    Then Object with id 0 should not be found

  Scenario: Add comments to movie and get all comments from system
    When POST request with 'singleMovieRequest.json' content has been sent to '/movies'
    Then I should receive movie identifiers
    When POST request with 'comment.json' content has been sent to '/movies/0/comments'
    Then I should receive comment identifier
    When POST request with 'comment.json' content has been sent to '/movies/0/comments'
    Then I should receive comment identifier
    When GET request has been sent to '/comments'
    Then Comments list with 2 elements should be returned
