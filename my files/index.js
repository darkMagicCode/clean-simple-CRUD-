var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productcategoryInput = document.getElementById("productcategoryInput");
var productdescriptionInput = document.getElementById(
  "productdescriptionInput"
);
var imges = document.getElementById("imges");
var searchInput = document.getElementById("searchInput");
var prouductsContainer = [];
var currentIndex = 0;
var nameAlert = document.getElementById("nameAlert");
var selectAll = document.getElementById("selectAll");
var delBtnFinal = document.getElementById("delBtnFinal");

if (localStorage.getItem("products") != null) {
  prouductsContainer = JSON.parse(localStorage.getItem("products"));
  disPlayProduct();
}

addButton.addEventListener("click", function () {
  addProduct();
});

addbtn.addEventListener("click", function () {
  clearForm();
  var x = document.getElementById("updateButton");
  x.classList.add("d-none");

  var y = document.getElementById("addButton");
  y.classList.remove("d-none");
});

updateButton.addEventListener("click", function () {
  updateproduct();
});

function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productcategoryInput.value,
    descrption: productdescriptionInput.value,
    productimg: imges.value,
  };
  prouductsContainer.push(product);
  clearForm();
  disPlayProduct();
  localStorage.setItem("products", JSON.stringify(prouductsContainer));
  productNameInput.classList.remove("is-invalid");
  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-invalid");
  productPriceInput.classList.remove("is-valid");
}

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

function disPlayProduct() {
  var cartoona = ``;
  for (var i = 0; i < prouductsContainer.length; i++) {
    cartoona += `<tr>
            <td><input id="checkBox" type="checkbox" name="" value="">
            </td >
            <td>${prouductsContainer[i].name}</td >
            <td>${prouductsContainer[i].price}</td>
            <td>${prouductsContainer[i].category}</td>
            <td>${prouductsContainer[i].descrption}</td> 
            <td>
            <a data-bs-toggle="modal" data-bs-target="#exampleModala"  class=" text-danger mx-2 fs-5" href="" onclick="delproduct(${i});"><i data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="delete" class=" mx-1 fa-solid fa-trash-can "></i></a>
            <a class=" text-danger mx-2 fs-5"  href="" onclick="getInfo(${i});" data-bs-toggle="modal" data-bs-target="#exampleModal" ><i data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="edit" class="text-warning mx-1 fa-solid fa-pen" ></i></a>
            </td>   
            </tr> `;
  }

  document.getElementById("tableBody").innerHTML = cartoona;
  addButton.setAttribute("data-bs-dismiss", "modal");
}

function delproduct(a) {
  delBtnFinal.onclick = function () {
    {
      prouductsContainer.splice(a, 1);
      document
        .getElementById("exampleModala")
        .setAttribute("data-bs-dismiss", "modal");
     
    }
    disPlayProduct();
    localStorage.setItem("products", JSON.stringify(prouductsContainer));
  };
}

var checkBox = document.querySelectorAll("#checkBox");

delbtn.addEventListener("click", function () {
  document.getElementById("delBtnFinalb").onclick = function () {
    for (var i = 0; i < prouductsContainer.length; i++) {
      if (checkBox[i].checked == true) {
        prouductsContainer.splice(i, 1);
        delbtn.disabled = false;

      }
      document
        .getElementById("delBtnFinalb")
        .setAttribute("data-bs-dismiss", "modal");
    }
    disPlayProduct();
    localStorage.setItem("products", JSON.stringify(prouductsContainer));

    selectAll.checked = false;
  };
});


selectAll.addEventListener("click", function () {
  if (selectAll.checked == true) {
    delbtn.disabled = false;
  } else {
    delbtn.disabled = true;
  }

  for (var i = 0; i < prouductsContainer.length; i++) {
    if (checkBox[i].checked == false) {
      checkBox[i].checked = true;
      
    } else if (selectAll.checked == false) {
      checkBox[i].checked = false;
    }
  }
});

// checkBox.addEventListener("click", function () {
//   alert();
//   for (var i = 0; i < prouductsContainer.length; i++) {
//     if (checkBox[i].checked == false) {
//       delbtn.disabled = true;


//     } else if (checkBox[i].checked == true) {
//       delbtn.disabled = false;

//     }
//   }
// });

function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productcategoryInput.value = "";
  productdescriptionInput.value = "";
  imges.value = "";
}

searchInput.addEventListener("keyup", function () {
  var cartoona = ``;
  for (var i = 0; i < prouductsContainer.length; i++) {
    if (
      prouductsContainer[i].name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      cartoona += `<tr>
      <td><input id="checkBox" type="checkbox" name="" value="">
      </td >
        <td>${prouductsContainer[i].name}</td >
        <td>${prouductsContainer[i].price}</td>
        <td>${prouductsContainer[i].category}</td>
        <td>${prouductsContainer[i].descrption}</td> 
        <td>
            <a title="delete" class=" text-danger" href="" onclick="delproduct(${i});"><i class=" mx-1 fa-solid fa-trash-can "></i></a>
            <a title="update" href="" onclick="getInfo(${i});" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="text-warning mx-1 fa-solid fa-pen" ></i></a>
            </td>
        </tr> `;
    }
  }
  document.getElementById("tableBody").innerHTML = cartoona;
});

function getInfo(index) {
  var currentProuduct = prouductsContainer[index];
  productNameInput.value = currentProuduct.name;
  productPriceInput.value = currentProuduct.price;
  productcategoryInput.value = currentProuduct.category;
  productdescriptionInput.value = currentProuduct.descrption;
  currentIndex = index;

  var x = document.getElementById("updateButton");
  x.classList.remove("d-none");

  var y = document.getElementById("addButton");
  y.classList.add("d-none");
}

function updateproduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productcategoryInput.value,
    descrption: productdescriptionInput.value,
  };
  prouductsContainer[currentIndex] = product;
  disPlayProduct();
  localStorage.setItem("products", JSON.stringify(prouductsContainer));
  clearForm();
  productNameInput.classList.remove("is-invalid");
  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-invalid");
  productPriceInput.classList.remove("is-valid");
  var x = document.getElementById("updateButton");
  x.classList.add("d-none");
  var y = document.getElementById("addButton");
  y.classList.remove("d-none");
  updateButton.setAttribute("data-bs-dismiss", "modal");
}

function vaildInput(inputx, rejex, inputClass) {
  if (rejex.test(inputx.value)) {
    addButton.removeAttribute("disabled");
    inputx.classList.add("is-valid");
    inputx.classList.remove("is-invalid");
    inputClass.classList.add("d-none");
  } else {
    addButton.disabled = "true";
    inputx.classList.add("is-invalid");
    inputx.classList.remove("is-valid");
    inputClass.classList.remove("d-none");
  }
}

productNameInput.addEventListener("keydown", function () {
  var nameRejex = /^[A-Z][a-z]{2,8}$/;
  var nameAlert = document.getElementById("nameAlert");
  vaildInput(productNameInput, nameRejex, nameAlert);
});

productPriceInput.addEventListener("keydown", function () {
  var priceRejex = /^\d{2,8}$/;
  var priceAlert = document.getElementById("priceAlert");
  vaildInput(productPriceInput, priceRejex, priceAlert);
});

// var pageOne = document.getElementById('one');
// var pageTwo = document.getElementById('two');

// pageTwo.addEventListener('click' , function () {
//   var cartoonax = ``;
//   for (var i = 0; i < 5; i++) {

//       cartoonax += `<tr>
//       <td><input id="checkBox" type="checkbox" name="" value="">
//       </td >
//         <td>${prouductsContainer[i].name}</td >
//         <td>${prouductsContainer[i].price}</td>
//         <td>${prouductsContainer[i].category}</td>
//         <td>${prouductsContainer[i].descrption}</td>
//         <td>
//             <a data-bs-toggle="modal" data-bs-target="#exampleModala"  class=" text-danger mx-2 fs-5" href="" onclick="delproduct(${i});"><i data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="delete" class=" mx-1 fa-solid fa-trash-can "></i></a>
//             <a class=" text-danger mx-2 fs-5"  href="" onclick="getInfo(${i});" data-bs-toggle="modal" data-bs-target="#exampleModal" ><i data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="edit" class="text-warning mx-1 fa-solid fa-pen" ></i></a>
//             </td>
//         </tr> `;

//   }
//   document.getElementById("tableBody").innerHTML = cartoonax;
// })

// pageTwo.addEventListener('click' , function () {
//   cartoona();
// })

// var productDetails = Object.values(productDetails);
// var productDetails = JSON.stringify(productDetails);

// document.getElementById('productviewname').innerHTML = productDetails.name  ;
// document.getElementById('productviewprice').innerHTML = productDetails.price  ;
// document.getElementById('productviewcategory').innerHTML = productDetails.category  ;
// document.getElementById('productviewimg').innerHTML = productDetails.productimg  ;

// + "," + productDetails.price + "," + productDetails.category + "," + productDetails.descrption + "," + productDetails.productimg

// }

// function myFunction(a)
// {
//     console.log(typeof a);
//     return
// }
// myFunction(2);

// var x;
// console.log( typeof x)

// productNameInput.onkeyup = function () {
//   var nameRejex = /^[A-Z][a-z]{2,8}$/;
//   if (nameRejex.test(productNameInput.value)) {
//     addButton.removeAttribute("disabled");
//     productNameInput.classList.add("is-valid");
//     productNameInput.classList.remove("is-invalid");
//     nameAlert.classList.add("d-none");
//   } else {
//     addButton.disabled = "true";
//     productNameInput.classList.add("is-invalid");
//     productNameInput.classList.remove("is-valid");
//     nameAlert.classList.remove("d-none");
//   }
// };

// addButton.onclick = function () {
//   if (addButton.innerHTML == "add product") {
//     addProduct();
//   } else {
//     updateproduct();
//   }
// };

// productNameInput.onkeyup = function () {
//   var nameRejex = /^[A-Z][a-z]{2,8}$/;
//   var nameAlert = document.getElementById("nameAlert");
//   vaildInput(productNameInput, nameRejex,nameAlert);
// }

// productPriceInput.onkeyup = function () {
//   var priceRejex = /^[A-Z][a-z]{2,8}$/;
//   var priceAlert = document.getElementById("priceAlert");
//   vaildInput(productPriceInput, priceRejex,priceAlert);
// }
