// for navbar
const navarFixed = function () {
  window.addEventListener("scroll", function () {
    var navbar = document.querySelector("#navbar");
    if (window.scrollY > 0) {
      navbar.style.top = "0";
    } else {
        navbar.style.top = "0";
      }
  }); 
}
// ------------------------------------------------
// fetch
fetch("js/product.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const productCardsContainer = document.getElementById("product-cards");

    data.splice(6,10).forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const img = document.createElement("img");
      img.src = product.img;
      img.alt = product.title;

      const cardContent = document.createElement("div");
      cardContent.classList.add("card-content");

      const title = document.createElement("h2");
      title.classList.add("card-title");
      title.textContent = product.title;

      const price = document.createElement("p");
      price.classList.add("card-price");
      price.textContent = `$${product.price.toFixed(2)}`;

      const addToCartBtn = document.createElement("button");
      addToCartBtn.textContent = "+";

      const newBox = document.createElement("span");
      newBox.textContent = "New";
      newBox.style.position = "absolute";
      newBox.style.background = "rgb(90,90,210)";
      newBox.style.color = "white";
      newBox.style.padding = "3px 5px";
      newBox.style.borderRadius = "5px";
      newBox.style.right = "10px";
      newBox.style.top = "10px";

      addToCartBtn.addEventListener("click", function () {
        // add cart
        addToCart(product);
        addToCartBtn.classList.toggle("check");
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = "-";
      });

      cardContent.appendChild(title);
      cardContent.appendChild(price);
      cardContent.appendChild(addToCartBtn);
      cardContent.appendChild(newBox);

      card.appendChild(img);
      card.appendChild(cardContent);
      productCardsContainer.appendChild(card);
    });
  })
  .catch((error) => console.error("Error fetching products:", error));

  function addToCart(product) {
  // Cart save
  let cart = localStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  }
// -------------------------------------------------------------
 document.addEventListener("DOMContentLoaded", function () {
   const cartItems = document.getElementById("cart-items");
   const totalPrice = document.getElementById("total-price");
   let total = 0;

   let cart = localStorage.getItem("cart");
   cart = cart ? JSON.parse(cart) : [];

   cart.forEach((product, index) => {
    const cartImg = document.createElement("img");
    cartImg.src = product.img;
    cartImg.alt = product.title;
     const cartItem = document.createElement("li");
     const itemPrice = product.price.toFixed(2);
     cartItem.dataset.price = itemPrice;
     cartItem.dataset.originalPrice = product.price;

     const quantityInput = document.createElement("input");
     quantityInput.type = "number";
     quantityInput.value = 1;
     quantityInput.min = 1;
     quantityInput.addEventListener("input", function () {
       updateQuantity(cartItem, this.value);
      });
      
      const itemName = document.createElement("span");
      itemName.textContent = `${product.title} - $${itemPrice}`;

     const deleteBtn = document.createElement("button");
     deleteBtn.innerHTML = `<i class="bi bi-trash"></i>`;
     deleteBtn.addEventListener("click", function () {
       removeFromCart(cartItem, index);
     });

     const addCart = document.createElement("button");
     addCart.textContent = "Add To card";
     addCart.classList.add("addToCart");

     const status = document.createElement("span");
     status.textContent = "In Stock";
     status.classList.add("status");

     cartItem.appendChild(cartImg);
     cartItem.appendChild(itemName);
     cartItem.appendChild(status);
     cartItem.appendChild(quantityInput);
     cartItem.appendChild(deleteBtn);
     cartItem.appendChild(addCart);
     cartItems.appendChild(cartItem);

     total += parseFloat(itemPrice);
   });

   updateTotal();

   function updateQuantity(item, quantity) {
     const originalPrice = parseFloat(item.dataset.originalPrice);
     const newPrice = (originalPrice * quantity).toFixed(2);
     total -= parseFloat(item.dataset.price);
     total += parseFloat(newPrice);
     item.dataset.price = newPrice;
     item.querySelector("span").textContent = `${
       item.querySelector("span").textContent.split(" - ")[0]
     } - $${newPrice}`;
     updateTotal();
   }

   function removeFromCart(item, index) {
     total -= parseFloat(item.dataset.price);
     item.remove();
     cart.splice(index, 1);
     localStorage.setItem("cart", JSON.stringify(cart));
     updateTotal();
   }

   function updateTotal() {
     totalPrice.textContent = total.toFixed(2);
   }
 });

function addToCart(product) {
  let cart = localStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  
  let cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.length;
}
