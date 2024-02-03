/**  Review **/
export interface ReviewContent {
    id: number;
    nick: string;
    password: string;
    grade: number;
    content: string;
    date: number;
}

/** Food **/
export interface FoodItemsProp {
    name: string;
    content: {
        tel: string;
        desc: string;
    };
    image: {
        src: string;
        alt: string;
    };
    address: string;
}
