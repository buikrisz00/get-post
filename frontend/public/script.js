async function loadEvent() {
    const rootElement = document.getElementById("root");
    const beerHolder = document.querySelector(".beerHolder");
    const beersObjData = await fetch("public/data.json");
    const beersObj = await beersObjData.json();

    const beerHTML = beersObj.cards.map(x => `
    <div class="beerTypes">
        <h2>${x.title}</h2>
        <h4>${x.sub}</h4>
        <p>${x.text}</p>
    </div>
    `);

    beerHolder.insertAdjacentHTML("beforeend", beerHTML.join(""));

    let drunkCounter = 0;
    const beerTypes = document.querySelectorAll(".beerTypes");

    for (const beerType of beerTypes) {
        beerType.addEventListener("click", item => {
            // Move beer to hand
            const hideBeers = document.querySelectorAll(".clicked");
            item.target.classList.toggle("clicked");

            
            // Set drunkCounter to the number of clicked beers
            const clickedBeer = document.querySelectorAll(".clicked");
            const barImg = document.querySelector(".progress img");
            drunkCounter = clickedBeer.length;

            // Create empty glass for beer
            rootElement.insertAdjacentHTML("beforeend", `<img src="./public/images/empty_beer.png" alt="Empty glass" class="empty_glass">`);
            const almost_empty_glass = document.querySelector(".empty_glass");
            if (drunkCounter > 1) {
                for (const hideBeer of hideBeers) {
                    if (!hideBeer.classList.contains("hide")) {
                        hideBeer.classList.add("hide");
                    }
                }
                almost_empty_glass.classList.remove("empty_glass");
                almost_empty_glass.classList.add("empty_glass_clicked");
            }

            // Counter
            const counterElement = document.querySelector(".counter");
            const emptyGlasses = document.querySelectorAll(".empty_glass_clicked");
            if (emptyGlasses.length > 0) {
                setTimeout(x => {
                    counterElement.innerHTML = emptyGlasses.length;
                }, 2000)
            }

            
            // Give the drunkness bar the class of current drunkness
            const drunknessBar = document.querySelector(".bar");
            if (drunknessBar.classList.length === 1) {
                drunknessBar.classList.add(`beer${drunkCounter}`);
                barImg.classList.add(`beer${drunkCounter}`);
            } else {
                drunknessBar.className = "";
                drunknessBar.classList.add(`bar`);
                drunknessBar.classList.add(`beer${drunkCounter}`);
                rootElement.className = "";
                rootElement.classList.add(`beer${drunkCounter}`);
                barImg.className = "";
                barImg.classList.add(`beer${drunkCounter}`);
                const barImgReflow = document.querySelector(`img.beer${drunkCounter}`);
                barImgReflow.style.animation = 'none';
                barImgReflow.offsetHeight = barImgReflow.offsetHeight;
                barImgReflow.style.animation = null;
            }

            if (drunkCounter === 10) {
                rootElement.insertAdjacentHTML("beforeend", `
                    <div class="gameOverDiv">
                        <a href=""><img src="./public/images/game-over.gif"></a>
                    </div>
                `);
            }
        });
    }

    const beerDataDiv = document.querySelector(".beerDataDiv");
    for (let i = 0; i < beerTypes.length; i++) {
        beerTypes[i].addEventListener("mouseover", e => {
            beerDataDiv.innerHTML = "";
            beerDataDiv.insertAdjacentHTML("beforeend", e.target.innerHTML)
            beerDataDiv.classList.add("show");
        });
        beerTypes[i].addEventListener("mouseout", e => {
            beerDataDiv.classList.remove("show");
        });

    }
}


window.addEventListener("load", loadEvent);