// get total
let title = document.querySelector('#title');
let price = document.querySelector('#price');
let taxes = document.querySelector('#taxes');
let ads = document.querySelector('#ads');
let discount = document.querySelector('#discount');
let total = document.querySelector('#total');
let count = document.querySelector('#count');
let category = document.querySelector('#category');
let create = document.querySelector('#create');

let mon ='create'
let tmp;

function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "rgb(0, 255, 26)";
    }else {
        total.innerHTML = '';
        total.style.backgroundColor = "red";
    };
};

let datePro;
if (localStorage.product != null) {
    datePro = JSON.parse(localStorage.product)
} else {
    datePro = [];
}

create.onclick = function () {
    let newPro = {
        title:title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount:discount.value,
        total: total.innerHTML,
        count:count.value,
        category:category.value,
    }
    if (title.value != '' && price.value != '' && category.value !='' && newPro.count < 201) {
            if (mon === 'create') {
        if (newPro.count > 1) {
        for (let i = 0; i < newPro.count;i++){
            datePro.push(newPro);
        }
        }else{
            datePro.push(newPro)
    }
    } else {
        datePro[tmp] = newPro;
        }
        
    clearData()
    }


    
    localStorage.setItem('product', JSON.stringify(datePro))
    console.log(datePro)

    showData()
}

function clearData() {
    title.value = '';
    price.value = '';
    count.value = '';
    ads.value = '';
    discount.value = '';
    taxes.value = '';
    category.value = '';
    total.innerHTML = '';
}

function showData() {
    let table = ''
    for (let i = 0; i < datePro.length; i++){

        table += `
    <tr>
        <td>${i+1}</td>
        <td>${datePro[i].title}</td>
        <td>${datePro[i].price}</td>
        <td>${datePro[i].taxes}</td>
        <td>${datePro[i].ads}</td>
        <td>${datePro[i].discount}</td>
        <td>${datePro[i].total}</td>
        <td>${datePro[i].category}</td>
        <td><button onclick="updateDate(${i})" class="update">update</button></td>
        <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
    </tr>
    `
        console.log(table)
    }
    
    document.getElementById('tbody').innerHTML = table;
    let deleteAll = document.querySelector('#deleteAll');
    if (datePro.length > 0) {
        deleteAll.innerHTML = `
        <button onclick="deleteAll()" >Delete All(${datePro.length})</button>
        `
    } else {
        deleteAll.innerHTML = ''
    }

}

showData()



function deleteData(i){
    datePro.splice(i, 1)
    localStorage.product = JSON.stringify(datePro);
    showData()
}

function deleteAll() {
    datePro.splice(0)
    localStorage.clear();
    showData()
}


function updateDate(i) {
    title.value = datePro[i].title;
    taxes.value = datePro[i].taxes;
    ads.value = datePro[i].ads;
    discount.value = datePro[i].discount;
    count.style.display ='none';
    category.value = datePro[i].category;
    total.innerHTML = datePro[i].total;
    tmp = i;
    mon = 'Update';
}


let searchMode = 'title';

function getSearchMode(id) {
    let search = document.querySelector('.search')
    if (id == 'searchTitle') {
        searchMode = 'title';
        search.placeholder ='Search By Title'
    } else {
        searchMode = 'category';
        search.placeholder ='Search By Category'
    }
    search.focus()
}

function searchData(value) {
    let table = '';
    if (searchMode = 'title') {
        for (let i = 0; i < datePro.length; i++){
            if (datePro[i].title.includes(value)) {
                table += `
    <tr>
        <td>${i}</td>
        <td>${datePro[i].title}</td>
        <td>${datePro[i].price}</td>
        <td>${datePro[i].taxes}</td>
        <td>${datePro[i].ads}</td>
        <td>${datePro[i].discount}</td>
        <td>${datePro[i].total}</td>
        <td>${datePro[i].category}</td>
        <td><button onclick="updateDate(${i})" class="update">update</button></td>
        <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
    </tr>
    `
                
            }
        }
    }
        for (let i = 0; i < datePro.length; i++){
            if (datePro[i].category.includes(value)) {
                table += `
    <tr>
        <td>${i}</td>
        <td>${datePro[i].title}</td>
        <td>${datePro[i].price}</td>
        <td>${datePro[i].taxes}</td>
        <td>${datePro[i].ads}</td>
        <td>${datePro[i].discount}</td>
        <td>${datePro[i].total}</td>
        <td>${datePro[i].category}</td>
        <td><button onclick="updateDate(${i})" class="update">update</button></td>
        <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
    </tr>
    `
                
            }
        }
    
    document.getElementById('tbody').innerHTML = table;
}


