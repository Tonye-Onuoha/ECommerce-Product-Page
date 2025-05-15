// MOBILE & DESKTOP ELEMENTS
const mobileOpenMenuButton = document.querySelector("img[alt='open-menu icon image']");
const mobileCloseMenuButton = document.querySelector("img[alt='close-menu icon image']");
const mobileOverlay = document.querySelector(".mobile-overlay");
const mobileNavigation = document.querySelector(".mobile-menu");
const cartButtons = document.querySelectorAll("img[alt='cart icon image']");
const mobileCartButton = cartButtons[0];
const desktopCartButton = cartButtons[1];
const mobileCart = document.querySelector(".mobile-cart");
const desktopCart = document.querySelector(".desktop-cart");
const cartItemInfo = document.querySelectorAll(".cart-item-info");
const mobileCartItemInfo = cartItemInfo[0];
const desktopCartItemInfo = cartItemInfo[1];
const cartNotification = document.querySelectorAll(".cart-notification");
const mobileCartNotification = cartNotification[0];
const desktopCartNotification = cartNotification[1];
const CartAddButton = document.querySelector("button");
const removeItemButtons = document.querySelectorAll("img[alt='delete icon image']");
const mobileRemoveItemButton = removeItemButtons[0];
const desktopRemoveItemButton = removeItemButtons[1];
const EmptyCartMessage = document.querySelectorAll(".empty-cart");
const mobileEmptyCartMessage = EmptyCartMessage[0];
const desktopEmptyCartMessage = EmptyCartMessage[1];
const cartTotalValue = document.querySelectorAll(".cart-total");
const mobileCartTotalValue = cartTotalValue[0];
const desktopCartTotalValue = cartTotalValue[1];
const cartItemCount = document.querySelectorAll(".item-count-text");
const mobileCartItemCount = cartItemCount[0];
const desktopCartItemCount = cartItemCount[1];
const checkoutButtons = document.querySelectorAll(".checkout-button");
const mobileCheckoutButton = checkoutButtons[0];
const desktopCheckoutButton = checkoutButtons[1];
const minusButton = document.querySelector("img[alt='minus icon image']");
const plusButton = document.querySelector("img[alt='plus icon image']");
const orderCountNumber = document.getElementById("item-count");
const mobileImageContainer = document.querySelector(".mobile-background-image-container");
const mobilePreviousButton = document.querySelector("img[alt='previous icon image']");
const mobileNextButton = document.querySelector("img[alt='next icon image']");
const desktopImageContainer = document.querySelector(".desktop-background-image-container");
const productsThumbnailArray = Array.from(document.querySelectorAll(".desktop-products-container > img"));
// LIGHTBOX ELEMENTS.
const desktopOverlay = document.querySelector(".desktop-overlay");
const lightboxContainer = document.querySelector(".lightbox-container");
const closeLightboxButton = document.querySelector(".close-icon-container > img");
const lightboxImageContainer = document.querySelector(".lightbox-background-image-container");
const lightboxThumbnailArray = Array.from(document.querySelectorAll(".lightbox-products-container > img"));
const lightboxNextButton = document.querySelector(".lightbox-background-image-container > img[alt='next icon image']");
const lightboxPreviousButton = document.querySelector(
    ".lightbox-background-image-container > img[alt='previous icon image']"
);

let orderCount = parseInt(orderCountNumber.textContent);
let itemAdded = false;
let productThumbnailIsSelected = false;
let lightboxThumbnailIsSelected = false;
let cartCount = 0;
let photoPickerIndex = 0;

// This array-object holds the source images used by the "photoPicker" and "imageSwitcher" functions.
const photosArray = [
    "images/image-product-1.jpg",
    "images/image-product-2.jpg",
    "images/image-product-3.jpg",
    "images/image-product-4.jpg"
];

// This function uses the arrow buttons to switch the large product image on both the mobile display and desktop (i.e lightbox gallery).
const photoPicker = (button, display) => {
    if (display == "mobile") {
        if (button == "next") {
            photoPickerIndex++;
            if (photoPickerIndex > photosArray.length - 1) photoPickerIndex = 0;
            mobileImageContainer.style.backgroundImage = `url(${photosArray[photoPickerIndex]})`;
        } else if (button == "previous") {
            photoPickerIndex--;
            if (photoPickerIndex < 0) photoPickerIndex = photosArray.length - 1;
            mobileImageContainer.style.backgroundImage = `url(${photosArray[photoPickerIndex]})`;
        }
    } else if (display == "desktop") {
        if (button == "next") {
            photoPickerIndex++;
            if (photoPickerIndex > photosArray.length - 1) photoPickerIndex = 0;
            lightboxImageContainer.style.backgroundImage = `url(${photosArray[photoPickerIndex]})`;
        } else if (button == "previous") {
            photoPickerIndex--;
            if (photoPickerIndex < 0) photoPickerIndex = photosArray.length - 1;
            lightboxImageContainer.style.backgroundImage = `url(${photosArray[photoPickerIndex]})`;
        }
    }
};

// This function switches the large product image on both the desktop layout and lightbox gallery.
const imageSwitcher = (e, container, thumbnailArray, index) => {
    // if a product thumbnail in the desktop layout has already been selected, reset its styling.
    if (thumbnailArray == "products-thumbnail" && productThumbnailIsSelected) {
        resetProductThumbnail();
        // if a product thumbnail in the lightbox gallery has already been selected, reset its styling.
    } else if (thumbnailArray == "lightbox-thumbnail" && lightboxThumbnailIsSelected) {
        resetLightboxThumbnail();
    }
    // mark the appropriate thumbnail as selected.
    if (thumbnailArray == "products-thumbnail") {
        productThumbnailIsSelected = true;
    } else {
        lightboxThumbnailIsSelected = true;
    }
    // style the currently selected thumbnail.
    styleThumbnail(e);
    // update the appropriate image container depending on the thumbnail.
    if (container == "desktop-image-container") {
        desktopImageContainer.style.backgroundImage = `url(${photosArray[index]})`;
    } else {
        lightboxImageContainer.style.backgroundImage = `url(${photosArray[index]})`;
    }
    // set the "photoPickerIndex" index to that of the currently selected thumbnail.
    photoPickerIndex = index;
};

// This function sets the styling of the selected thumbnail.
const styleThumbnail = (e) => {
    e.currentTarget.style.outline = "2px solid hsl(26, 100%, 55%)";
    e.currentTarget.style.opacity = 0.5;
};

// This function resets the styling of the selected product thumbnail in the main desktop web page.
const resetProductThumbnail = () => {
    const thumbnail = productsThumbnailArray.find(
        (productThumbnail) => productThumbnail.style.outline == "rgb(255, 125, 26) solid 2px"
    );
    thumbnail.style.outline = "";
    thumbnail.style.opacity = 1;
    productThumbnailIsSelected = false;
};

// This function resets the styling of the selected product thumbnail in the lightbox gallery.
const resetLightboxThumbnail = () => {
    const thumbnail = lightboxThumbnailArray.find((lightboxThumbnail) => {
        return lightboxThumbnail.style.outline == "rgb(255, 125, 26) solid 2px";
    });
    thumbnail.style.outline = "";
    thumbnail.style.opacity = 1;
    lightboxThumbnailIsSelected = false;
};

// This functions shows the lightbox gallery.
const showLightbox = () => {
    desktopOverlay.style.display = "block";
    lightboxContainer.style.display = "block";
    lightboxImageContainer.style.backgroundImage = desktopImageContainer.style.backgroundImage;
    if (productThumbnailIsSelected) resetProductThumbnail();
};

// This functions hides the lightbox gallery.
const hideLightbox = () => {
    desktopOverlay.style.display = "none";
    lightboxContainer.style.display = "none";
    desktopImageContainer.style.backgroundImage = lightboxImageContainer.style.backgroundImage;
    if (lightboxThumbnailIsSelected) resetLightboxThumbnail();
};

// This function changes the color of the lightbox close button based on the position of the mouse.
const HoverLightboxClose = (e) => {
    if (e.type == "mouseover") e.currentTarget.src = "images/icon-close-lightbox-hover.svg";
    if (e.type == "mouseout") e.currentTarget.src = "images/icon-close-lightbox.svg";
};

// This function changes the color of the lightbox next-arrow button based on the position of the mouse.
const HoverLightboxNext = (e) => {
    if (e.type == "mouseover") e.currentTarget.src = "images/icon-next-hover.svg";
    if (e.type == "mouseout") e.currentTarget.src = "images/icon-next.svg";
};

// This function changes the color of the lightbox prevoius-arrow button based on the position of the mouse.
const HoverLightboxPrevious = (e) => {
    if (e.type == "mouseover") e.currentTarget.src = "images/icon-previous-hover.svg";
    if (e.type == "mouseout") e.currentTarget.src = "images/icon-previous.svg";
};

// This functions opens the mobile navigation menu.
const openMobileNavigation = () => {
    mobileOverlay.style.display = "block";
    mobileNavigation.style.display = "flex";
};

// This functions closes the mobile navigation menu.
const closeMobileNavigation = () => {
    mobileOverlay.style.display = "none";
    mobileNavigation.style.display = "none";
};

// This functions decrements the item count for a particular order.
const decreaseItemCount = () => {
    if (orderCount == 0) return;
    orderCount--;
    orderCountNumber.textContent = orderCount;
};

// This functions increments the item count for a particular order.
const increaseItemCount = () => {
    orderCount++;
    orderCountNumber.textContent = orderCount;
};

// This functions calculates the total cost of a particular order.
const calculateCost = (itemCount) => 125 * cartCount;

// This function hides the cart.
const hideCart = (device) => {
    device === "mobile" ? (mobileCart.style.display = "none") : (desktopCart.style.display = "none");
};

// This function shows cart.
const showCart = (display) => {
    if (display === "mobile") {
        if (itemAdded && cartCount) {
            const cost = calculateCost(cartCount);
            mobileCartItemCount.textContent = cartCount;
            mobileCartTotalValue.textContent = `$${cost}.00`;
            if (mobileCartItemInfo.style.display == "none") {
                mobileCartItemInfo.style.display = "flex";
                mobileCheckoutButton.style.display = "block";
                mobileEmptyCartMessage.style.display = "none";
            }
        } else {
            mobileCartItemInfo.style.display = "none";
            mobileCheckoutButton.style.display = "none";
            mobileEmptyCartMessage.style.display = "block";
        }
        mobileCart.style.display = "block";
    } else if (display === "desktop") {
        if (itemAdded && cartCount) {
            const cost = calculateCost(cartCount);
            desktopCartItemCount.textContent = cartCount;
            desktopCartTotalValue.textContent = `$${cost}.00`;
            if (desktopCartItemInfo.style.display == "none") {
                desktopCartItemInfo.style.display = "flex";
                desktopCheckoutButton.style.display = "block";
                desktopEmptyCartMessage.style.display = "none";
            }
        } else {
            desktopCartItemInfo.style.display = "none";
            desktopCheckoutButton.style.display = "none";
            desktopEmptyCartMessage.style.display = "block";
        }
        desktopCart.style.display = "block";
    }
};

// This function toggles the cart.
const toggleCart = () => {
    if (window.innerWidth < 960) {
        if (mobileCart.style.display == "block") {
            hideCart("mobile");
        } else {
            showCart("mobile");
        }
    } else {
        if (desktopCart.style.display == "block") {
            hideCart("desktop");
        } else {
            showCart("desktop");
        }
    }
};

// This function adds the product to the cart.
const addToCart = () => {
    // add to cart on a mobile device.
    if (window.innerWidth < 960) {
        if (orderCount) {
            itemAdded = true;
            cartCount = orderCount;
            mobileCartNotification.style.display = "block";
            mobileCartNotification.textContent = orderCount;
        }
    } else {
        // add to cart on a desktop device.
        if (orderCount) {
            itemAdded = true;
            cartCount = orderCount;
            desktopCartNotification.style.display = "block";
            desktopCartNotification.textContent = orderCount;
        }
    }
};

// This function removes the product from the cart.
const removeFromCart = () => {
    itemAdded = false;
    cartCount = 0;
    // remove from cart on a mobile device.
    if (window.innerWidth < 960) {
        mobileCartNotification.style.display = "none";
        mobileCartNotification.textContent = "";
        mobileCartItemInfo.style.display = "none";
        mobileCheckoutButton.style.display = "none";
        mobileEmptyCartMessage.style.display = "block";
    } else {
        // remove from cart on a desktop device.
        desktopCartNotification.style.display = "none";
        desktopCartNotification.textContent = "";
        desktopCartItemInfo.style.display = "none";
        desktopCheckoutButton.style.display = "none";
        desktopEmptyCartMessage.style.display = "block";
    }
};

/* Event Listeners */

mobileOpenMenuButton.addEventListener("click", openMobileNavigation);

mobileCloseMenuButton.addEventListener("click", closeMobileNavigation);

minusButton.addEventListener("click", decreaseItemCount);

plusButton.addEventListener("click", increaseItemCount);

mobileCartButton.addEventListener("click", toggleCart);

desktopCartButton.addEventListener("click", toggleCart);

CartAddButton.addEventListener("click", addToCart);

mobileRemoveItemButton.addEventListener("click", removeFromCart);

desktopRemoveItemButton.addEventListener("click", removeFromCart);

mobilePreviousButton.addEventListener("click", () => photoPicker("previous", "mobile"));

mobileNextButton.addEventListener("click", () => photoPicker("next", "mobile"));

lightboxNextButton.addEventListener("click", () => photoPicker("next", "desktop"));

lightboxNextButton.addEventListener("mouseover", HoverLightboxNext);

lightboxNextButton.addEventListener("mouseout", HoverLightboxNext);

lightboxPreviousButton.addEventListener("click", () => photoPicker("previous", "desktop"));

lightboxPreviousButton.addEventListener("mouseover", HoverLightboxPrevious);

lightboxPreviousButton.addEventListener("mouseout", HoverLightboxPrevious);

productsThumbnailArray.forEach((thumbnail, index) =>
    thumbnail.addEventListener("click", (e) => imageSwitcher(e, "desktop-image-container", "products-thumbnail", index))
);

desktopImageContainer.addEventListener("click", showLightbox);

closeLightboxButton.addEventListener("click", hideLightbox);

closeLightboxButton.addEventListener("mouseover", HoverLightboxClose);

closeLightboxButton.addEventListener("mouseout", HoverLightboxClose);

lightboxThumbnailArray.forEach((thumbnail, index) =>
    thumbnail.addEventListener("click", (e) => imageSwitcher(e, "lighbox-image-container", "lightbox-thumbnail", index))
);
