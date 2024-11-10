document.addEventListener('DOMContentLoaded' , ()=>{
    const cartIcon = document.getElementById('cartIcon');
    const cartPopup = document.getElementById('cartPopup');
    const closeCart = document.getElementById('closeCart');
    const clearCart = document.getElementById('clearCart');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const totalElement = document.getElementById('total');

    let cart=[];

    function updateCart(){
        cartItems.innerHTML='';
        let total = 0;

        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cartItem';

            itemDiv.innerHTML = `
                <div class="cart_item">
                <span>${item.name}</span>
                <span>Rs.${item.price}</span>
                <input type="number" class="quantity" value="${item.quantity}" min="1" data-index="${index}" />
                <button class="remove_item" data-index="${index}">Remove</button>
                </div>
            `;

            cartItems.appendChild(itemDiv);
            total += item.price * item.quantity;
        })
        cartCount.textContent = cart.length;
        totalElement.innerHTML=`Rs.${total}`;
    }

    function toggleCartPopup(){
        cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
    }

    cartIcon.addEventListener('click' , toggleCartPopup);
    closeCart.addEventListener('click' , toggleCartPopup);

    document.body.addEventListener('click' , (e)=>{
        if (e.target.classList.contains('add_to_cart')){
            const name = e.target.getAttribute('product_name');
            const price = parseInt(e.target.getAttribute('product_price').replace('Rs. ', ''));
            const existingItem = cart.find(item => item.name === name);

            if(existingItem){
                existingItem.quantity += 1;
            }
            else{
                cart.push({name , price , quantity:1})
            }
            updateCart();
        }
        if(e.target.classList.contains('remove_item')){
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart();
        }
        if(e.target.classList.contains('quantity')){
            const index = e.target.getAttribute('data-index');
            cart[index].quantity = parseInt(e.target.value);
            updateCart();
        }
    })
    clearCart.addEventListener('click' , ()=>{
        cart = [];
        updateCart();
    });
});
