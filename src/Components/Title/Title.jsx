import './Title.css';
import '../../images/Title_photo.png'

function Title(){
    return(
        <section className='about'>
            <div className='about_content'>
                <div className='about_image_container'>
                    <img src={require('../../images/Title_photo.png')} alt='My Little Pony: Friendship Is Magic' className='about_image'/>
                </div>
                <p className='about-description'>
                    Welcome to <strong className='shop_title'>Magic Meat and Pony</strong> 
                    <br/><br/>
                    Step into a world where magic comes to life! At Magic Meat and Pony, each pony is lovingly grown with care and enchantment, nurtured to bring joy and wonder to every heart. Our magical ponies are raised in a world of color and imagination, ready to become the perfect companion for dreamers of all ages. Discover the beauty of ponies grown with love and magic, and bring home a friend like no other!
                </p>
            </div>   
        </section>
    );
}

export default Title