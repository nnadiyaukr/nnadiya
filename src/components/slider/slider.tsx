import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import classes from './slider.module.scss';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

import img01 from '@img/slider/01.webp';
import img02 from '@img/slider/02.webp';
import img03 from '@img/slider/03.jpg';

export const Slider = () => {
    const slides = [
        {
            id: 1,
            text: 'Слайд 1',
            img: img01,
        },
        {
            id: 2,
            text: 'Слайд 2',
            img: img02,
        },

        {
            id: 3,
            text: 'Слайд 3',
            img: img03,
        },
        {
            id: 4,
            text: 'Слайд 2',
            img: img02,
        },
    ];
    return (
        <div className={'_container-default'}>
            <Swiper
                // modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={3}
                loop={true}
                // navigation
                // pagination={{ clickable: true }}
                breakpoints={{
                    320: {
                        slidesPerView: 1.2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    1024: {
                        slidesPerView: 2.5,
                        spaceBetween: 20,
                    },
                }}
                className={classes.slider}
            >
                {slides.map(({ id, img }) => (
                    <SwiperSlide key={id}>
                        <div className={classes.slide}>
                            <img src={img} alt="img" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
