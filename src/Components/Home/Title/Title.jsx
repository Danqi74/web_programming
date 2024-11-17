import './Title.css';
import '../../../images/Title_photo.png'

function Title(){
    return(
        <section className='about'>
            <div className='about_content'>
                <div className='about_image_container'>
                    <img src={require('../../../images/Title_photo.png')} alt='My Little Pony: Friendship Is Magic' className='about_image'/>
                </div>
                <p className='about-description'>
                    Ласкаво просимо до <strong className='shop_title'>Magic Meat and Pony</strong> 
                    <br/><br/>
                    Ступіть у світ, де магія стає реальністю! У "Magic Meat and Pony" кожен поні вирощується з любов'ю і чарами, щоб дарувати радість і здивування в кожному серці. Наші магічні поні вирощуються у світі кольору та уяви, готові стати ідеальним супутником для мрійників будь-якого віку. Відкрийте красу поні, вирощених з любов'ю та магією, і заберіть додому друга, якого не знайдеш ніде більше! (Не переживайте, вони не їдять людей… зазвичай!)
                </p>
            </div>   
        </section>
    );
}

export default Title