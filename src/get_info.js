// episode download link

function getParameterByName(name) {
    name = name.replace(/[\[\]]/g, '\\$&');
    let url = window.location.href;
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    let results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

let type = getParameterByName('type');
console.log("type: ",type);

const img = getParameterByName('img')
console.log("img: ",img);
// check if the given url is anime or manga

if(type == 'manga') {
  document.getElementById('anieman').src = `${img}`
} else if (type == 'anime') {


  async function getEpList(total) {
      Episode_List = total;
      const TotalEp = total.length;
      let html = "";
      let loadedFirst = false;

      for (let i = 0; i < total.length; i++) {
          const epnum = Number(total[i][0].replaceAll("-", "."));

          if ((epnum - 1) % 100 === 0) {
              let epUpperBtnText;

              if (TotalEp - epnum < 100) {
                  epUpperBtnText = `${epnum} - ${TotalEp}`;
                  html += `<option class="ep-btn" data-from=${epnum} data-to=${TotalEp}>${epUpperBtnText}</option>`;

                  if (!loadedFirst) {
                      // load first episode list
                      getEpLowerList(epnum, TotalEp);
                      loadedFirst = true;
                  }
              } else {
                  epUpperBtnText = `${epnum} - ${epnum + 99}`;
                  html += `<option class="ep-btn" data-from=${epnum} data-to=${epnum + 99
                      }>${epUpperBtnText}</option>`;

                  if (!loadedFirst) {
                      // load first episode list
                      getEpLowerList(epnum, epnum + 99);
                      loadedFirst = true;
                  }
              }
          }
      }
      document.getElementById("episode_co").innerHTML = html;
      console.log("Episode list loaded");
  }

  let id = getParameterByName('id');
  console.log("id: ",id);
  url = `https://api-v2.anispace.workers.dev/anime/${id}`
  let url2 = `https://animark-gogo.vercel.app/info?id=${id}`
  let dlapi = `https://api-v2.anispace.workers.dev/download/${id}`

  // document.getElementById('anieman').src = `${img}`
  fetch(url2)
  .then(r => r.json())
  .then(data => {
    document.getElementById('anieman').src = data.imageUrl
    document.getElementById('title').innerHTML = data.title
    // document.getElementById('release').innerHTML = 'Release Year: ' + data.results.released
    document.getElementById('genres').innerHTML = 'Tags: ' + data.tags
    // document.getElementById('type').innerHTML = 'Type: ' + data.results.type
    document.getElementById('plot_summary').innerHTML = data.description
    // add episode cards

    for (let i = 1; i < data.totalEpisodes+1; i++) {
      console.log(`./player.html?anime=${data.id}&episode=${i}`);
      document.getElementById('episode_co').innerHTML += `<div class="card"><div class="p-4"><h3 class="text-lg font-bold mb-2">Episode ${i}</h3><a href="./player.html?anime=${data.id}&episode=${i}" class="block mt-2 text-gray-400 hover:text-white">View Details</a>    <button id="downloadButton" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="document.getElementById('dialogBox').classList.add('active')">Download</button></div></div>`
      console.log(dlapi+"-episode-"+i);


    }


  });


}
