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
    jumbotron.querySelector(".location").classList.remove("animate2-5", "loading-location");
    jumbotron.querySelector(".bio").classList.remove("animate3", "loading-bio");
    jumbotron.querySelector(".extra").classList.remove("animate3-5", "loading-extra");

    jumbotron.querySelector("img").classList.add("img-thumbnail");

    document.getElementById("github-link").setAttribute("href", data.html_url);
    document
      .getElementById("repos-link")
      .setAttribute("href", data.html_url + "?tab=repositories");

    jumbotron.querySelector("img").setAttribute("src", data.avatar_url);
    jumbotron.querySelector(".location").innerHTML = `
    <i class="fas fa-map-marker-alt mr-1"></i> Live in ${data.location}
    `;
    jumbotron.querySelector(".extra").innerHTML = `
    <a class="mx-2" href="${data.html_url + "?tab=repositories"}">
        <i class="fas fa-folder-open"></i>
        ${data.public_repos} Repositories
    </a>|
    <a class="mx-2" href="${data.html_url + "?tab=followers"}">
        <i class="fas fa-users"></i>
        ${data.followers} Followers
    </a>
    `;

    jumbotron.querySelector("h1").innerHTML = data.name;
    jumbotron.querySelector(".bio").innerHTML = data.bio;
  });
