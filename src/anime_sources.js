function getParameterByName(name) {
    name = name.replace(/[\[\]]/g, '\\$&');
    let url = window.location.href;
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    let results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

if (getParameterByName('ref') == 'search' && getParameterByName('type') == 'anime') {
   if (getParameterByName('q')) {
     q = getParameterByName('q');
     const query = q;
     // const provider = 'mangahere';

     fetch(`https://api-v2.anispace.workers.dev/search/${query}`)
     .then(res => res.json())
     .then(data => {
       console.log()
       data.results.forEach((data, i) => {

         cardCode = `
         <div class="relative w-[2vh] rounded-md h-72 bg-cover bg-center" style="background-image: url('${data.img}');">
          <a href="./info.html?type=anime&id=${data.id}&img=${data.img}">
           <div class="absolute inset-0 bg-black opacity-50 rounded-md"></div>
           <div class="absolute bottom-0 left-0 p-4 text-white">
             ${data.title}
           </div>
           </a>
         </div>

         `;
         console.log(cardCode);
         document.getElementById('cet').innerHTML += cardCode
       });

     })

   } else {

   }
} else {

}
