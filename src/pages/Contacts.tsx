import { FC } from "react";

const Contacts: FC = () => {
    return (
        <div className="container mx-auto min-h-[83vh] w-full max-w-6xl p-4" style={{ marginBottom: '40px', maxWidth: '1200px', margin: 'auto' }}>
            <h1 className="text-4xl font-bold font-lato text-center mb-8">Контакты</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', marginRight: '20px', marginBottom: '20px' }}>
                    <div className="font-lato">
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <a href="#" className="text-xl font-bold mb-4 pt-5">+375 29 333-22-11</a>
                            <div style={{ display: 'flex', marginLeft: '20px' }}>
                                <div style={{ marginRight: '10px' }}>
                                    <a href="#">
                                        <span>
                                            <img src="/fgs16_telegram_rounded.svg" alt="telegram" />
                                        </span>
                                    </a>
                                </div>
                                <div>
                                    <a href="#">
                                        <span>
                                            <img src="/fgs16_whatsapp_rounded.svg" alt="whatsapp" />
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            Пн – Пт с 10:00 до 20:00
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            Сб – Вс Выходной
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            г. Гомель, ул. Красноармейская, дом 4
                        </div>
                        <div style={{ marginBottom: '20px', color: "#4285f4" }}>
                            <a href="alexandr.kinder.99@bk.ru">sweetcake.gomel@mail.ru</a>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <a href="#" style={{ marginRight: '10px' }}>
                                <span>
                                    <img src="/fgs16_vk-cl-bg.svg" alt="vk" />
                                </span>
                            </a>
                            <a href="#">
                                <span>
                                    <img src="/instagram_contacts.svg" alt="instagram" />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div style={{ flex: '2', minWidth: '300px' }}>
                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Add8efb1bca02b58973aabeb5ca37fd1c0d37632307bc96a423ff3c7dec96e18e&amp;source=constructor" width="97%" height="460"></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contacts;
