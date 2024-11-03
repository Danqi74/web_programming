const artificialTrees = [
    {
        manufacturer: "GreenForest",
        height: 180,
        price: 1200,
        material: "ПВХ"
    },
    {
        manufacturer: "EcoTree",
        height: 200,
        price: 1500,
        material: "Поліетилен"
    },
    {
        manufacturer: "SnowyPine",
        height: 150,
        price: 1000,
        material: "ПВХ"
    },
    {
        manufacturer: "EverGreen",
        height: 220,
        price: 2000,
        material: "Поліпропілен"
    },
    {
        manufacturer: "NatureTouch",
        height: 170,
        price: 1350,
        material: "Поліетилен"
    },
    {
        manufacturer: "WinterMagic",
        height: 190,
        price: 1600,
        material: "ПВХ"
    },
    {
        manufacturer: "EcoDecor",
        height: 210,
        price: 2200,
        material: "Поліпропілен"
    },
    {
        manufacturer: "Snowflake",
        height: 160,
        price: 1100,
        material: "ПВХ"
    }
];

let currentTrees = [...artificialTrees];

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
    const sortType = document.getElementById('sort-select').value
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

window.sortTrees = sortTrees;
window.searchTrees = searchTrees;
window.clearSearch = clearSearch;
