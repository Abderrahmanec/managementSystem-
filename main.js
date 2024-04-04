
let price=document.getElementById("price");
let title=document.getElementById("title");
let taxes=document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let create = document.getElementById("submit");
let category = document.getElementById("category");
let mod="create"; let index;

function getTotal(){ 
if(price.value !=''){
let result =(+price.value + +taxes.value+ +ads.value)- +discount.value;
total.innerHTML = result;
total.style.backgroundColor ='#040';
}

else{
total.innerHTML = 0;
total.style.backgroundColor =' rgb(185, 33, 33)';
}}


let dataPro=[];
//if local  is non empty
 let dataProduct; 
    //to store data in local storage data is needed stringified	
if(localStorage.product != null){
  dataPro=JSON.parse(localStorage.product); 
}
else{
dataPro=[];
}


/* Create  data handling were I can save data?*/

create.onclick = function(){
    let newProduct = {
        price: price.value,
        title: title.value.toLowerCase(),
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }

    //to add new product to dataPro array
    if(title.value !=""){
    if (mod === "create") {
        if (newProduct.count > 1) {
          for (let i = 0; i < newProduct.count; i++) {
            dataPro.push(newProduct);
          }
        } else {
          dataPro.push(newProduct);
        }
      } else {
        dataPro[index] = newProduct;
        mod = "create";
        create.innerHTML="Create";
        count.style.display = 'none';
      }
      clearData();
    }
    
localStorage.setItem('product',JSON.stringify(dataPro));
    
    //clearing data in the input fields
   
    showData();
   }

   showData();

//clearing data
function clearData(){
    price.value='';
    title.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML=" ";
    count.value="";
    category.value=''; 

}

//showing data read

function showData(){
let table='';
for(let i=0;i<dataPro.length;i++){
table += `
<tr>
<td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
 <td><button id="update" onclick=updateData(${i})>update</button></td>    
 <td><button id="delete" onclick=deleteData(${i})>delete</button></td>              
</tr>
`;
getTotal();
}

document.getElementById("tbody").innerHTML = table;
let btndelete = document.getElementById("deleteAll");

if(dataPro.length > 0){
    btndelete.innerHTML =`<button onclick="deleteAll()">delete All(${dataPro.length})</button>`;
}else
    {
    btndelete.innerHTML ="";
}
}

//deleting data
function deleteData(id){
dataPro.splice(id,1);
localStorage.product=JSON.stringify(dataPro);
showData();
}


//delete all data
function deleteAll(){
    localStorage.clear();
   dataPro.splice(0);
   showData();
}

//counting data

function countData(){
count.value=dataPro.length;
}

//updating data
function updateData(id) {  
    title.value = dataPro[id].title;
    price.value = dataPro[id].price;
    taxes.value = dataPro[id].taxes;
    ads.value = dataPro[id].ads;
    discount.value = dataPro[id].discount;
    category.value = dataPro[id].category;
    count.style.display = 'none';
    index = id;
    create.innerHTML = "Update"; // Corrected line to change innerHTML
    mod = "update";
    getTotal();
    showData();
    scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
  
}







//Searchmode
let searchMod="title";
function getsearchMode(id){
    let search = document.getElementById("search");
if(id=="searchTitle"){
searchMod="title";

}else{
    searchMod="category";
   
}
search.placeholder="Search by "+ searchMod;
search.focus();
search.value = "";
showData();
}

//

function searchData(word){
    let table;
   if(searchMod=="title"){
  for(let i=0;i<dataPro.length;i++){ 
    if(dataPro[i].title.includes(word.toLowerCase())){
table += `
<tr>
<td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
 <td><button id="update" onclick=updateData(${i})>update</button></td>    
 <td><button id="delete" onclick=deleteData(${i})>delete</button></td>              
</tr>
`;
    }
   
  }  
   }

   else{
        for(let i=0;i<dataPro.length;i++){ 
          if(dataPro[i].category.toLowerCase().includes(word)){
      table += `
      <tr>
      <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
       <td><button id="update" onclick=updateData(${i})>update</button></td>    
       <td><button id="delete" onclick=deleteData(${i})>delete</button></td>              
      </tr>
      `;
          }
         
        }  
         
   }
   
document.getElementById("tbody").innerHTML = table; 
}
