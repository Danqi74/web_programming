import './MainContent.css';

function MainContent(){
    const ponies = [
        { id: 1, name: "Данило Владика Гнип", age: 7, power: "Gem Creation", price: "$999", image: require('../../images/Rarity.jpg') },
        { id: 2, name: "Макcum Смоляк", age: 8, power: "Super Strength", price: "$120", image: require('../../images/Applejack.jpg') },
        { id: 3, name: "Андріанчик втікач Поляков", age: 6, power: "Party Planning", price: "$497", image: require('../../images/PinkiePie.jpg') },
        { id: 4, name: "Максон-саксофон Гриньків", age: 5, power: "Fire Breathing", price: "$80", image: require('../../images/Spike.jpg') },
        { id: 5, name: "Назарко Скібитцький АКА Кокосовий", age: 1000, power: "Dream Manipulation", price: "$300", image: require('../../images/PrincessLuna.jpg') },
        { id: 6, name: "Вілен Вілен Соловей", age: 7, power: "Magic", price: "$180", image: require('../../images/TwilightSparkle.jpg') },
        { id: 7, name: "Пабло Ескошуваро", age: 1000, power: "Sun Raising", price: "$320", image: require('../../images/Celestia.jpg') },
        { id: 8, name: "Юра хто ти воїн Ільчишин", age: 6, power: "Animal Communication", price: "$110", image: require('../../images/Fluttershy.jpg') },
        { id: 9, name: "Ігор аля куратор Козенков", age: 6, power: "Supersonic Speed", price: "$140", image: require('../../images/RainbowDash.jpg') },
    ];

    return (
        <section className="new_arrivals">
            <h2 className="new_arrivals_title">Best sellers</h2>
            <div className="pony_grid">
                {ponies.map(pony => (
                    <div key={pony.id} className="pony_block">
                        <img src={pony.image} alt={pony.name} className="pony_image" />
                        <p className="pony_name"><strong>Name:</strong> {pony.name}</p>
                        <p className="pony_age"><strong>Age:</strong> {pony.age}</p>
                        <p className="pony_power"><strong>Power:</strong> {pony.power}</p>
                        <p className="pony_price"><strong>Price:</strong> {pony.price}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default MainContent