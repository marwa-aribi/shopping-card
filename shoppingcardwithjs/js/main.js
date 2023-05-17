const cartIcon = document.querySelector("#iconcart");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

cartClose.addEventListener("click", () => {
  cart.classList.remove("active");
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

function start() {
  addEvent();
}

function update() {
  addEvent();
  updateTotal();
}

function addEvent() {
  // Supprimer des articles du panier
  let cartRemoveBtns = document.querySelectorAll(".remove-cart");
  cartRemoveBtns.forEach((btn) => {
    btn.addEventListener("click", handleRemoveCartItems);
  });

  // Changer la quantité des articles
  let cartQuantityInputs = document.querySelectorAll(".cart-quantity");
  cartQuantityInputs.forEach((input) => {
    input.addEventListener("change", handleQuantityChange);
  });

  // Ajouter des articles au panier
  let add_CartBtns = document.querySelectorAll(".addcart");
  add_CartBtns.forEach((btns) => {
    btns.addEventListener("click", handle_AddCartItems);
  });
   // order buy bt  
   const BuyBtn = document.querySelector(".btn-buy");
   BuyBtn.addEventListener("click", handleBuyOrder);
   ;
}
function  handleBuyOrder (){
    if(itemsAdedd.length <= 0) {
        alert("there is no order in the cart");
        return;
    }
    const cartcontent = cart.querySelector(".cart-content");
    cartcontent.innerHTML='';
    alert("your order is placed succesflly");
    itemsAdedd = [] ;
    update();

}
let itemsAdedd = [] ;

function handle_AddCartItems() {
    
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".prodcut-img").src;
    console.log(title , price , imgSrc);
  let newToAdd = {
    title,
    price,
    imgSrc,
  };
   // Check if the item already exists in the cart
   if (itemsAdedd.find((el) => el.title === newToAdd.title)) {
    alert("Item already exists in the cart.");
    return;
  } else {
    itemsAdedd.push(newToAdd);
  }
  // Ajouter le produit au panier
  let cartBoxElement = cartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);
  update();

}


function handleQuantityChange() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value);
  update();
}

function handleRemoveCartItems() {
  this.parentElement.remove();
  itemsAdedd = itemsAdedd.filter(
    (el)=>
    el.title!==
    this.parentElement.querySelector(".cart-product-title").innerHTML
  );
  update();
}

function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;

  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-product-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });

  // Conserver deux chiffres après la virgule
  total = total.toFixed(2);

  totalElement.innerHTML = "$" + total;
}

// Composant HTML du cart
function cartBoxComponent(title, price, imgSrc) {
  return `
  <div class="cart-box">
  <img src="${imgSrc}" class="cart-img">
  <div class="box-details">
  <h2 class="cart-product-title">${title}</h2>
  <span class="cart-product-price">${price}</span>
  <input type="number" value="1" class="cart-quantity">
    </div>
    <i class='bx bxs-trash-alt remove-cart'></i>
    </div>
  `;
}
