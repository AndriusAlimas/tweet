// DOM objects
const search = document.getElementById("search");
const getTweets = document.getElementById("getTweets");
const carouselInnerOutput = document.getElementById("carouselInnerOutput");

// Event Listener
getTweets.addEventListener("click", getAllTweets);
// ********************   FUNCTIONS *********************
function getAllTweets() {
  document.getElementById("radioByPerson").checked === true
    ? (search.value = "from:" + search.value)
    : "";

  const url = "/tweets/" + search.value;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      outputTweets(data.statuses);
      search.value = "";
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
    });
}

function outputTweets(data) {
  console.log("data: ", data);
  carouselInnerOutput.innerHTML = "";
  // BUild carousel item images
  data.map((item) => {
    if (item["extended_entities"] != undefined) {
      let user = item.user.name;
      for (let i = 0; i < item.extended_entities.media.length; i++) {
        let carouselCaption = document.createElement("div");
        carouselCaption.classList.add("carousel-caption");
        carouselCaption.classList.add("d-none");
        carouselCaption.classList.add("d-md-block");
        let h5 = document.createElement("h5");
        let p = document.createElement("p");
        h5.innerHTML = user;
        p.innerHTML = item.full_text;
        carouselCaption.appendChild(h5);
        carouselCaption.appendChild(p);
        let divCarouselItem = document.createElement("div");
        divCarouselItem.classList.add("carousel-item");
        if (item.extended_entities.media.length > 0) {
          let link = document.createElement("a");
          console.log(item.extended_entities.media[i].display_url);
          link.setAttribute(
            "href",
            item.extended_entities.media[i].expanded_url
          );

          let img = document.createElement("img");
          img.setAttribute(
            "title",
            item.extended_entities.media[i].expanded_url
          );
          img.classList.add("d-block");
          img.classList.add("w-100");
          img.setAttribute(
            "src",
            `${item.extended_entities.media[i].media_url}`
          );
          link.appendChild(img);
          divCarouselItem.appendChild(link);
          divCarouselItem.appendChild(carouselCaption);
          carouselInnerOutput.appendChild(divCarouselItem);
          document
            .getElementsByClassName("carousel-item")[0]
            .classList.add("active");
        } else {
          console.log("No images");
        }
      }
    }
  });
}
