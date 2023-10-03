let clickingAreaNode = document.getElementById("clickingArea");
let learningAreaNode = document.getElementById("learning_container");
let relationAreaNode = document.getElementById("relation_container")
let {
    seconds,
    knowledge,
    knowledgePerClick,
    knowledgePerSec,
    learningList,
    relations,
    startTimestamp,
} = getInitialState();

function getInitialState() {
    return {
        intervalId: setInterval(administrateTime, 200),
        startTimestamp: new Date().getTime(),
        sec: 0,
        knowledge: 0,
        knowledgePerClick: 1,
        knowledgePerSec: 0,
        learningList: [
            {
                learningName: "Beülsz egy tanórára",
                knowledgePerClickIncrement: 1,
                description: "A tanórán megpróbálsz odafigyelni a tanárra, korlátozott mértékben nő a tudásod.",
                amount: 0,
                price: 10,
                link: "./Images/class.png",
            },
            {
                learningName: "Megírod a házi feladatodat",
                knowledgePerClickIncrement: 10,
                description: "Házi feladat írás közben átismétled az órán tanultakat és így közepes mértékben nő a tudásod.",
                amount: 0,
                price: 200,
                link: "./Images/homework.png",
            },
            {
                learningName: "Könyvtárba mész",
                knowledgePerClickIncrement: 25,
                description: "A könyvtár csendjében hatékonyabban tudsz tanulni.",
                amount: 0,
                price: 750,
                link: "./Images/library.png",
            },
            {
                learningName: "Elmész párbajszakkörre",
                knowledgePerClickIncrement: 100,
                description: "A gyakorlati oktatás nagy mértékben növeli a tudásod.",
                amount: 0,
                price: 4000,
                link: "./Images/duel class.png",
            },
            {
                learningName: "Felkészülsz a Rendes bűbájos fokozat vizsgádra",
                knowledgePerClickIncrement: 300,
                description: "A magas szintű vizsgára, gyakorlati és elméleti felkészülés is szükséges, ami rendkívüli mértékben növeli a tudásod.",
                amount: 0,
                price: 15000,
                link: "./Images/RBF.png",
            },
            {
                learningName: "Felkészülsz a Rémesen Agyfacsaró Varázstani Szigorlat vizsgádra",
                knowledgePerClickIncrement: 1000,
                description: "Az iskolában eléérhető legmagasabb szintű vizsgára, gyakorlati és elméleti felkészülés is szükséges, ami varázslatosan nagy mértékben növeli a tudásod.",
                amount: 0,
                price: 100000,
                link: "./Images/RAVASZ.png",
            }
        ],
        relations: [
            {
                relationName: "Barátokat szerzel.",
                knowledgePerSecIncrement: 1,
                description: "A barátaid segítségével gyorsabban halad a tanulás.",
                amount: 0,
                price: 100,
                link: "./Images/Friends.png",
            },
            {
                relationName: "Segítséget kérsz a családodtól.",
                knowledgePerSecIncrement: 5,
                description: "A szüleid segítenek neked a tanulásban.",
                amount: 0,
                price: 1000,
                link: "./Images/Family.png",
            },
            {
                relationName: "Tankönyveket vásárolsz.",
                knowledgePerSecIncrement: 10,
                description: "Az új tankönyv új tudást rejteget.",
                amount: 0,
                price: 3000,
                link: "./Images/books.png",
            },
            {
                relationName: "Különórára mész egy tanárhoz.",
                knowledgePerSecIncrement: 25,
                description: "Különórán felszedhetsz egy kis extra tudást.",
                amount: 0,
                price: 10000,
                link: "./Images/special_class.png",
            },
            {
                relationName: "Különórára mész az igazgatóhoz.",
                knowledgePerSecIncrement: 100,
                description: "A nagy tudású igazgató nagy mértékű extra tudást tud átadni neked.",
                amount: 0,
                price: 50000,
                link: "./Images/diri.png",
            },
            {
                relationName: "Segítesz az iskola megvédésében.",
                knowledgePerSecIncrement: 250,
                description: "Amikor gonosz varázslók támadnak az iskolára, itt az ideje, hogy bevesd amit eddig tanultál.",
                amount: 0,
                price: 200000,
                link: "./Images/school.png",
            },
        ],
    }
};

function administrateTime() {
    let currentTimestamp = new Date().getTime();
    let elapsedTime = Math.floor((currentTimestamp - startTimestamp) / 1000);
    let rewardSeconds = elapsedTime-sec;
    if (rewardSeconds > 0) {
        knowledge += knowledgePerSec * rewardSeconds;
        sec = elapsedTime;
        render();
    }
}

function getClickingAreaTemplate() {
    return `
        <p><strong>${sec} másodperc</strong></p>
        <img src="./Images/xp.png" alt="klikkelő" data-enable_click="true">
        <p><strong>${knowledge} tudáspont</strong></p>
        <p>${knowledgePerClick} tudáspont / click</p>
        <p>${knowledgePerSec} tudáspont  / sec</p>
`;
}

function handleKnowedgeClicked(event) {
    if (event.target.dataset.enable_click === "true") {
        knowledge += knowledgePerClick;
        render();
    }
}

function formatPrice(price) {
    if (price < 1000) return price;
    let kValue = price / 1000;
    return `${kValue}K`;
}

function getLearnings(learningList, index) {
    return `
    <tr>
        <td>
            <p><strong>${learningList.learningName} (${learningList.knowledgePerClickIncrement} knowledge / click)</strong></p>
            <p>${learningList.description}</p>
        </td>
        <td class="price">
            <p>db: ${learningList.amount}</p>
            <p>ár: ${formatPrice(learningList.price)}</p>
        </td>
        <td>
            <img src="${learningList.link}" alt="${learningList.learningName}" data-index="${index}">
        </td>
    </tr>
    `;
}

function handleLearningsClicked(event) {
    const clickIndex = event.target.dataset.index;
    if (typeof clickIndex !== "undefined") {
        let clickedLearning = learningList[clickIndex];
        if (knowledge < clickedLearning.price) {
            alert("Nem áll rendelkezésedre elég tudáspont!");
            return;
        }
        knowledge -= clickedLearning.price;
        knowledgePerClick += clickedLearning.knowledgePerClickIncrement;
        clickedLearning.amount++;
        render();
    }
}

function getRelations(relations, index) {
    return `
    <tr>
        <td>
            <img src="${relations.link}" alt="${relations.relationName}" data-index="${index}">
        </td>
        <td class="price">
            <p>db: ${relations.amount}</p>
            <p>ár: ${formatPrice(relations.price)}</p>
        </td>
        <td>
            <p><strong>${relations.relationName} (${relations.knowledgePerSecIncrement} knowledge / sec)</strong></p>
            <p>${relations.description}</p>
        </td>
    </tr>
    `;
}

function handleRelaionsClicked(event) {
    const clickIndex = event.target.dataset.index;
    if (typeof clickIndex !== "undefined") {
        let clickedRelation = relations[clickIndex];
        if (knowledge < clickedRelation.price) {
            alert("Nem áll rendelkezésedre elég tudáspont!");
            return;
        }
        knowledge -= clickedRelation.price;
        knowledgePerSec += clickedRelation.knowledgePerSecIncrement;
        clickedRelation.amount++;
        render();
    }
}

function render() {
    clickingAreaNode.innerHTML = getClickingAreaTemplate();
    document.getElementById("learnings").innerHTML = learningList.map(getLearnings).join("");
    document.getElementById("relations").innerHTML = relations.map(getRelations).join("");
}

function initialize() {
    let data = getInitialState();
    sec = data.sec;
    knowledge = data.knowledge;
    knowledgePerClick = data.knowledgePerClick;
    knowledgePerSec = data.knowledgePerSec;

    clickingAreaNode.addEventListener('click', handleKnowedgeClicked);
    learningAreaNode.addEventListener('click', handleLearningsClicked);
    relationAreaNode.addEventListener('click', handleRelaionsClicked);
    render();
}

initialize();