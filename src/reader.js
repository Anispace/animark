function getParameterByName(name) {
    name = name.replace(/[\[\]]/g, '\\$&');
    let url = window.location.href;
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    let results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
//
// let chapterId = getParameterByName('chapterId');
// console.log("chapter: ",chapterId);
// let provider = getParameterByName('provider');
// console.log("provider: ",provider);

document.addEventListener('DOMContentLoaded', function() {
  const url = 'https://animark-api.vercel.app/manga/mangapill/read?chapterId=3069-10700000/naruto-chapter-700';
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

  fetch(proxyUrl + url)
    .then(response => response.json())
    .then(data => {
      const gallery = document.getElementById('imgHol');
      data.forEach(item => {
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = `Page ${item.page}`;
        gallery.appendChild(img);
      });
    })
    .catch(error => {
      console.error('Error fetching the JSON data:', error);
    });
});
