let artificialTrees = [
    {
        id: 0,
        manufacturer: "GreenForest",
        height: 180,
        price: 1200,
        material: "ПВХ"
    },
    {
        id: 1,
        manufacturer: "EcoTree",
        height: 200,
        price: 1500,
        material: "Поліетилен"
    },
    {
        id: 2,
        manufacturer: "SnowyPine",
        height: 150,
        price: 1000,
        material: "ПВХ"
    },
    {
        id: 3,
        manufacturer: "EverGreen",
        height: 220,
        price: 2000,
        material: "Поліпропілен"
    },
    {
        id: 4,
        manufacturer: "NatureTouch",
        height: 170,
        price: 1350,
        material: "Поліетилен"
    },
    {
        id: 5,
        manufacturer: "WinterMagic",
        height: 190,
        price: 1600,
        material: "ПВХ"
    },
    {
        id: 6,
        manufacturer: "EcoDecor",
        height: 210,
        price: 2200,
        material: "Поліпропілен"
    },
    {
        id: 7,
        manufacturer: "Snowflake",
        height: 160,
        price: 1100,
        material: "ПВХ"
    }
];

let currentTrees = [...artificialTrees];
const editModal = document.getElementById("modal_edit")

function displayTrees(TreesList) {
    const TreesListUl = document.getElementById('cards_list');
    TreesListUl.innerHTML = '';
    TreesList.forEach(tree => {
        const treeLi = document.createElement('li');
        treeLi.className = 'item';
        treeLi.innerHTML = `
        <strong>Manufacturer:</strong> ${tree.manufacturer} <br>
        <strong>Height:</strong> ${tree.height} <br>
        <strong>Price:</strong> ${tree.price} <br>
        <strong>Material:</strong> ${tree.material}
        <br>
        <button onclick="openEditModal(${tree.id})">Edit</button>
        `;
        TreesListUl.appendChild(treeLi);
    });
    calculateTotalPrice(TreesList)
}

displayTrees(currentTrees);

function searchTrees() {
    const searchQuery = document.getElementById('search').value.toLowerCase().trim();
    currentTrees = artificialTrees.filter(tree =>
        tree.manufacturer.toLowerCase().includes(searchQuery)
    );
    displayTrees(currentTrees);
}

function clearSearch() {
    const searchInput = document.getElementById('search');
    searchInput.value = '';
    currentTrees = [...artificialTrees];
    displayTrees(currentTrees);
}

function sortTrees(){
    const sortType = document.getElementById('sort-select').value;
    switch (sortType) {
        case "manufacturer":
            currentTrees = [...currentTrees].sort((a, b) => a.manufacturer.localeCompare(b.manufacturer));
            break;
        case "material":
            currentTrees = [...currentTrees].sort((a, b) => a.material.localeCompare(b.material));
            break;
        case "height":
            currentTrees = [...currentTrees].sort((a, b) => b.height - a.height);
            break;
        case "price_asc":
            currentTrees = [...currentTrees].sort((a, b) => a.price - b.price);
            break;
        case "price_desc":
            currentTrees = [...currentTrees].sort((a, b) => b.price - a.price);
            break;
    }

    displayTrees(currentTrees)
}

function calculateTotalPrice(TreesList) {
    const totalPrice = TreesList.reduce((sum, tree) => sum + tree.price, 0);
    document.getElementById('totalPrice').innerHTML = `
          <strong>Total price:</strong> ${totalPrice}
        `;
}

let editTreeIndex = null;

function openEditModal(treeId) {
    editModal.style.display = "flex";

    editTreeIndex = currentTrees.findIndex((tree) => tree.id === treeId);
    const currentTree = currentTrees[editTreeIndex]

    const editFormManufacturer = document.getElementById('edit_manufacturer');
    const editFormPrice = document.getElementById('edit_price');
    const editFormHeight = document.getElementById('edit_height');
    const editFormMaterial = document.getElementById('edit_material');

    editFormManufacturer.value = currentTree.manufacturer;
    editFormPrice.value = currentTree.price;
    editFormHeight.value = currentTree.height;
    editFormMaterial.value = currentTree.material;
}

function submitEdit(){
    const editFormManufacturer = document.getElementById('edit_manufacturer');
    const editFormPrice = document.getElementById('edit_price');
    const editFormHeight = document.getElementById('edit_height');
    const editFormMaterial = document.getElementById('edit_material');

    if (editFormManufacturer.value == "" || parseInt(editFormPrice.value, 10) == NaN || parseInt(editFormHeight.value, 10) == NaN || editFormMaterial.value == ""){
        alert("Check your input data, something missed!");
        return
    }

    currentTrees[editTreeIndex].manufacturer = editFormManufacturer.value;
    currentTrees[editTreeIndex].price = parseInt(editFormPrice.value, 10);
    currentTrees[editTreeIndex].height = parseInt(editFormHeight.value, 10);
    currentTrees[editTreeIndex].material = editFormMaterial.value;

    displayTrees(currentTrees);
    closeEditModal()
}

function closeEditModal() {
    editModal.style.display = "none";
}

function getNewId(){
    if (currentTrees.length > 0) {
        return Math.max(...currentTrees.map(tree => tree.id)) + 1
    } else{
        return 0
    }
}

function submitAdd(){
    const newId = getNewId();
    const addManufacturerForm = document.getElementById("add_manufacturer");
    const addPriceForm = document.getElementById("add_price");
    const addHeightForm = document.getElementById("add_height");
    const addMaterialForm = document.getElementById("add_material");

    const newTree = {
        id: newId,
        manufacturer: addManufacturerForm.value,
        price: parseInt(addPriceForm.value, 10),
        height: parseInt(addHeightForm.value, 10),
        material: addMaterialForm.value
    }

    if (newTree.manufacturer == "" || newTree.price == NaN || newTree.height == NaN || newTree.material == ""){
        alert("Check your input data, something missed!");
        return
    }

    currentTrees.push(newTree);
    displayTrees(currentTrees);

    addManufacturerForm.value = "";
    addPriceForm.value = "";
    addHeightForm.value = "";
    addMaterialForm.value = "";
}

window.sortTrees = sortTrees;
window.submitEdit = submitEdit;
window.submitAdd = submitAdd;
window.openEditModal = openEditModal;
window.searchTrees = searchTrees;
window.clearSearch = clearSearch;
