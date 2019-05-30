let xhr = new XMLHttpRequest();

let github_link = document.querySelector('#github-link');
let avatar = document.querySelector('.jumbotron img');
let name = document.querySelector('.jumbotron h1');
let bio = document.querySelector('.jumbotron p');
let footer = document.querySelector('footer p');

footer.innerHTML = `Copyright &copy; ${new Date().getFullYear()}`;

xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
        let res = JSON.parse(this.responseText);

        avatar.classList.remove('animate1');
        name.classList.remove('animate2', 'name');
        bio.classList.remove('animate3', 'bio');
        
        avatar.classList.add('img-thumbnail')

        github_link.setAttribute('href', res.html_url)
        avatar.setAttribute('src', res.avatar_url);

        name.innerHTML = res.name;
        bio.innerHTML = res.bio;
    }
}
xhr.open('GET', 'https://api.github.com/users/arisca-abdullah', true);
xhr.send();