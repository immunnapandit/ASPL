import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// swiper css
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

export default function ServiceHomeTwo() {
  return (
    <div className="tv-service-area2 pt-60 pb-0 gray-bg">
      <div className="container">
        <div className="row">
          <div className="tv-section-title-box text-center mb-60">
            <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
              Our Services
            </span>
            <h4 className="tv-section-title  tv-spltv-text tv-spltv-in-right">
              Smart Business Solutions <br /> with Dynamics 365
            </h4>
          </div>
        </div>
        <div className="tv-service-slider-wrap">
          <Swiper
            speed={1500}
            loop={true}
            slidesPerView={3}
            spaceBetween={30}
            autoplay={{
              delay: 4500,
            }}
            pagination={{
              el: '.swiper-pagination',
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            breakpoints={{
              '1400': {
                slidesPerView: 3,
              },
              '1200': {
                slidesPerView: 3,
              },
              '992': {
                slidesPerView: 2,
              },
              '768': {
                slidesPerView: 2,
              },
              '576': {
                slidesPerView: 1,
              },
              '0': {
                slidesPerView: 1,
              },
            }}
            className="swiper-container tv-service-slider-active"
          >
            <SwiperSlide className="swiper-slide">
              <div className="single-service-item style-2">
                <div className="thumb">
                  <img src="assets/img/service/service-thumb-1.png" alt="" />
                  <span className="icon">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_2549_36733"
                        style={{ maskType: 'luminance' }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="36"
                        height="36"
                      >
                        <path
                          d="M0 3.8147e-06H36V36H0V3.8147e-06Z"
                          fill="white"
                        />
                      </mask>
                      <g mask="url(#mask0_2549_36733)">
                        <path
                          d="M9.56226 15.4688V11.6726C9.56226 10.5075 10.5066 9.5632 11.6716 9.5632C12.8367 9.5632 13.781 10.5075 13.781 11.6726"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.781 17.0977V11.6709C13.781 10.5059 14.7253 9.56156 15.8904 9.56156C17.0555 9.56156 17.9998 10.5059 17.9998 11.6709V12.7256"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22.2185 16.9453C22.2185 18.1104 21.2742 19.0547 20.1091 19.0547C18.9441 19.0547 17.9998 18.1104 17.9998 16.9453V12.7266C17.9998 11.5615 18.9441 10.6172 20.1091 10.6172C21.2742 10.6172 22.2185 11.5615 22.2185 12.7266V13.7812"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M26.4373 18C26.4373 19.1651 25.493 20.1094 24.3279 20.1094C23.1628 20.1094 22.2185 19.1651 22.2185 18V13.7812C22.2185 12.6162 23.1628 11.6719 24.3279 11.6719C25.493 11.6719 26.4373 12.6162 26.4373 13.7812V18Z"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17.9998 0.703125V3.23438"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.6169 3.10227L11.6716 4.92969"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.15723 8.50781L5.98465 9.5625"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M25.3826 3.10227L24.3279 4.92969"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.2595 21.5874C17.0138 23.3417 17.9996 25.7218 17.9996 28.2031"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M31.8421 8.50781L30.0146 9.5625"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18.7029 35.2969C18.7029 35.6852 18.388 36 17.9998 36C17.6115 36 17.2966 35.6852 17.2966 35.2969C17.2966 34.9085 17.6115 34.5938 17.9998 34.5938C18.388 34.5938 18.7029 34.9085 18.7029 35.2969Z"
                          fill="#2B4DFF"
                        />
                        <path
                          d="M26.4373 18C26.4373 22.9423 24.3279 25.714 24.3279 30.6562V35.2969H21.1638"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.8356 35.2969H11.6715V28.5321L7.41271 24.4997C6.09435 23.2509 5.7224 21.2991 6.48951 19.653L7.87889 16.6739C8.20303 15.9806 8.85412 15.5461 9.56217 15.468C9.93271 15.4273 10.3194 15.4842 10.6822 15.6537L18.3294 19.2192C17.3444 21.3314 14.8342 22.2448 12.7227 21.2604L10.8109 20.3688"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                  </span>
                </div>
                <div className="service-content">
                  <h2>
                    <Link to="/service-details">Microsoft Dynamics 365</Link>
                  </h2>
                  <p>
                    Microsoft dynamic 365 is a product line of ERP and CRM Applications by
                    Microsoft.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="single-service-item style-2">
                <div className="thumb">
                  <img src="assets/img/service/service-thumb-3.png" alt="" />
                  <span className="icon">
                    <svg
                      width="36"
                      height="34"
                      viewBox="0 0 36 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M35.2969 17.2101H30.0076V15.7556C30.0076 15.0486 29.4324 14.4734 28.7254 14.4734H27.7816C27.2983 12.2269 26.1851 10.1808 24.5514 8.54703C21.7792 5.77482 17.8183 4.53852 13.9558 5.23932C13.5738 5.30865 13.3203 5.67455 13.3896 6.05663C13.4589 6.43871 13.8249 6.69198 14.2069 6.62286C17.6156 6.00425 21.1111 7.09522 23.5571 9.54139C24.9268 10.911 25.882 12.6085 26.3397 14.4735H22.5016C21.7946 14.4735 21.2194 15.0487 21.2194 15.7557V17.2102H15.9301C15.5418 17.2102 15.227 17.525 15.227 17.9132V22.2261C15.227 22.8861 15.484 23.4867 15.9026 23.9346V27.5427C13.1598 27.4958 10.5984 26.4108 8.64309 24.4554C6.13329 21.9456 5.05807 18.3679 5.76689 14.8849C5.8443 14.5045 5.59863 14.1332 5.21817 14.0558C4.83757 13.9783 4.46646 14.2241 4.38905 14.6045C3.58594 18.5511 4.80445 22.6053 7.64873 25.4497C9.83728 27.6382 12.818 28.8946 15.9025 28.9476V31.4953C15.9025 31.5612 15.9069 31.6261 15.9147 31.6899C7.89764 31.5902 1.40604 25.0387 1.40604 16.9984C1.40604 14.4842 2.04553 12.0267 3.26018 9.8488L5.63231 12.2322C5.76429 12.3648 5.94366 12.4393 6.13062 12.4393H10.5526L14.8875 16.7743C15.0249 16.9116 15.2048 16.9802 15.3847 16.9802C15.5646 16.9802 15.7446 16.9116 15.8818 16.7743C16.1563 16.4997 16.1563 16.0546 15.8818 15.7799L11.5467 11.445V7.02301C11.5467 6.83626 11.4724 6.65717 11.3401 6.52527L8.9614 4.15236C11.1364 2.94179 13.5899 2.30448 16.0998 2.30448C21.8033 2.30448 27.039 5.64945 29.4387 10.8263C29.5577 11.0829 29.8117 11.2338 30.077 11.2338C30.176 11.2338 30.2766 11.2128 30.3723 11.1684C30.7245 11.0051 30.8777 10.5871 30.7145 10.2349C29.4405 7.48651 27.4224 5.15755 24.8781 3.49986C22.2662 1.79795 19.2307 0.898438 16.0999 0.898438C13.2155 0.898438 10.3984 1.66688 7.9297 3.1232L5.90632 1.10452C5.70502 0.903781 5.40281 0.843875 5.14034 0.952859C4.87779 1.06177 4.70679 1.31799 4.70679 1.6022V5.58659H0.710086C0.425953 5.58659 0.169875 5.75752 0.0608906 6.01979C-0.0480937 6.28213 0.0113906 6.58419 0.211781 6.78556L2.23207 8.81541C0.770977 11.2874 0 14.109 0 16.9983C0 21.2988 1.6747 25.3419 4.71558 28.3827C7.75645 31.4237 11.7996 33.0983 16.1 33.0983L33.7205 33.0991C34.6049 33.0991 35.3244 32.3797 35.3244 31.4952V23.9349C35.7604 23.4695 36 22.8657 36 22.2248V17.9131C36 17.5249 35.6852 17.2101 35.2969 17.2101ZM6.11283 3.29666L10.1407 7.31459V10.036L6.11283 5.99898V3.29666ZM5.11812 6.99277L9.14646 11.0329H6.42284L2.40173 6.99277H5.11812ZM22.6254 15.8795H28.6014V17.2101H22.6254V15.8795ZM33.9183 28.3178H29.3045C28.9162 28.3178 28.6014 28.6326 28.6014 29.0208C28.6014 29.409 28.9162 29.7239 29.3045 29.7239H33.9183V31.4951C33.9183 31.6043 33.8296 31.693 33.7205 31.693H18.3682C18.3632 31.6929 18.3583 31.6922 18.3532 31.6922H17.4988C17.3933 31.6882 17.3085 31.6017 17.3085 31.4952V24.6942C17.4461 24.7176 17.5873 24.7306 17.7315 24.7306H23.5297C23.6544 25.7699 24.541 26.5784 25.6134 26.5784C26.6875 26.5784 27.5752 25.7674 27.6977 24.7257L33.4937 24.7294C33.4943 24.7294 33.4948 24.7294 33.4953 24.7294C33.6386 24.7294 33.7798 24.7167 33.9182 24.6933V28.3178H33.9183ZM24.9204 24.4791V23.2433H26.3066V24.4791C26.3066 24.8614 25.9957 25.1723 25.6135 25.1723C25.2314 25.1723 24.9204 24.8614 24.9204 24.4791ZM34.5939 22.2248C34.5939 22.5184 34.4796 22.7943 34.2719 23.0018C34.0644 23.2092 33.7887 23.3233 33.4953 23.3233C33.4951 23.3233 33.4949 23.3233 33.4946 23.3233L27.7127 23.3197V22.6753C27.7127 22.2132 27.3367 21.8371 26.8745 21.8371H24.3523C23.8901 21.8371 23.5141 22.2131 23.5141 22.6753V23.3245H17.7315C17.1257 23.3245 16.633 22.8316 16.633 22.226V18.6162H34.5938V22.2248H34.5939Z"
                        fill="#2B4DFF"
                      />
                    </svg>
                  </span>
                </div>
                <div className="service-content">
                  <h2>
                    <Link to="/service-details">Microsoft Azure</Link>
                  </h2>
                  <p>
                    Empower your business with scalable, secure, and intelligent cloud solutions from Microsoft Azure.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="single-service-item style-2">
                <div className="thumb">
                  <img src="assets/img/service/service-thumb-3.png" alt="" />
                  <span className="icon">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_2549_36793)">
                        <path
                          d="M15.2754 26.1162C15.1446 25.9847 14.9632 25.9102 14.7776 25.9102C14.5927 25.9102 14.412 25.9847 14.2805 26.1162C14.1497 26.247 14.0752 26.4277 14.0752 26.6133C14.0752 26.7982 14.1497 26.9796 14.2805 27.1103C14.412 27.2411 14.5927 27.3164 14.7776 27.3164C14.9632 27.3164 15.1439 27.2412 15.2754 27.1103C15.4062 26.9796 15.4814 26.7982 15.4814 26.6133C15.4814 26.4276 15.4062 26.247 15.2754 26.1162Z"
                          fill="#2B4DFF"
                        />
                        <path
                          d="M30.8653 12.1132H28.4408C29.3143 11.2419 29.8557 10.0377 29.8557 8.70933V3.11414V0.703125C29.8557 0.314789 29.5409 0 29.1525 0H23.6822C21.7816 0 20.2354 1.54624 20.2354 3.44686V5.75796C20.2354 5.76288 20.236 5.76759 20.2361 5.77245C20.236 5.7773 20.2354 5.78208 20.2354 5.78693V8.70933C20.2354 10.0377 20.7767 11.2418 21.6502 12.1132H14.0662C14.9397 11.2419 15.4811 10.0377 15.4811 8.70933V3.11414V0.703125C15.4811 0.314789 15.1663 0 14.7779 0H9.30762C7.407 0 5.86076 1.54624 5.86076 3.44686V5.75796C5.86076 5.76288 5.86139 5.76759 5.86146 5.77245C5.86139 5.7773 5.86076 5.78208 5.86076 5.78693V8.70933C5.86076 10.0377 6.40209 11.2418 7.27559 12.1132H5.68863C2.55192 12.1132 0 14.6651 0 17.8019V26.6124C0 27.0006 0.314789 27.3155 0.703125 27.3155H11.8125C12.2008 27.3155 12.5156 27.0006 12.5156 26.6124C12.5156 26.2241 12.2008 25.9092 11.8125 25.9092H4.58522V21.3698C4.58522 20.9815 4.27043 20.6667 3.88209 20.6667C3.49376 20.6667 3.17897 20.9815 3.17897 21.3698V25.9092H1.40625V17.8019C1.40625 15.4406 3.32733 13.5195 5.6887 13.5195H7.66174L9.96778 16.9694V21.1601C9.96778 21.5484 10.2826 21.8633 10.6709 21.8633C11.0592 21.8633 11.374 21.5484 11.374 21.1601V16.988L13.9423 13.5195H16.4907C18.5466 13.5195 20.2192 15.1921 20.2192 17.2479V20.1324C20.2192 20.5207 20.534 20.8356 20.9223 20.8356C21.3107 20.8356 21.6255 20.5207 21.6255 20.1324V17.2479C21.6255 15.7806 21.0058 14.456 20.0156 13.5195H21.8945L24.3192 17.1468C24.4463 17.337 24.6581 17.4535 24.8868 17.4589C24.8925 17.4591 24.8981 17.4592 24.9038 17.4592C25.1262 17.4592 25.3361 17.3538 25.4688 17.1745L28.1751 13.5195H30.8653C32.9212 13.5195 34.5938 15.1921 34.5938 17.248V20.1325C34.5938 20.5208 34.9085 20.8356 35.2969 20.8356C35.6852 20.8356 36 20.5208 36 20.1325V17.248C36 14.4167 33.6966 12.1132 30.8653 12.1132ZM7.26708 3.44686C7.26708 2.32165 8.18248 1.40625 9.30769 1.40625H14.0749V3.11414C14.0749 4.18423 13.2043 5.05484 12.1342 5.05484H7.26708V3.44686ZM10.7003 15.5348L9.35318 13.5195H12.1925L10.7003 15.5348ZM10.671 12.1133C8.79405 12.1133 7.26708 10.5863 7.26708 8.7094V6.46109H12.1342C12.8573 6.46109 13.527 6.22983 14.0749 5.8384V8.7094C14.0749 10.5863 12.5479 12.1133 10.671 12.1133ZM21.6416 3.44686C21.6416 2.32165 22.5571 1.40625 23.6822 1.40625H28.4494V3.11414C28.4494 4.18423 27.5789 5.05484 26.5087 5.05484H21.6416V3.44686ZM24.9331 15.5348L23.586 13.5195H26.4253L24.9331 15.5348ZM25.0456 12.1133C23.1687 12.1133 21.6416 10.5863 21.6416 8.7094V6.46109H26.5088C27.2319 6.46109 27.9016 6.22983 28.4495 5.8384V8.7094C28.4495 10.5863 26.9225 12.1133 25.0456 12.1133Z"
                          fill="#2B4DFF"
                        />
                        <path
                          d="M33.427 21.9707H30.1565V20.6185C30.1565 19.6938 29.4042 18.9414 28.4794 18.9414H24.8175C23.8928 18.9414 23.1404 19.6937 23.1404 20.6185V21.9707H19.87C18.4512 21.9707 17.2969 23.1249 17.2969 24.5438V33.4259C17.2969 34.8448 18.4513 35.999 19.87 35.999H33.4271C34.8458 35.999 36.0001 34.8448 36.0001 33.4259V24.5438C36.0001 23.1249 34.8458 21.9707 33.427 21.9707ZM24.8176 20.3477H28.4795C28.6289 20.3477 28.7504 20.4692 28.7504 20.6185V21.9707H24.5468V20.6185H24.5467C24.5467 20.4692 24.6682 20.3477 24.8176 20.3477ZM34.5938 33.4259C34.5938 34.0694 34.0704 34.5928 33.427 34.5928H19.87C19.2267 34.5928 18.7032 34.0694 18.7032 33.4259V28.3439H24.7766V28.459C24.7766 29.4911 25.6163 30.3308 26.6485 30.3308C27.6807 30.3308 28.5204 29.4911 28.5204 28.459V28.3439H34.5938V33.4259ZM26.1829 28.459V27.5259H27.1141V28.459C27.1141 28.7156 26.9053 28.9245 26.6485 28.9245C26.3917 28.9245 26.1829 28.7156 26.1829 28.459ZM34.5938 26.9377H28.5204V26.8227C28.5204 26.4345 28.2056 26.1196 27.8172 26.1196H25.4798C25.0915 26.1196 24.7767 26.4345 24.7767 26.8227V26.9377H18.7032V24.5438C18.7032 23.9004 19.2266 23.3769 19.87 23.3769H23.8436H29.4534H33.427C34.0703 23.3769 34.5938 23.9003 34.5938 24.5438V26.9377Z"
                          fill="#2B4DFF"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2549_36793">
                          <rect width="36" height="36" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                </div>
                <div className="service-content">
                  <h2>
                    <Link to="/service-details">Microsoft Power Platform</Link>
                  </h2>
                  <p>
                    Empowering businesses with cutting-edge solutions built on trusted Microsoft technologies and platforms.
                  </p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="single-service-item style-2">
                <div className="thumb">
                  <img src="assets/img/service/service-thumb-1.png" alt="" />
                  <span className="icon">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_2549_36733"
                        style={{ maskType: 'luminance' }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="36"
                        height="36"
                      >
                        <path
                          d="M0 3.8147e-06H36V36H0V3.8147e-06Z"
                          fill="white"
                        />
                      </mask>
                      <g mask="url(#mask0_2549_36733)">
                        <path
                          d="M9.56226 15.4688V11.6726C9.56226 10.5075 10.5066 9.5632 11.6716 9.5632C12.8367 9.5632 13.781 10.5075 13.781 11.6726"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.781 17.0977V11.6709C13.781 10.5059 14.7253 9.56156 15.8904 9.56156C17.0555 9.56156 17.9998 10.5059 17.9998 11.6709V12.7256"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22.2185 16.9453C22.2185 18.1104 21.2742 19.0547 20.1091 19.0547C18.9441 19.0547 17.9998 18.1104 17.9998 16.9453V12.7266C17.9998 11.5615 18.9441 10.6172 20.1091 10.6172C21.2742 10.6172 22.2185 11.5615 22.2185 12.7266V13.7812"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M26.4373 18C26.4373 19.1651 25.493 20.1094 24.3279 20.1094C23.1628 20.1094 22.2185 19.1651 22.2185 18V13.7812C22.2185 12.6162 23.1628 11.6719 24.3279 11.6719C25.493 11.6719 26.4373 12.6162 26.4373 13.7812V18Z"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17.9998 0.703125V3.23438"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.6169 3.10227L11.6716 4.92969"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.15723 8.50781L5.98465 9.5625"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M25.3826 3.10227L24.3279 4.92969"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.2595 21.5874C17.0138 23.3417 17.9996 25.7218 17.9996 28.2031"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M31.8421 8.50781L30.0146 9.5625"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18.7029 35.2969C18.7029 35.6852 18.388 36 17.9998 36C17.6115 36 17.2966 35.6852 17.2966 35.2969C17.2966 34.9085 17.6115 34.5938 17.9998 34.5938C18.388 34.5938 18.7029 34.9085 18.7029 35.2969Z"
                          fill="#2B4DFF"
                        />
                        <path
                          d="M26.4373 18C26.4373 22.9423 24.3279 25.714 24.3279 30.6562V35.2969H21.1638"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.8356 35.2969H11.6715V28.5321L7.41271 24.4997C6.09435 23.2509 5.7224 21.2991 6.48951 19.653L7.87889 16.6739C8.20303 15.9806 8.85412 15.5461 9.56217 15.468C9.93271 15.4273 10.3194 15.4842 10.6822 15.6537L18.3294 19.2192C17.3444 21.3314 14.8342 22.2448 12.7227 21.2604L10.8109 20.3688"
                          stroke="#2B4DFF"
                          strokeWidth="1.40625"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                  </span>
                </div>
                <div className="service-content">
                  <h2>
                    <Link to="/service-details">Microsoft Power BI</Link>
                  </h2>
                  <p>
                    Transform data into actionable insights with Microsoft Power BI interactive analytics platform.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="row">
            <div className="col-12 text-center">
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
