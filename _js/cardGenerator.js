const portfolioItems = [
    {
      category: "portrait",
      image: "_img/portfolio-7.jpg",
      title: "Lady Gaga Chromatica"
    },
    // Add more portfolio items as needed
  ];
  
  function generatePortfolioCard(item) {
    const portfolioCard = document.createElement("div");
    portfolioCard.classList.add("portfolio-card");
    portfolioCard.setAttribute("data-item", item.category);
  
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
  
    const image = document.createElement("img");
    image.src = item.image;
    image.alt = "portfolio icon";
  
    const link = document.createElement("a");
    link.href = "#";
    link.classList.add("card-popup-box");
  
    const category = document.createElement("div");
    category.textContent = item.category;
  
    const title = document.createElement("h3");
    title.textContent = item.title;
  
    link.appendChild(category);
    link.appendChild(title);
    cardBody.appendChild(image);
    cardBody.appendChild(link);
    portfolioCard.appendChild(cardBody);
  
    return portfolioCard;
  }
  
  const portfolioContainer = document.getElementById("portfolio-grid");
  
  portfolioItems.forEach(item => {
    const cardElement = generatePortfolioCard(item);
    portfolioContainer.appendChild(cardElement);
  });
  