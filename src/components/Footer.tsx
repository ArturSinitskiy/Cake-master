import { FC } from "react";
import { Link } from "react-router-dom";

const Footer: FC = () => {
  return (
    <div className="bg-blue-500 text-white p-4 text-center mt-auto">
      <div>
        <div>
          <div>


            <div style={{ display: 'auto', alignItems: 'center' }}>
              <div style={{ marginLeft: '20px' }}>
                <div>г. Гомель</div>
                <div>
                  <a href="tel:+375 29 333-22-11">+375 29 333-22-11</a>
                </div>
              </div>
            </div>


            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ marginBottom: '10px' }}>Мы в социальных сетях:</div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <a href="#"><img src="/instagram.svg" style={{ width: '30px', height: '30px', margin: '0 5px' }} alt="instagram" /></a>
                <a href="#"><img src="/vk.svg" style={{ width: '30px', height: '30px', margin: '0 5px' }} alt="vk" /></a>
                <a href="#"><img src="/twitter.svg" style={{ width: '30px', height: '30px', margin: '0 5px' }} alt="twitter" /></a>
                <a href="#"><img src="/facebook.svg" style={{ width: '30px', height: '30px', margin: '0 5px' }} alt="facebook" /></a>
              </div>
            </div>


            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <a href="#"><img src="/m-card_1.svg" style={{ width: '30px', height: '30px', margin: '0 5px' }} alt="mastercard" /></a>
                <a href="#"><img src="/mir_1.svg" style={{ width: '30px', height: '30px', margin: '0 5px' }} alt="мир" /></a>
                <a href="#"><img src="/paypal_1.svg" style={{ width: '30px', height: '30px', margin: '0 5px' }} alt="PayPal" /></a>
                <a href="#"><img src="/visa.svg" style={{ width: '30px', height: '30px', margin: '0 5px' }} alt="visa" /></a>
                <a href="#"><img src="/yandex_1.svg" style={{ width: '30px', height: '30px', margin: '0 5px' }} alt="yandex money" /></a>
              </div>
            </div>

          </div>
        </div>
      </div>
      <br />
      <br />
      <hr />
      <br />
      <div>&copy; Copyright | All Rights Reserved</div>
      <div>
        <Link
          to="#"
          className="hover:underline hover:font-bold opacity-85 hover:opacity-100"
        >
          GI-31 | BSLHY
        </Link>
      </div>
    </div>
  );
};

export default Footer;
