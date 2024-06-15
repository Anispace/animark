const query = 'one';
const provider = 'mangahere';

fetch(`https://animark-api.vercel.app/meta/anilist-manga/${query}`)
.then(res => res.json())
.then(data => {
  console.log()
  data.results.forEach((data, i) => {

    cardCode = `
    <div class="relative w-[2vh] rounded-md h-72 bg-cover bg-center" style="background-image: url('${data.image}');">
     <a href="./info.html?type=manga&id=${data.id}&provider=${provider}&img=${data.image}">
      <div class="absolute inset-0 bg-black opacity-50 rounded-md"></div>
      <div class="absolute bottom-0 left-0 p-4 text-white">
        ${data.title.userPreferred}
      </div>
      </a>
    </div>

    `;
    console.log(cardCode);
    document.getElementById('cet').innerHTML += cardCode
  });

})
