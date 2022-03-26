async function loadEvent() {
    const beerTypeHolder = document.querySelector(".beerTypeHolder");
    const beersObjData = await fetch("public/data.json");
    const beersObj = await beersObjData.json();

    const beerHTML = beersObj.cards.map(x => `
    <div class="beerTypes">
        <h2>${x.title}</h2>
        <h4>${x.sub}</h4>
        <p>${x.text}</p>
    </div>
    `);

    beerTypeHolder.insertAdjacentHTML("beforeend", beerHTML.join(""));

    const beerTypes = document.querySelector(".beerTypes");
    beerTypes.addEventListener("click", item => {
        item.target.classList.toggle("clickedOnce");
    });
}

window.addEventListener("load", loadEvent);