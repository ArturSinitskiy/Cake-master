import { FC, useState } from "react"; // Импорт React и хуков useState
import { RxCross1 } from "react-icons/rx"; // Импорт иконки для крестика
import { useAppDispatch, useAppSelector } from "../redux/hooks"; // Импорт хуков Redux для работы с состоянием
import { emptyCart, setCartState } from "../redux/features/cartSlice"; // Импорт экшенов Redux для управления состоянием корзины
import CartRow from "@components/CartRow"; // Импорт компонента CartRow для отображения строки корзины
import toast from "react-hot-toast"; // Импорт библиотеки для отображения уведомлений

const Cart: FC = () => {
  const dispatch = useAppDispatch(); // Инициализация диспетчера Redux
  const isOpen = useAppSelector((state) => state.cartReducer.cartOpen); // Получение состояния открытия корзины из Redux
  const items = useAppSelector((state) => state.cartReducer.cartItems); // Получение элементов корзины из Redux
  const [checkout, setCheckout] = useState(false); // Инициализация состояния для оформления заказа

  // Функция для вычисления общей стоимости товаров в корзине
  const calculateTotal = () => {
    let total = 0;
    items.forEach((item) => {
      if (item.quantity && item.discountPercentage)
        total +=
          (item.price - (item.price * item.discountPercentage) / 100) *
          item.quantity;
    });
    return total.toFixed(2); 
  };

  // Функция для обработки заказа
  const handleOrder = () => {
    dispatch(setCartState(false)); // Закрывает корзину
    dispatch(emptyCart()); // Очищает корзину
    setCheckout(false); // Сбрасывает состояние оформления заказа
    toast.success("Ваш заказ успешно оформлен", { duration: 3000 }); 
  };

  if (isOpen) { // Если корзина открыта
    return (
      <div className="bg-[#0000007d] w-full min-h-screen fixed left-0 top-0 z-20 overflow-y-auto">
        {checkout ? ( // Если оформляется заказ
          <div className="max-w-[400px] w-full min-h-full bg-white absolute right-0 top-0 p-6 font-karla">
            <h1 className="font-bold text-xl mb-1">Заказ оформлен!</h1>
            <p className="leading-4 mb-3">
              В ближайшее время вам поступит уведомление о доставке.
            </p>
            <div className="flex items-center space-x-2">
              <span
                className="w-1/2 border border-gray-500 rounded cursor-pointer text-center py-1"
                onClick={() => setCheckout(false)}
              >
                Отмена
              </span>
              <span
                className="w-1/2 border border-gray-500 rounded cursor-pointer text-center py-1"
                onClick={handleOrder}
                data-test="confirm-order-btn"
              >
                Подтвердить
              </span>
            </div>
          </div>
        ) : ( // Если корзина открыта, но не оформляется заказ
          <div
            className="max-w-[400px] w-full min-h-full bg-white absolute right-0 top-0 p-6 font-karla"
            data-test="cart-container"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-2xl">Ваша корзина</h3>
              <RxCross1
                className="text-[24px] cursor-pointer hover:opacity-70"
                onClick={() => dispatch(setCartState(false))}
                data-test="cart-close"
              />
            </div>
            <div className="mt-6 space-y-2">
              {items?.length > 0 ? ( // Проверка наличия товаров в корзине
                items.map((item) => <CartRow key={item.id} {...item} />) // Отображение товаров в корзине
              ) : (
                <div className="flex flex-col justify-center items-center p-4">
                  <img src="/emptyCart.jpg" alt="empty" className="w-40" />
                  <p className="text-center text-xl my-2">Ваша корзина пустая</p>
                </div>
              )}
            </div>
            {items?.length > 0 && (
              <>
                <div className="flex items-center justify-between p-2">
                  <h2 className="font-bold text-2xl">Итого</h2>
                  <h2 className="font-bold text-2xl">{calculateTotal()} руб.</h2>
                </div>
                <button
                  type="button"
                  data-test="checkout-btn"
                  onClick={() => setCheckout(true)}
                  className="w-full text-center text-white bg-blue-500 py-2 my-4 rounded font-bold text-xl hover:bg-blue-700"
                >
                  Заказать
                </button>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
};

export default Cart; // Экспорт компонента корзины для использования в других частях приложения
