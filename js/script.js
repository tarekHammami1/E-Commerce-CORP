//function compare to check if two strings are identical
function compare(ch, ch1) {
    return ch == ch1;
}
//function verifLength to verify if the string length is equal or superior to a given param
function verifLength(ch, nbr) {
    return ch.length >= nbr;
}
//function verifEmail to check email format
function verifEmail(email) {
    const regExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
}
//function emailExists to check if the user email exists already
function emailExists(email) {
    // get all users from LS
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    // users = [{email}, {email}, {email}]
    var userExists = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            userExists = true;
            break;
        }
    }
    return userExists;
}
//Customersignup function to add user into local storage : users with role : user
function customerSignup() {

    //Get inputs values
    var firstName = document.getElementById("fName").value;
    var lastName = document.getElementById("lName").value;
    var email = document.getElementById("email").value;
    var pwd = document.getElementById("pwd").value;
    var confirmPwd = document.getElementById("confirmPwd").value;
    var tel = document.getElementById("tel").value;
    //Email format
    var isEmailValid = verifEmail(email);
    if (isEmailValid == true) {
        document.getElementById("emailErrorMsg").innerHTML = "";
    } else {
        document.getElementById("emailErrorMsg").innerHTML =
            "Email should be in email format";
        document.getElementById("emailErrorMsg").style.color = "red";
    }
    //Email uniqueness
    var isEmailUnique = emailExists(email);
    if (isEmailUnique == false) {
        document.getElementById("duplicatedEmailErrorMsg").innerHTML = "";
    } else {
        document.getElementById("duplicatedEmailErrorMsg").innerHTML =
            "The email you entered is already used.";
        document.getElementById("duplicatedEmailErrorMsg").style.color =
            "red";
    }
    //Password
    var isPwdValid = verifLength(pwd, 8);
    if (isPwdValid == true) {
        document.getElementById("pwdErrorMsg").innerHTML = "";
    } else {
        document.getElementById("pwdErrorMsg").innerHTML =
            "Password must have at least 8 characters";
        document.getElementById("pwdErrorMsg").style.color = "red";
    }
    //Password match
    var isConfirmPwdMatch = compare(pwd, confirmPwd);
    if (isConfirmPwdMatch == true) {
        document.getElementById("pwdMatchErrorMsg").innerHTML = "";
    } else {
        document.getElementById("pwdMatchErrorMsg").innerHTML =
            "The password does not match with the one you entered previously";
        document.getElementById("pwdMatchErrorMsg").style.color = "red";
    }
    var userId = JSON.parse(localStorage.getItem("userIdKey") || "1");

    //create user object:
    if (
        isPwdValid &&
        isEmailValid &&
        isConfirmPwdMatch &&
        !isEmailUnique
    ) {
        var user = {
            id: userId,
            fName: firstName,
            lName: lastName,
            email: email,
            pwd: pwd,
            confirmPwd: confirmPwd,
            tel: tel,
            role: "user",
        };

        //Get all users from LS by key = users
        var usersTab = getObjectsFromLS("users");
        //Insert user object into usersTab array
        usersTab.push(user);
        //set usersTab into LS
        localStorage.setItem("users", JSON.stringify(usersTab));
        localStorage.setItem("userIdKey", userId + 1);
    }
};
// login function by email and password
function login() {
    var email = document.getElementById("loginEmail").value;
    var pwd = document.getElementById("loginPwd").value;
    var foundUser = searchUser(email, pwd);
    // user is correct
    if (foundUser) {
        if (foundUser.role === "admin") {
            //save admin id into LS
            localStorage.setItem("connectedUserId", foundUser.id);
            // Go To index.html
            location.replace("index.html");
        } else {
            //save user id into LS
            localStorage.setItem("connectedUserId", foundUser.id);
            // Go To index.html
            location.replace("shop.html");
        }
    } else {
        document.getElementById("loginMsgError").innerHTML =
            "Please check your Email/Password";
        document.getElementById("loginMsgError").style.color = "red";
    }
}
//search user by email and password from users (got from Local Storage)
function searchUser(emailParam, pwdParam) {
    var users = getObjectsFromLS("users");
    var foundUser;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == emailParam && users[i].pwd == pwdParam) {
            foundUser = users[i];
            break;
        }
    }
    return foundUser;
}
//adminsignup function that adds admin into local storage : users with role : admin
function adminSignup() {
    //insert user into LS : users
    //Get inputs values
    var firstName = document.getElementById("adminFirstName").value;
    var lastName = document.getElementById("adminLastName").value;
    var email = document.getElementById("adminEmail").value;
    var pwd = document.getElementById("adminPwd").value;
    var confirmPwd = document.getElementById("adminConfirmPwd").value;
    var tel = document.getElementById("adminTel").value;
    var fax = document.getElementById("fax").value;
    var address = document.getElementById("adminAdress").value;
    var companyId = document.getElementById("companyId").value;
    var companyName = document.getElementById("companyName").value;
    //Email format
    var isEmailValid = verifEmail(email);
    if (isEmailValid == true) {
        document.getElementById("emailErrorMsg").innerHTML = "";
    } else {
        document.getElementById("emailErrorMsg").innerHTML =
            "Email should be in email format";
        document.getElementById("emailErrorMsg").style.color = "red";
    }
    //Email uniqueness
    var isEmailUnique = emailExists(email);
    if (isEmailUnique == false) {
        document.getElementById("duplicatedEmailErrorMsg").innerHTML = "";
    } else {
        document.getElementById("duplicatedEmailErrorMsg").innerHTML =
            "The email you entered is already used.";
        document.getElementById("duplicatedEmailErrorMsg").style.color =
            "red";
    }
    //Password
    var isPwdValid = verifLength(pwd, 8);
    if (isPwdValid == true) {
        document.getElementById("pwdErrorMsg").innerHTML = "";
    } else {
        document.getElementById("pwdErrorMsg").innerHTML =
            "Password must have at least 8 characters";
        document.getElementById("pwdErrorMsg").style.color = "red";
    }
    //Password match
    var isConfirmPwdMatch = compare(pwd, confirmPwd);
    if (isConfirmPwdMatch == true) {
        document.getElementById("pwdMatchErrorMsg").innerHTML = "";
    } else {
        document.getElementById("pwdMatchErrorMsg").innerHTML =
            "The password does not match with the one you entered previously";
        document.getElementById("pwdMatchErrorMsg").style.color = "red";
    }

    var userId = JSON.parse(localStorage.getItem("userIdKey") || "1");

    //create Admin object:
    if (
        isPwdValid &&
        isEmailValid &&
        isConfirmPwdMatch &&
        !isEmailUnique
    ) {
        var user = {
            id: userId,
            fName: firstName,
            lName: lastName,
            email: email,
            pwd: pwd,
            confirmPwd: confirmPwd,
            tel: tel,
            fax: fax,
            address: address,
            companyId: companyId,
            companyName: companyName,
            role: "admin",
        };

        //Get all users from LS by key = users
        var usersTab = getObjectsFromLS("users");
        //Insert user object into usersTab array
        usersTab.push(user);
        //set usersTab into LS
        localStorage.setItem("users", JSON.stringify(usersTab));
        localStorage.setItem("userIdKey", userId + 1);
    }
};
//addCategory function that allows to save category into Local Storage : categories
function addCategory() {
    var name = document.getElementById("categoryName").value;
    var connectedUserId = getConnectedUser();
    var categoryId = JSON.parse(localStorage.getItem("categoryIdKey") || "1");
    var category = {
        id: categoryId,
        name: name,
        userId: connectedUserId,
    };
    var categories = getObjectsFromLS("categories");
    categories.push(category);
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("categoryIdKey", categoryId + 1);
}
//addProduct function that allows to save products into Local Storage : products
function addProduct() {
    var name = document.getElementById("productName").value;
    var price = document.getElementById("productPrice").value;
    var stock = document.getElementById("productStock").value;
    var category = document.getElementById("productCategory").value;
    var connectedUserId = getConnectedUser();

    var productId = JSON.parse(localStorage.getItem("productIdKey") || "1");
    var product = {
        id: productId,
        name: name,
        price: price,
        stock: stock,
        category: category,
        userId: connectedUserId,
        isConfirmed: false,
    };
    var productsTab = getObjectsFromLS("products");
    productsTab.push(product);
    localStorage.setItem("products", JSON.stringify(productsTab));
    localStorage.setItem("productIdKey", productId + 1);
}
//generate categories option
function generateOptions() {
    var categories = getObjectsFromLS("categories");
    var connectedUserId = getConnectedUser();
    var categoriesSelect = "";
    for (var i = 0; i < categories.length; i++) {
        if (connectedUserId == categories[i].userId) {
            categoriesSelect =
                categoriesSelect +
                `
            <option value="${categories[i].name}">${categories[i].name}</option>`;
        }
    }
    document.getElementById("productCategory").innerHTML = categoriesSelect;
}
//function getObjectsFromLS that returns all objects from LS by params : key
function getObjectsFromLS(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
}
//function getConnectedUser that returns connected users Id from LS
function getConnectedUser() {
    return localStorage.getItem("connectedUserId");
}
//displayUserProducts  function that allows to display all connected user products
function displayUserProducts() {
    var products = getObjectsFromLS("products");
    var connectedUserId = getConnectedUser();
    var myProducts = getUserProducts(connectedUserId, products);
    var productsDiv = ``;
    for (var i = 0; i < myProducts.length; i++) {
        productsDiv =
            productsDiv +
            `
        <div class="col-lg-3 col-md-6">
          <div class="single-product">
            <img class="img-fluid" src="img/product/p1.jpg" alt="" />
            <div class="product-details">
              <h6>${myProducts[i].name}</h6>
              <div class="price">
                <h6>$${myProducts[i].price}</h6>
                <h6 class="l-through">$${myProducts[i].price}</h6>
              </div>
              <h6>${myProducts[i].category}</h6>
              <h6>${myProducts[i].stock}</h6>

              <div class="prd-bottom">
                <div href="" class="social-info">
                  <span class="ti-bag"></span>
                  <button class="btn hover-text" style="background-color:#fff; padding-left:0px" onclick="goToDisplay(${myProducts[i].id})">Display </button>
                </div>
                <div href="" class="social-info">
                <span class="ti-bag"></span>
                <button class="btn hover-text" style="background-color:#fff; padding-left:0px" onclick="deleteObject(${getObjectPositionById(myProducts[i].id, products)},'products')">Delete </button>
              </div>
          
              </div>
            </div>
          </div>
        </div>`;
        document.getElementById("products").innerHTML = productsDiv;
    }
}
//function that returns user products by id (2params: connectedUserID & products array)
function getUserProducts(userId, productsTab) {
    var myProducts = [];
    for (let i = 0; i < productsTab.length; i++) {
        if (userId == productsTab[i].userId && productsTab[i].isConfirmed == true) {
            myProducts.push(productsTab[i]);
        }
    }
    return myProducts;
}
//function goToDisplay product that changes location and saves id into LS
function goToDisplay(idProduct) {
    localStorage.setItem("selectedProductId", idProduct);
    location.replace("single-product.html");
}
//function searchProductById that returns object (product) from LS
function searchProductById(id) {
    var products = getObjectsFromLS("products");
    var foundProduct;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            foundProduct = products[i];
            break;
        }
    }
    return foundProduct;
}
//function displayEditForm that diplays edit form after clicking on edit btn
function displayEditForm() {
    var idProduct = localStorage.getItem("selectedProductId");
    var foundProduct = searchProductById(idProduct);
    var editForm = ` 
    <div class="row">
      <div class="col-lg-12">
        <div class="login_form_inner">
          <h3>Edit Product</h3>
          <div class="row login_form">
            <div class="col-md-12 form-group">
            <label for="">Price</label>
              <input type="text" class="form-control" id="newPriceId" value=${foundProduct.price} />
            </div>
            <div class="col-md-12 form-group">
            <label for="">Stock</label>
            <input type="text" class="form-control" id="newStockId" value=${foundProduct.stock} />
            </div>
            <div class="col-md-12 form-group">
              <button type="submit" value="submit" class="primary-btn" onclick="validateEdit()"> Validate Edit </button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    document.getElementById("editFormDiv").innerHTML = editForm;
}
//function validateEdit :update product price and stock
function validateEdit() {
    var newPrice = document.getElementById("newPriceId").value;
    var newStock = document.getElementById("newStockId").value;
    var products = getObjectsFromLS("products");
    var selectedProductId = localStorage.getItem("selectedProductId");
    for (var i = 0; i < products.length; i++) {
        if (products[i].id == selectedProductId) {
            products[i].price = newPrice;
            products[i].stock = newStock;
            break;
        }
    }
    localStorage.setItem("products", JSON.stringify(products));
    location.replace("products.html");
}
//function deleteProduct
function deleteProduct(pos) {
    var products = getObjectsFromLS("products");
    products.splice(pos, 1);
    localStorage.setItem("products", JSON.stringify(products));
    location.reload();
}
//genericfunction deleteObject
function deleteObject(pos, key) {
    var objects = getObjectsFromLS(key);
    objects.splice(pos, 1);
    localStorage.setItem(key, JSON.stringify(objects));
    location.reload();
}
//function deleteOrderAndUpdateStock that allows to delete order by id and update product stock by id
function deleteOrderAndUpdateStock(pos, key, idProduct, qty) {
    var objects = getObjectsFromLS(key);
    objects.splice(pos, 1);
    localStorage.setItem(key, JSON.stringify(objects));
    //update product stock
    var products = getObjectsFromLS("products");
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == idProduct) {
            products[i].stock += Number(qty);
            break;
        }
    }
    localStorage.setItem("products", JSON.stringify(products));
    //reload page
    location.reload();
}
//function generateProductsTable that displays all products into table (from LS : products)
function generateProductsTable() {
    var products = getObjectsFromLS("products");
    var productTable = `
     <table class="table table-striped">
     <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Category</th>
        <th>Actions</th>
    </tr>`;
    for (let i = 0; i < products.length; i++) {
        productTable +=
            `
    <tr>
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].stock}</td>
        <td>${products[i].category}</td>
        <td>
        <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
        <button class="btn btn-success" onclick="confirmProduct(${products[i].id})">Confirm</button>
        </td>
    </tr>`;
    }
    productTable += `</table>`;
    document.getElementById("productTableId").innerHTML = productTable;
}
//function generateUsersTable that displays all users into table (from LS : users)
function generateUsersTable() {
    var users = getObjectsFromLS("users");
    var userTable = `
     <table class="table table-striped">
     <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Telephone</th>
        <th>Role</th>
        <th>Actions</th>
    </tr>`;
    for (let i = 0; i < users.length; i++) {
        userTable +=
            `
    <tr>
        <td>${users[i].fName}</td>
        <td>${users[i].lName}</td>
        <td>${users[i].email}</td>
        <td>${users[i].tel}</td>
        <td>${users[i].role}</td>
        <td>
        <button class="btn btn-danger">Delete</button>
        </td>
    </tr>`;
    }
    userTable += `</table>`;
    document.getElementById("userTableId").innerHTML = userTable;
}
//function confirmProduct that changes isConfirmed attribute to True
function confirmProduct(id) {
    var products = getObjectsFromLS("products");
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products[i].isConfirmed = true;
            break;
        }
    }
    localStorage.setItem("products", JSON.stringify(products));
}
//function that displays all confirmed products to simple users
function shopProducts() {
    var products = getObjectsFromLS("products");
    var confirmedProducts = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].isConfirmed == true) {
            confirmedProducts.push(products[i]);
        }
    }
    var productsDiv = ``;
    for (let i = 0; i < confirmedProducts.length; i++) {
        var product = confirmedProducts[i];
        productsDiv += `
        <div class="col-lg-4 col-md-6">
							<div class="single-product">
								<img class="img-fluid" src="img/product/p1.jpg" alt="">
								<div class="product-details">
									<h6>${product.name}</h6>
									<div class="price">
										<h6>$${product.price}</h6>
										<h6 class="l-through">$${product.price}</h6><br>
                                        <h6>${product.category}</h6>

									</div>
									<div class="prd-bottom">

										<div class="social-info">
											<span class="ti-bag"></span>
											<button class="btn hover-text" onclick ="goToDisplay(${product.id})" style="background-color : #fff" >Display</button>
										</div>
                                        <div class="social-info">
                                        <span class="lnr lnr-heart"></span>
                                        <button class="btn hover-text" onclick ="addToWishList(${product.id})" style="background-color : #fff" >Wishlist</button>
                                    </div>
										<a href="" class="social-info">
											<span class="lnr lnr-move"></span>
											<p class="hover-text">view more</p>
										</a>
									</div>
								</div>
							</div>
						</div>`
    }
    document.getElementById("productsDiv").innerHTML = productsDiv;
}
//function to get wishlist products by user Id
function userWishlist(wishlist, userIdParam) {
    var myWishlist = [];
    for (let i = 0; i < wishlist.length; i++) {
        if (wishlist[i].userId == userIdParam) {
            myWishlist.push(wishlist[i]);
        }
    }
    return myWishlist;
}
//function addToWishList : creates wishlist object and save it to LS (key : wishlist)
function addToWishList(id) {
    var connectedUserId = getConnectedUser();
    var wishListId = JSON.parse(localStorage.getItem('wishListIdKey') || '1');
    var wishListTab = getObjectsFromLS("wishList");
    var wishListObj = {
        id: wishListId,
        productId: id,
        userId: connectedUserId
    }
    wishListTab.push(wishListObj);
    localStorage.setItem("wishList", JSON.stringify(wishListTab));
    localStorage.setItem("wishListIdKey", wishListId + 1);
    location.replace("wishlist.html");
}
//function displayProductInfoByUserRole that displays product information by user role
function displayProductInfoByUserRole() {
    var connectedUserId = getConnectedUser();
    var productInfoBloc = ``;
    if (connectedUserId) {
        var foundUser = searchUserById(connectedUserId);
        if (foundUser.role == "admin") {
            productInfoBloc = `
            <div class="s_product_text">
                <h3 id="prName"></h3>
                <h2 id="prPrice"></h2>
                <ul class="list">
                    <li><div ><span style ="font-weight: bold; font-size : 15px">Category</span> : <span id="prCategory"  style="font-size :15px"></span></div></li> 
                    <li><div><span style ="font-weight: bold;font-size : 15px">Availability: </span><span style="font-size :15px">: In Stock</span></div></li>
                    <li> <div><span style ="font-weight: bold;font-size : 15px">Stock: </span><span id="prStock"  style="font-size :15px"></span></div></li>                  
                </ul>
                <button class="btn btn-warning" onclick="displayEditForm()">Edit Product</button>
            </div>
            <div id="editFormDiv"></div> `;
        }
        else {
            productInfoBloc = `
            <div class="s_product_text">
                <h3 id="prName"></h3>
                <h2 id="prPrice"></h2>
                <ul class="list">
                    <li><div ><span style ="font-weight: bold; font-size : 15px">Category</span> : <span id="prCategory" style="font-size :15px"></span></div></li>
                    <li><div><span style ="font-weight: bold;font-size : 15px">Availability: </span > <span style="font-size :15px">: In Stock</span></div></li>
                    <li> <div><span style ="font-weight: bold;font-size : 15px">Stock: </span><span id="prStock" style="font-size :15px"></span></div> </li>
                    <li><input type="number" class="form-control" id="reservedQty" placeholder="Insert quantity"></li>
                    <li><button class="btn btn-warning" onclick="reserve()" >Reserve Product</button></li>
                    <span id="qtyErrorMsg"></span>
                </ul>`;
        }
    }
    else {
        productInfoBloc = `            
            <div class="s_product_text">
            <h3 id="prName"></h3>
            <h2 id="prPrice"></h2>
            <ul class="list">
                <li><div ><span style ="font-weight: bold; font-size : 15px">Category</span> : <span id="prCategory" style="font-size :15px"></span></div></li>
                <li><div><span style ="font-weight: bold;font-size : 15px">Availability: </span > <span style="font-size :15px">: In Stock</span></div></li>
                <li> <div><span style ="font-weight: bold;font-size : 15px">Stock: </span><span id="prStock" style="font-size :15px"></span></div> </li>
                <button class="btn btn-warning" onclick="goToLogin()">Login</button> 
            </div>`;
    }

    document.getElementById("productInfo").innerHTML = productInfoBloc;
}
//function goTo Login page
function goToLogin() {
    location.replace("login.html");
}
//function that returns user object (param : id)
function searchUserById(id) {
    var users = getObjectsFromLS("users");
    var foundUser;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            foundUser = users[i];
            break;
        }
    }
    return foundUser;
}
//function reserve that creates order objects into LS ans updates product stock
function reserve() {
    var connectedUserId = getConnectedUser();
    var productId = localStorage.getItem("selectedProductId");
    var qty = document.getElementById("reservedQty").value;
    var product = searchProductById(productId);
    if (product.stock >= qty) {
        var orderId = JSON.parse(localStorage.getItem("orderIdKey") || "1");
        var orders = getObjectsFromLS("orders");
        //create order object
        var order = {
            id: orderId,
            qty: qty,
            userId: connectedUserId,
            productId: productId,
            status: false
        }
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.setItem("orderIdKey", orderId + 1);
        //update product stock
        updateProductStock(productId, qty);
        location.replace("basket.html");
    } else {
        document.getElementById("qtyErrorMsg").innerHTML = "Unavailable Quantity";
        document.getElementById("qtyErrorMsg").style.color = "red";
    }

}
//function updateProductStock that updates product stock by new quantity
function updateProductStock(id, qty) {
    var products = getObjectsFromLS("products");
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products[i].stock -= qty;
            break;
        }
    }
    localStorage.setItem("products", JSON.stringify(products));
}
//basket function that displays all user orders into Basket page
function basket() {
    var orders = getObjectsFromLS("orders");
    var connectedUserId = localStorage.getItem("connectedUserId");
    var myOrders = userOrders(orders, connectedUserId);
    if (myOrders.length == 0) {
        userBasket = `
            <div class="text-center"><h2>No reserved products</h2></div>
        `;
    }
    else {
        var userBasket = `
    <table class="table">
    <thead>
        <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
            <th scope="col">Actions</th>

        </tr>
    </thead>
    <tbody>`;
        var total = 0;
        for (let i = 0; i < myOrders.length; i++) {
            var order = myOrders[i];
            var product = searchProductById(order.productId)
            total += product.price * order.qty;
            userBasket += `
        <tr>
            <td>
                <div class="media">
                    <div class="d-flex">
                        <img src="img/cart.jpg" alt="">
                    </div>
                    <div class="media-body">
                        <p>${product.name}</p>
                    </div>
                </div>
            </td>
            <td>
                <h5>$${product.price}</h5>
            </td>
            <td>
                ${order.qty}
            </td>
            <td>
                <h5>$${product.price * order.qty}</h5>
            </td>`
            if (!(order.status)) {
                userBasket += ` <td><button class="btn btn-danger" onclick="deleteOrderAndUpdateStock(${getObjectPositionById(order.id, orders)},'orders',${product.id},${order.qty})">Delete</button></td></tr>`
            }
            else {
                userBasket += ` <td> Your Order is confirmed by Store.</td></tr>`

            }
        };
        userBasket += `
        <tr>
            <td>

            </td>
            <td>

            </td>
            <td>
                <h5>Subtotal</h5>
            </td>
            <td>
                <h5>$${total}</h5> 
            </td>
        </tr>
        <tr class="shipping_area">
            <td>

            </td>
            <td>

            </td>
            <td>
                <h5>Shipping</h5>
            </td>
            <td>
                        ${shippingFees(total)}    
            </td>
        </tr>
        <tr class="out_button_area">
            <td>

            </td>
            <td>

            </td>
            <td>

            </td>
            <td>
                <div class="checkout_btn_inner d-flex align-items-center">

                    <a class="primary-btn" href="#">Proceed to checkout</a>
                </div>
            </td>
        </tr>
    </tbody >
</table >`
            ;
    }
    document.getElementById("userBasket").innerHTML = userBasket;
}
//function that returns position of order into orders by ID
function getObjectPositionById(id, tab) {
    var pos;
    for (var i = 0; i < tab.length; i++) {
        if (tab[i].id == id) {
            pos = i;
            break;
        }
    }
    return pos;
}

//function userOrders that returns all user orders by Id
function userOrders(orders, userIdParam) {
    var myOrders = [];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].userId == userIdParam) {
            myOrders.push(orders[i]);
        }
    }
    return myOrders;
}
//function that specifies whether the shipping is free or costs $7 depending on the price
function shippingFees(price) {
    return (price >= 300) ? "Free" : "$7";
}
//function logout to remove connecterUserId item from LS
function logout() {
    localStorage.removeItem("connectedUserId");
    location.replace("index.html");
}
//function that displays user informations 
function userInformations() {
    var connectedUserId = localStorage.getItem("connectedUserId");
    var user = searchUserById(connectedUserId);
    var userInfo = `
    <div class="s_product_text">
        <h3>First Name : ${user.fName}</h3>
        <h3>Last Name : ${user.lName}</h3>
        <h3>Email : ${user.email}</h3>
        <h3>Telephone : ${user.tel}</h3>
        <button class="btn btn-warning" onclick="displayUserEditForm(${user.id})">Edit Profile</button>
    </div>
    <div id="editUserForm"></div> `;
    document.getElementById("userInfo").innerHTML = userInfo;
}
//function that displays user email & telephone Edit form
function displayUserEditForm(userId) {
    var user = searchUserById(userId);
    var editForm = ` 
    <div class="row">
      <div class="col-lg-12">
        <div class="login_form_inner">
          <h3>Edit Profile</h3>
          <div class="row login_form">
            <div class="col-md-12 form-group">
            <label for="">Email</label>
              <input type="text" class="form-control" id="newEmail" value=${user.email} />
            </div>
            <div class="col-md-12 form-group">
            <label for="">Telephone</label>
            <input type="text" class="form-control" id="newTel" value=${user.tel} />
            </div>
            <div class="col-md-12 form-group">
              <button type="submit" value="submit" class="primary-btn" onclick="validateUserEdit()"> Validate Edit </button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    document.getElementById("editUserForm").innerHTML = editForm;
}
//function validateUserEdit that updates user email and tel into LS
function validateUserEdit() {
    var newEmail = document.getElementById("newEmail").value;
    var newTel = document.getElementById("newTel").value;
    var users = getObjectsFromLS("users");
    var connectedUserId = localStorage.getItem("connectedUserId");
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == connectedUserId) {
            users[i].email = newEmail;
            users[i].tel = newTel;
            break;
        }
    }
    localStorage.setItem("users", JSON.stringify(users));
    location.replace("index.html");
}
//function to set the header 
function setHeader() {
    var connectedUserId = getConnectedUser();
    var headerContent = "";
    if (connectedUserId) {
        var connectedUser = searchUserById(connectedUserId);
        if (connectedUser.role == "admin") {
            headerContent = `
            <ul class="nav navbar-nav menu_nav ml-auto">
                <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
                <li class="nav-item submenu dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button"
                    aria-haspopup="true" aria-expanded="false">Products</a>
                    <ul class="dropdown-menu">
                        <li class="nav-item"><a class="nav-link" href="products.html">Products List</a></li>
                        <li class="nav-item"><a class="nav-link" href="add-product.html">Add Product</a></li>
                        <li class="nav-item"><a class="nav-link" href="add-category.html">Add Category</a></li>
                    </ul>
                </li>                
                <li class="nav-item "><a class="nav-link" href="manage-orders.html">Orders</a></li>
                <li class="nav-item "><a class="nav-link" href="profile.html">Welcome ${connectedUser.fName} ${connectedUser.lName} !</a></li>
                <li class="nav-item "><a class="nav-link" href="search.html">Search</a></li>
                <li class="nav-item "><a class="nav-link" onclick="logout()" href="#">Logout</a></li>
            </ul>`;
        }
        else {
            var orders = getObjectsFromLS("orders");
            var myOrders = userOrders(orders, connectedUserId);
            var wishListTab = getObjectsFromLS("wishList");
            var myWishList = userWishlist(wishListTab, connectedUserId)
            headerContent = `
            <ul class="nav navbar-nav menu_nav ml-auto">
                <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
                <li class="nav-item "><a class="nav-link" href="shop.html">Shop</a></li>
                <li class="nav-item "><a class="nav-link" href="basket.html">Basket(${myOrders.length})</a></li>
                <li class="nav-item "><a class="nav-link" href="wishlist.html">Wishlist(${myWishList.length})</a></li>
                <li class="nav-item "><a class="nav-link" href="profile.html">Welcome ${connectedUser.fName} ${connectedUser.lName} !</a></li>
                <li class="nav-item "><a class="nav-link" href="search.html">Search</a></li>
                <li class="nav-item "><a class="nav-link" onclick="logout()" href="#">Logout</a></li>
            </ul>`;
        }
    }
    else {
        headerContent = `
        <ul class="nav navbar-nav menu_nav ml-auto">
            <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
            <li class="nav-item "><a class="nav-link" href="shop.html">Shop</a></li>
            <li class="nav-item "><a class="nav-link" href="blog.html">Blog</a></li>
            <li class="nav-item "><a class="nav-link" href="contact.html">Contact</a></li>
            <li class="nav-item "><a class="nav-link" href="search.html">Search</a></li>
            <li class="nav-item "><a class="nav-link" href="login.html">Login</a></li>
            <li class="nav-item submenu dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button"
                aria-haspopup="true" aria-expanded="false">Signup</a>
                <ul class="dropdown-menu">
                    <li class="nav-item"><a class="nav-link" href="customer-signup.html">Customer</a>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="store-signup.html">Vendor</a>
                    </li>
                </ul>
             </li>
        </ul>`;

    }
    document.getElementById("navbarSupportedContent").innerHTML = headerContent;
}
//function that displays the User WishList
function displayUserWishList() {
    var connectedUserId = getConnectedUser();
    var wishListTab = getObjectsFromLS("wishList");
    var myWishList = [];
    var wishListTable = "";
    for (let i = 0; i < wishListTab.length; i++) {
        if (wishListTab[i].userId == connectedUserId) {
            myWishList.push(wishListTab[i]);
        }
    }
    if (myWishList.length == 0) {
        wishListTable = `
        <div class="text-center">
        <h2>No wishlist products</h2>
        </div>
        `
    }
    else {
        wishListTable = `
    <table class="table table-striped">
    <tr>
       <th>Product Name</th>
       <th>Product Price</th>
       <th>Category</th>
       <th>Actions</th>
   </tr>`
        for (let i = 0; i < myWishList.length; i++) {
            var wishList = myWishList[i];
            var product = searchProductById(wishList.productId);
            wishListTable += `
    <tr>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.category}</td>
        <td><button class="btn btn-success" onclick="goToDisplay(${product.id})">Reserve</button>
            <button class="btn btn-danger" onclick="deleteObject(${getObjectPositionById(wishList.id, wishListTab)},'wishList')">Delete</button></td>
    </tr>   
        `
        }
        wishListTable += "</table>";
    }
    document.getElementById("wishListTable").innerHTML = wishListTable;
}
//function to display admin orders
function displayAdminOrders() {
    var connectedUserId = getConnectedUser();
    var allProducts = getObjectsFromLS("products");
    var adminProducts = getUserProducts(connectedUserId, allProducts);
    var allOrders = getObjectsFromLS("orders");
    var adminOrders = getAdminOrders(adminProducts, allOrders);
    generateAdminOrdersTable(adminOrders);

}
//function getAdminOrders that returns all admin orders
function getAdminOrders(myProducts, orders) {
    var adminOrders = [];
    for (let i = 0; i < orders.length; i++) {
        for (var j = 0; j < myProducts.length; j++) {
            if (orders[i].productId == myProducts[j].id) {
                adminOrders.push(orders[i]);
            }
        }

    }
    console.log(adminOrders);
    return adminOrders;
}
//function generateAdminOrdersTable that generates order rows and inner Into HTML
function generateAdminOrdersTable(adminOrders) {
    var ordersTable = "";
    if (adminOrders.length == 0) {
        ordersTable = `
        <div class="text-center">
        <h2>No Orders</h2></div>
        `
    } else {
        ordersTable = `
        <div class="text-center">
        <h2>All Orders</h2></div>
    <table class="table table-striped">
    <tr>
       <th>First Name</th>
       <th>Last Name</th>
       <th>Telephone</th>
       <th>Product Name</th>
       <th>Quantity</th>
       <th>Product Unit Price</th>
       <th>Total HT</th>
       <th>Total TTC</th>
       <th>Actions</th>
   </tr>`;
        for (let i = 0; i < adminOrders.length; i++) {
            var order = adminOrders[i];
            var user = searchUserById(order.userId);
            var product = searchProductById(order.productId);
            ordersTable += `
    <tr>
       <td>${user.fName}</td>
       <td>${user.lName}</td>
       <td>${user.tel}</td>
       <td>${product.name}</td>
       <td>${order.qty}</td>
       <td>${product.price}</td>
       <td>${order.qty * product.price}</td>
       <td>${order.qty * product.price * 1.19}</td>`;
            if (order.status == false) {
                ordersTable +=
                    ` <td><button class="btn btn-info" onclick="confirmOrder(${order.id})">Confirm</button></td>
            </tr>`;
            }
            else {
                ordersTable +=
                    `<td>Order is Validated !</td>`
            }

        };
        ordersTable += "</table>";
    }
    document.getElementById("adminOrders").innerHTML = ordersTable;
}
//function confirm Order to update order status to true
function confirmOrder(id) {
    var orders = getObjectsFromLS("orders");
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id == id) {
            orders[i].status = true;
            break;
        }
    }
    localStorage.setItem("orders", JSON.stringify(orders));
    location.reload();
}
//function Search Products
function searchProducts() {
    var products = getObjectsFromLS("products");
    var productName = document.getElementById("searchedValue").value;
    var productsDiv = "";
    var counter = 0;
    for (let i = 0; i < products.length; i++) {
        if ((products[i].name).toLowerCase() == productName.toLowerCase() && products[i].isConfirmed) {
            counter++;
            productsDiv =
                productsDiv +
                `
                <div class="col-lg-3 col-md-6">
                    <div class="single-product">
                        <img class="img-fluid" src="img/product/p1.jpg" alt="" />
                        <div class="product-details">
                            <h6>${products[i].name}</h6>
                             <div class="price">
                            <h6>$${products[i].price}</h6>
                            <h6 class="l-through">$${products[i].price}</h6>
                            </div>
                            <h6>${products[i].category}</h6>
                            <h6>${products[i].stock}</h6>
                        </div>
                        <div class="prd-bottom">
                            <div href="" class="social-info">
                                <span class="ti-bag"></span>
                                <button class="btn hover-text" style="background-color:#fff; padding-left:0px" onclick="goToDisplay(${products[i].id})">Display </button>
                            </div>
                                             
                        </div>
                    </div>
                </div>`;
        }
    }
    if (counter == 0) {
        document.getElementById("foundProductsDiv").innerHTML = `
        
        <div class="text-center">
        <h1>No Products Found</h1>
        </div>`;

    } else {
        document.getElementById("foundProductsDiv").innerHTML = productsDiv;

    }
}