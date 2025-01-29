window.addEventListener("load", () => {
    const clickerPrice = document.getElementById("clicker-price");
    const farmPrice = document.getElementById("farm-price");
    const minePrice = document.getElementById("mine-price");
    const factoryPrice = document.getElementById("factory-price");
    const labPrice = document.getElementById("lab-price");
    const nuclearPrice = document.getElementById("nuclear-price");

    clickerPrice.innerText = "5";
    farmPrice.innerText = "100";
    minePrice.innerText = "5000";
    factoryPrice.innerText = "20000";
    labPrice.innerText = "100000";
    nuclearPrice.innerText = "5000000";
});

document.addEventListener("DOMContentLoaded", () => {
    let mainNumber = 0;
    let perSecond = 0;
    let upgrades = {
        clicker: { count: 0, price: 5, rate: 1 },
        farm: { count: 0, price: 100, rate: 5 },
        mine: { count: 0, price: 5000, rate: 20 },
        factory: { count: 0, price: 20000, rate: 50 },
        lab: { count: 0, price: 100000, rate: 200 },
        nuclear: { count: 0, price: 5000000, rate: 1000 }
    };

    const displayNumber = document.getElementById("display-main-number");
    const perSecondDisplay = document.querySelector(".per-sec");
    const clickMe = document.getElementById("click-me");

    clickMe.addEventListener("click", () => {
        mainNumber++;
        updateDisplay();
    });

    function updateDisplay() {
        displayNumber.innerText = mainNumber;
        perSecondDisplay.innerText = perSecond;
    }

    function buyUpgrade(type) {
        let upgrade = upgrades[type];
        if (mainNumber >= upgrade.price) {
            mainNumber -= upgrade.price;
            upgrade.count++;
            perSecond += upgrade.rate;
            console.log("Before updating price: " + upgrade.price)
            upgrade.price = updatePrice(type, upgrade.price);
            console.log("After updating price: " + upgrade.price)
            updateDisplay();
            updateUpgradeUI(type, upgrade.price);
        }
    }

    function updatePrice(type, price) {
        let newPrice;
        switch (type) {
            case "clicker":
                newPrice = Math.max(price + 2, Math.floor(price * 1.15)); 
                break;
            case "farm":
                newPrice = Math.max(price + 20, Math.floor(price * 1.25)); 
                break;
            case "mine":
                newPrice = Math.max(price + 100, Math.floor(price * 1.50)); 
                break;
            case "factory":
                newPrice = Math.max(price + 2000, Math.floor(price * 1.66)); 
                break;
            case "lab":
                newPrice = Math.max(price + 50000, Math.floor(price * 1.88)); 
                break;
            case "nuclear":
                newPrice = Math.max(price + 1000000, Math.floor(price * 2)); 
                break;
            default:
                throw new Error(`Invalid upgrade type: ${type}`);
        }
        console.log(`New price for ${type}: ${newPrice}`);
        return newPrice;
    }

    function updateUpgradeUI(type, price) {
        document.getElementById(`${type}-count`).innerText = upgrades[type].count;
        document.getElementById(`${type}-persec`).innerText = upgrades[type].rate * upgrades[type].count;
        document.getElementById(`${type}-price`).innerText = price;
    }

    setInterval(() => {
        mainNumber += perSecond;
        updateDisplay();
    }, 1000);

    document.querySelectorAll(".buy-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const type = event.target.id.replace("buy-", "");
            buyUpgrade(type);
        });
    });
});