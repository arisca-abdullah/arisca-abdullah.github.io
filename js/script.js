const xhr = new XMLHttpRequest();

const favicon = document.querySelector('.favicon');
const navbar = document.querySelector("nav.navbar");
const jumbotron = document.querySelector(".jumbotron");
const footer = document.querySelector("footer");

const onresize = () => {
    jumbotron.style.marginTop = navbar.clientHeight + "px";
    jumbotron.style.minHeight = (document.documentElement.clientHeight - navbar.clientHeight - footer.clientHeight) + "px";
}

onresize();
window.addEventListener("resize", onresize);

xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
        const res = JSON.parse(this.responseText);

        jumbotron.querySelector("img").classList.remove('animate1');
        jumbotron.querySelector("h1").classList.remove('animate2', 'name');
        jumbotron.querySelector("p").classList.remove('animate3', 'bio');
        
        jumbotron.querySelector("img").classList.add('img-thumbnail')

        favicon.setAttribute('href', res.avatar_url);
        document.getElementById("github-link").setAttribute('href', res.html_url);
        document.getElementById("repos-link").setAttribute('href', res.html_url + "?tab=repositories");
        jumbotron.querySelector("img").setAttribute('src', res.avatar_url);
        jumbotron.querySelector(".location").innerHTML = `<i class="fas fa-map-marker-alt"></i><span class="ml-1 mr-2">${res.location}</span>|<a href="${res.html_url + '?tab=followers'}" class="ml-2">${res.followers} Followers</a>`;

        jumbotron.querySelector("h1").innerHTML = res.name;
        jumbotron.querySelector("p").innerHTML = res.bio;
    }
}
xhr.open('GET', 'https://api.github.com/users/arisca-abdullah', true);
xhr.send();