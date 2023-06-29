const theme = 'theme';
const dataTheme = 'data-theme';
const themeTab = '.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';

const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible'

const dataFilter = '[data-filter]';
const portfolioData = '[data-item]';

const root = document.documentElement;
//portfolio data array
const portfolioArray = [
    {
        category: "portrait",
        image: "./_img/portfolio-7.jpg",
        title: "Lady Gaga Chromatica"
    },
    // Add more portfolio items as needed
];

//theme
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

//portfolio
const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);
const searchBox = document.querySelector('#search');


//modal
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

const setActive = (elm, selector) => {
    if (document.querySelector(`${selector}.${active}`) !== null) {
        document.querySelector(`${selector}.${active}`).classList.remove(active);
    }
    elm.classList.add(active);
};

const setTheme = (val) => {
    if (val === dark) {
        root.setAttribute(dataTheme, dark);
        localStorage.setItem(theme, dark);
    } else {
        root.setAttribute(dataTheme, light);
        localStorage.setItem(theme, light);
    }
};

if (currentTheme) {
    root.setAttribute(dataTheme, currentTheme);
    switcher.forEach((btn) => {
        btn.classList.remove(active);
    });

    if(currentTheme === dark) {
        switcher[1].classList.add(active);
    } else {
        switcher[0].classList.add(active);
    }
}

toggleTheme.addEventListener('click', function() {
    const tab = this.parentElement.parentElement;
    if (!tab.className.includes(open)) {
        tab.classList.add(open);
    } else {
        tab.classList.remove(open);
    }
});

for (const elm of switcher) {
    elm.addEventListener('click' , function() {
        const toggle = this.dataset.toggle;
        setActive(elm, switcherBtn);
        setTheme(toggle);
    })
}

searchBox.addEventListener('keyup', (e) => {
    const searchInput = e.target.value.toLowerCase().trim();
    //console.log(searchInput);
    portfolioItems.forEach((card) => {
        if (card.dataset.item.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    })
});

for (const link of filterLink) {
    link.addEventListener('click', function() {
        setActive(link, '.filter-link');
        const filter = this.dataset.filter;
        portfolioItems.forEach((card) => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else if (card.dataset.item === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        })
    })
}

// Full Site Modal "open buttons"
for (const elm of openModal) {
    elm.addEventListener('click', function() {
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible);
    })
}

for (const elm of closeModal) {
    elm.addEventListener('click', function() {
        this.parentElement.parentElement.classList.remove(isVisible);
    })
}

// Create a function to generate the portfolio cards
function generatePortfolioCards(portfolioData) {
    var portfolioContainer = document.getElementById("portfolio-container");

    // Iterate over the portfolio data array
    for (var i = 0; i < portfolioData.length; i++) {
        var data = portfolioData[i];

      // Create the necessary HTML elements
        var portfolioCard = document.createElement("div");
        portfolioCard.className = "portfolio-card";
        portfolioCard.setAttribute("data-item", data.category);

        var cardBody = document.createElement("div");
        cardBody.className = "card-body";

        var image = document.createElement("img");
        image.src = data.imgSrc;
        image.alt = "portfolio icon";

        var popupLink = document.createElement("a");
        popupLink.href = "#";
        popupLink.className = "card-popup-box";

        var categoryDiv = document.createElement("div");
        categoryDiv.textContent = data.category;

        var titleH3 = document.createElement("h3");
        titleH3.textContent = data.title;

      // Append the elements to their respective parents
        popupLink.appendChild(categoryDiv);
        popupLink.appendChild(titleH3);
        cardBody.appendChild(image);
        cardBody.appendChild(popupLink);
        portfolioCard.appendChild(cardBody);

      // Append the portfolio card to the portfolio container
        portfolioContainer.appendChild(portfolioCard);
    }
}

  // Call the function to generate portfolio cards using the portfolioArray
generatePortfolioCards(portfolioArray);