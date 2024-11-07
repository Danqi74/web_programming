document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search_btn");
    if (searchButton) {
        searchButton.addEventListener("click", searchTrees);
    }

    const clearButton = document.getElementById("clear_btn");
    if (clearButton) {
        clearButton.addEventListener("click", clearSearch);
    }

    const sortSelector = document.getElementById("sort-select");
    if (sortSelector) {
        sortSelector.addEventListener("change", sortTrees);
    }

    const closeEditModalBtn = document.getElementById("close_edit_modal_btn");
    if (closeEditModalBtn) {
        closeEditModalBtn.addEventListener("click", () => {
            document.getElementById("modal_edit").style.display = "none";
        });
    }

    document.getElementById("submit_edit_btn").addEventListener("click", function (event) {
        event.preventDefault();
        editTree();
    });
    
    document.getElementById("submit_add_btn").addEventListener("click", function (event) {
        event.preventDefault();
        addTree();
    });

    fetchTrees();
});

const editModal = document.getElementById("modal_edit");
let currentTrees;

async function fetchTrees() {
    try {
        const response = await fetch('http://localhost:3000/trees');
        const trees = await response.json();
        currentTrees = trees;
        searchTrees();
    } catch (error) {
        console.error('Error fetching trees:', error);
    }
}

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
        <button class="edit-button" data-id="${tree.id}">Edit</button>
        <button class="delete-button" data-id="${tree.id}">Delete</button>
        <br><br>
        `;
        TreesListUl.appendChild(treeLi);
    });
    document.querySelectorAll(".edit-button").forEach(button => {
        button.addEventListener("click", () => openEditModal(button.dataset.id));
    });
    
    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", () => deleteTree(button.dataset.id));
    });
    calculateTotalPrice(TreesList)
}


function getNewId(){
    if (currentTrees.length > 0) {
        return Math.max(...currentTrees.map(tree => tree.id)) + 1
    } else{
        return 0
    }
}

async function addTree() {
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

    
    let isNewManufacturer = true;

    currentTrees.forEach(tree => {
        if (tree.manufacturer.toLowerCase() === newTree.manufacturer.toLowerCase()) {
            isNewManufacturer = false;
        }
    });


    if (!isNewManufacturer) {
        alert("There is already this manufacturer!");
        return
    }

    if (newTree.manufacturer == "" || newTree.price == NaN || newTree.height == NaN || newTree.material == "" || newTree.price < 0 || newTree.height < 1){
        alert("Check your input data, something missed!");
        return
    }

    try {
        const response = await fetch('http://localhost:3000/trees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTree)
        });

        if (response.ok) {
            addManufacturerForm.value = "";
            addPriceForm.value = "";
            addHeightForm.value = "";
            addMaterialForm.value = "";
            fetchTrees();
        } else {
            alert("Failed to add Tree");
        }
    } catch (error) {
        console.error('Error adding Tree:', error);
    }
}

async function editTree() {
    const editFormManufacturer = document.getElementById('edit_manufacturer');
    const editFormPrice = document.getElementById('edit_price');
    const editFormHeight = document.getElementById('edit_height');
    const editFormMaterial = document.getElementById('edit_material');

    let isNewManufacturer = true;

    currentTrees.forEach(tree => {
        if (tree.manufacturer.toLowerCase() === editFormManufacturer.value.toLowerCase()) {
            isNewManufacturer = false;
        }
    });

    if (!isNewManufacturer & editFormManufacturer.value.toLowerCase() != currentTrees[editTreeIndex].manufacturer.toLowerCase()) {
        alert("There is already this manufacturer!");
        return
    }

    if (editFormManufacturer.value == "" || parseInt(editFormPrice.value, 10) == NaN || parseInt(editFormHeight.value, 10) == NaN || editFormMaterial.value == "" || parseInt(editFormPrice.value, 10) < 0 || parseInt(editFormHeight.value, 10) < 1){
        alert("Check your input data, something missed!");
        return
    }

    const updatedTree = { manufacturer: editFormManufacturer.value, price: parseInt(editFormPrice.value, 10), height: parseInt(editFormHeight.value, 10), material: editFormMaterial.value};
    
    try {
        const response = await fetch(`http://localhost:3000/trees/${currentTrees[editTreeIndex].id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTree)
        });
        
        if (response.ok) {
            document.getElementById("modal_edit").style.display = "none";
            fetchTrees();
        } else {
            alert("Failed to edit tree");
        }
    } catch (error) {
        console.error('Error editing tree:', error);
    }
}

function calculateTotalPrice(TreeList) {
    const totalPrice = TreeList.reduce((sum, tree) => sum + tree.price, 0);
    document.getElementById('totalPrice').innerHTML = `
        <strong>Total price:</strong> ${totalPrice} <br>
        `;
}

function searchTrees() {
    const query = document.getElementById('search').value.trim().toLowerCase();
    fetch(`http://localhost:3000/trees/search?q=${query}`)
        .then(response => response.json())
        .then(filteredTrees => {
            displayTrees(filteredTrees);
        })
        .catch(error => console.error('Error searching Trees:', error));
}

function clearSearch() {
    document.getElementById('search').value = '';
    fetchTrees();
}

function sortTrees() {
    const query = document.getElementById("sort-select").value;
    fetch(`http://localhost:3000/trees/sort?q=${encodeURIComponent(query)}`)
        .then(response => {
            if (!response.ok) throw new Error(`Server error: ${response.status}`);
            return response.text();  // Retrieve as text to handle possible non-JSON responses
        })
        .then(text => {
            try {
                const data = JSON.parse(text);
                if (data) {
                    displayTrees(data);
                } else {
                    console.warn('No trees found in the sorted data');
                }
            } catch (error) {
                console.error('Invalid JSON format:', text);
            }
        })
        .catch(error => console.error('Error sorting Trees:', error.message));
}


let editTreeIndex;

function openEditModal(treeId) {
    editModal.style.display = "flex";
    editTreeIndex = currentTrees.findIndex((tree) => tree.id === parseInt(treeId));
    const currentTree = currentTrees[editTreeIndex]
    if (currentTree) {
        const editFormManufacturer = document.getElementById('edit_manufacturer');
        const editFormPrice = document.getElementById('edit_price');
        const editFormHeight = document.getElementById('edit_height');
        const editFormMaterial = document.getElementById('edit_material');
    
        editFormManufacturer.value = currentTree.manufacturer;
        editFormPrice.value = currentTree.price;
        editFormHeight.value = currentTree.height;
        editFormMaterial.value = currentTree.material;
    } else {
        console.error("Tree not found for editing.");
        alert("Tree not found");
    }
}

async function deleteTree(treeId) {
    try {
        const response = await fetch(`http://localhost:3000/trees/${treeId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchTrees();
        } else {
            alert("Failed to delete Tree");
        }
    } catch (error) {
        console.error('Error deleting Tree:', error);
    }
}
