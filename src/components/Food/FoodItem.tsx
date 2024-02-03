import { FoodItemsProp } from '../../types';
import NaverMapApi from '../NaverMapApi';

const FoodItem = (item: FoodItemsProp) => {
    return (
        <div className='FoodItem'>
            <section className='image_area'>
                <div className='image'>
                    <img src={item.image.src} alt={item.image.alt} />
                </div>
            </section>
            <section className='content_area'>
                <div className='store_desc'>
                    <span className='name'>{item.name}</span>
                    <span className='tel'>Tel. {item.content.tel}</span>
                    <span className='content'>{item.content.desc}</span>
                    <span className='address'>{item.address}</span>
                </div>
                <div className='store_map'>
                    <div className='map_image'>
                        <NaverMapApi mapAddress={item.address} />
                    </div>
                </div>
            </section>
        </div>
    );
};
export default FoodItem;
