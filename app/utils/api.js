export function fetchPopularRepos(language) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      if (!data.items) {
        throw new Error(data.message);
      }
      return data.items;
    });
}

function getErrorMsg(message, username) {
  if (message === 'Not Found') {
    return `${username} does not exsist`;
  }
  return message;
}

function getProfile(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .then((profile) => {
      if (profile.message) {
        throw new Error(getErrorMsg(profile.message, username));
      }
      return profile;
    });
}

function getRepos(username) {
  return fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    .then((response) => response.json())
    .then((repos) => {
      if (repos.message) {
        throw new Error(getErrorMsg(repos.message, username));
      }
      return repos;
    });
}

function getUserData(player) {
  return Promise.all([getProfile(player), getRepos(player)]).then(([profile, repos]) => ({
    profile,
    score: calculateScore(profile.followers, repos),
  }));
}

function getStarCount(repos) {
  return repos.reduce((count, { stargazers_count }) => {
    return count + stargazers_count;
  }, 0);
}

function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

export function battle(players) {
  return Promise.all([getUserData(players[0]), getUserData(players[1])]).then(sortPlayers);
}
