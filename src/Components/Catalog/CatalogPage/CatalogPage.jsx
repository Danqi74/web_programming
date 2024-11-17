import './CatalogPage.css'
import { allMeat } from '../../../allMeat/allMeat';
import React, { useContext, useState } from 'react';
import CatalogItem from '../../Catalog/CatalogItem/CatalogItem';
import InputComponent from '../InputComponent/InputComponent';
import SelectComponent from '../SelectComponent/SelectComponent';


const CatalogPage = function() {
    const { items } = useContext(allMeat);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');
    const [selectedSortType, setSelectedSortType] = useState('');

    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
        let matchesFilter;
        switch (selectedFilter){
            case 'price_low':
                matchesFilter = item.price < 150 ? true : false;
                break;
            case 'price_high':
                matchesFilter = item.price >= 150 ? true : false;
                break;
            case 'age_high':
                matchesFilter = item.age >= 100 ? true : false;
                break;
            case 'age_low':
                matchesFilter = item.age < 100 ? true : false;
                break;
            default: matchesFilter = true;
        }
        return matchesSearch && matchesFilter
    });

    const sortedItems = [...filteredItems];

    switch (selectedSortType) {
        case "age":
            sortedItems.sort((a, b) => b.age - a.age);
            break;
        case "price_asc":
            sortedItems.sort((a, b) => a.price - b.price);
            break;
        case "price_desc":
            sortedItems.sort((a, b) => b.price - a.price);
            break;
        default:
    }

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleFilterChange = (e) => setSelectedFilter(e.target.value);
    const handleSortChange = (e) => setSelectedSortType(e.target.value);
    return(
        <div className="catalog_page_container">
            <div class="search_and_sort">
                <div class="search_container">
                    <InputComponent
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Шось шукаєш?"
                        className="search-bar"
                    />
                </div>
                <div class="sorting_container">
                    <label for="sort-select">Обери тип сортування:</label>
                    <SelectComponent
                        value={selectedSortType}
                        onChange={handleSortChange}
                        className="sort-select"
                        options={[
                            { value: '', label: 'Сортувати не треба, сам розберусь' },
                            { value: 'price_asc', label: 'По ціні за зростанням' },
                            { value: 'price_desc', label: 'По ціні за спаданням' },
                            { value: 'age', label: 'По віку' },
                        ]}
                    />
                </div>
                <div class="filter_container">
                    <label for="filter-select">Треба щось конретне? Ось фільтри:</label>

                    <SelectComponent
                        value={selectedFilter}
                        onChange={handleFilterChange}
                        className="filter-select"
                        options={[
                            { value: '', label: 'Я хочу бачити все!' },
                            { value: 'price_low', label: 'Дешеве мʼясо (до $150)' },
                            { value: 'price_high', label: 'Дорогуще мʼясо (від $150)' },
                            { value: 'age_high', label: 'Мʼясо з витримкою' },
                            { value: 'age_low', label: 'Свіже мʼясо' }
                        ]}
                    />
                </div>
            </div>

            <div className='items_container'>
                {sortedItems.map((item) => ( 
                    <CatalogItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        age={item.age}
                        power={item.power}
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    )
};

export default CatalogPage