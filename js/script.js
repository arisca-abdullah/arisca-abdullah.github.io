const favicon = document.querySelector(".favicon");
const navbar = document.querySelector("nav.navbar");
const jumbotron = document.querySelector(".jumbotron");
const footer = document.querySelector("footer");

const onresize = () => {
  jumbotron.style.marginTop = navbar.clientHeight + "px";
  jumbotron.style.minHeight =
    document.documentElement.clientHeight -
    navbar.clientHeight -
    footer.clientHeight +
    "px";
};

onresize();
window.addEventListener("resize", onresize);

fetch("https://api.github.com/users/arisca-abdullah")
  .then(res => res.json())
  .then(data => {
    jumbotron.querySelector("img").classList.remove("animate1");
    jumbotron.querySelector("h1").classList.remove("animate2", "name");
    jumbotron.querySelector("p").classList.remove("animate3", "bio");

    jumbotron.querySelector("img").classList.add("img-thumbnail");

    favicon.setAttribute("href", data.avatar_url);

    document.getElementById("github-link").setAttribute("href", data.html_url);
    document
      .getElementById("repos-link")
      .setAttribute("href", data.html_url + "?tab=repositories");

    jumbotron.querySelector("img").setAttribute("src", data.avatar_url);
    jumbotron.querySelector(".location").innerHTML = `
    <i class="fas fa-map-marker-alt"></i>
    <span class="ml-1 mr-2">${data.location}</span>|
    <a href="${data.html_url + "?tab=followers"}" class="ml-2">
        ${data.followers} Followers
    </a>
    `;

    jumbotron.querySelector("h1").innerHTML = data.name;
    jumbotron.querySelector("p").innerHTML = data.bio;
  });
