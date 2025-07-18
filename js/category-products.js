// js/category-products.js

document.addEventListener("DOMContentLoaded", () => {
    const categoryItems = document.querySelectorAll(".category-item");
    const categoryProductsSection = document.getElementById("category-products-section");
    const categoryProductsTitle = document.getElementById("category-products-title");
    const categoryProductsGrid = document.getElementById("category-products-grid");
    const backToCategoriesBtn = document.getElementById("back-to-categories-btn");

    // Get references to all sections that need to be shown/hidden
    const categoriesSection = document.getElementById("categories-section");
    const featuredProductsSection = document.getElementById("featured-products-section");
    const newArrivalsSection = document.getElementById("new-arrivals-section");
    const policySection = document.querySelector(".policy");

    // Determine if we are on the shop.html page or index.html page
    // (assuming index.html is the home page where .slider and .campaign-single exist)
    const isShopPage = window.location.pathname.includes("shop.html");

    // References to sections specific to index.html (home page)
    // These might not exist on shop.html, so check for their existence before manipulating
    const sliderSection = document.querySelector(".slider");
    const campaignSingleSection = document.querySelector(".campaign-single");

    const allProducts = {
        smartphone: [{
            id: 1, name: "Samsung Galaxy S24 Ultra", img1: "img/products/smartphone/samsung-s24-ultra.png", price: 1199.00, oldPrice: 1300, discount: 8, stars: 4.8
        }, {
            id: 2, name: "iPhone 15 Pro Max", img1: "img/products/smartphone/iphone-15-pro-max.png", price: 1099.00, oldPrice: 1200, discount: 8, stars: 4.7
        }, {
            id: 3, name: "Google Pixel 8 Pro", img1: "img/products/smartphone/google-pixel-8-pro.png", price: 899.00, oldPrice: 950, discount: 5, stars: 4.5
        }, {
            id: 4, name: "OnePlus 12", img1: "img/products/smartphone/oneplus-12.png", price: 799.00, oldPrice: 850, discount: 6, stars: 4.6
        }, ],
        watches: [{
            id: 5, name: "Rolex Submariner", img1: "img/products/watches/rolex-submariner.png", price: 15000.00, oldPrice: 16500, discount: 9, stars: 4.9
        }, {
            id: 6, name: "Apple Watch Series 9", img1: "img/products/watches/apple-watch-series-9.png", price: 399.00, oldPrice: 450, discount: 11, stars: 4.7
        }, {
            id: 7, name: "TAG Heuer Carrera", img1: "img/products/watches/tag-heuer-carrera.png", price: 5000.00, oldPrice: 5500, discount: 9, stars: 4.6
        }, {
            id: 8, name: "Garmin Fenix 7", img1: "img/products/watches/garmin-fenix-7.png", price: 699.00, oldPrice: 750, discount: 7, stars: 4.8
        }, ],
        footwear: [{
            id: 9, name: "Nike Air Max 1", img1: "img/products/footwear/nike-air-max-1.png", price: 140.00, oldPrice: 160, discount: 12, stars: 4.5
        }, {
            id: 10, name: "Adidas Ultraboost", img1: "img/products/footwear/adidas-ultraboost.png", price: 130.00, oldPrice: 150, discount: 13, stars: 4.6
        }, {
            id: 11, name: "Clarks Desert Boot", img1: "img/products/footwear/clarks-desert-boot.png", price: 150.00, oldPrice: 170, discount: 11, stars: 4.4
        }, {
            id: 12, name: "Timberland 6-inch Boot", img1: "img/products/footwear/timberland-6-inch-boot.png", price: 190.00, oldPrice: 220, discount: 14, stars: 4.3
        }, ],
        fashion: [{
            id: 13, name: "Zara Flowy Midi Dress", img1: "img/products/fashion/zara-flowy-midi-dress.png", price: 69.99, oldPrice: 85, discount: 18, stars: 4.2
        }, {
            id: 14, name: "Levi's 501 Original Jeans", img1: "img/products/fashion/levis-501-jeans.png", price: 79.50, oldPrice: 90, discount: 11, stars: 4.5
        }, {
            id: 15, name: "H&M Cotton T-Shirt", img1: "img/products/fashion/hm-cotton-tshirt.png", price: 14.99, oldPrice: 20, discount: 25, stars: 4.0
        }, {
            id: 16, name: "Calvin Klein Bomber Jacket", img1: "img/products/fashion/calvin-klein-bomber-jacket.png", price: 120.00, oldPrice: 150, discount: 20, stars: 4.3
        }, ],
    };

    function generateStarRating(rating) {
        let starsHtml = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<li><i class="bi bi-star-fill"></i></li>';
        }
        if (hasHalfStar) {
            starsHtml += '<li><i class="bi bi-star-half"></i></li>';
        }
        for (let i = 0; i < (5 - Math.ceil(rating)); i++) {
            starsHtml += '<li><i class="bi bi-star"></i></li>';
        }
        return starsHtml;
    }

    function createProductCard(product) {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");

        const starsHtml = generateStarRating(product.stars);

        productItem.innerHTML = `
            <div class="product-image">
                <a href="single-product.html?id=${product.id}">
                    <img src="${product.img1}" alt="${product.name}" class="img1" />
                    </a>
            </div>
            <div class="product-info">
                <a href="single-product.html?id=${product.id}" class="product-title">${product.name}</a>
                <ul class="product-star">
                    ${starsHtml}
                </ul>
                <div class="product-prices">
                    <strong class="new-price">$${product.price.toFixed(2)}</strong>
                    <span class="old-price">$${product.oldPrice.toFixed(2)}</span>
                </div>
                <span class="product-discount"> -${product.discount}% </span>
                <div class="product-links">
                    <button><i class="bi bi-basket-fill"></i></button>
                    <button><i class="bi bi-heart-fill"></i></button>
                    <a href="single-product.html?id=${product.id}"><i class="bi bi-eye-fill"></i></a>
                    <button><i class="bi bi-share-fill"></i></button>
                </div>
            </div>
        `;
        return productItem;
    }

    function displayCategoryProducts(categoryName, products) {
        if (!categoryProductsGrid || !categoryProductsTitle || !categoryProductsSection) {
            console.error("Missing elements for category product display.");
            return;
        }

        categoryProductsGrid.innerHTML = "";
        categoryProductsTitle.textContent = `${categoryName} Products`;

        products.forEach(product => { // Changed from .slice(0, 4) to show all
            const productCard = createProductCard(product);
            categoryProductsGrid.appendChild(productCard);
        });

        // Hide main sections
        if (categoriesSection) categoriesSection.style.display = "none";
        if (featuredProductsSection) featuredProductsSection.style.display = "none";
        if (newArrivalsSection) newArrivalsSection.style.display = "none";
        if (policySection) policySection.style.display = "none";

        // Conditionally hide sections specific to index.html only
        if (!isShopPage) {
            if (sliderSection) sliderSection.style.display = "none";
            if (campaignSingleSection) campaignSingleSection.style.display = "none";
        }

        categoryProductsSection.style.display = "block";
    }

    categoryItems.forEach(item => {
        item.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default link behavior (like navigating to #)
            const category = item.dataset.category;
            const productsToShow = allProducts[category] || [];

            displayCategoryProducts(item.querySelector(".category-title").textContent, productsToShow);
        });
    });

    if (backToCategoriesBtn) {
        backToCategoriesBtn.addEventListener("click", () => {
            // Hide the category products section
            if (categoryProductsSection) categoryProductsSection.style.display = "none";

            // Show relevant main sections based on the current page
            if (categoriesSection) categoriesSection.style.display = "block";
            if (featuredProductsSection) featuredProductsSection.style.display = "block";
            if (newArrivalsSection) newArrivalsSection.style.display = "block";
            if (policySection) policySection.style.display = "block";

            // Conditionally show sections specific to index.html only
            if (!isShopPage) {
                if (sliderSection) sliderSection.style.display = "block";
                if (campaignSingleSection) campaignSingleSection.style.display = "block";
            }
        });
    }
});