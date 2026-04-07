import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// swiper css
import 'swiper/css';
import 'swiper/css/pagination';

const teamMembers = [
  {
    name: 'Saroj Pandit',
    designation: 'Director & Founder',
    image: '/assets/img/team/Saroj.jpg',
    linkedin: 'https://in.linkedin.com/in/sarojpandit',
  },
  {
    name: 'Shalini Verma',
    designation: 'Director',
    image: '/assets/img/team/Shalini.jpg',
    linkedin: 'https://in.linkedin.com/in/shalinivermaaspl',
  },
  {
    name: 'Atul Verma',
    designation: 'Managing Director',
    image: '/assets/img/team/Atul.jpg',
    linkedin: 'https://in.linkedin.com/in/atulk-verma',
  },
  {
    name: 'Umesh Prajapati',
    designation: 'Solution Architect',
    image: '/assets/img/team/Umesh.jpg',
    linkedin: 'https://in.linkedin.com/in/umeshprajapatiaspl',
  },
  {
    name: 'Sangeeta Verma',
    designation: 'Senior Consultant',
    image: '/assets/img/team/Sangeeta.jpg',
    linkedin: 'https://in.linkedin.com/in/sangeetavermasingh',
  },
] as const;

export default function TeamHomeOne() {
  return (
    <div
      className="tv-team-area pt-130 pb-130 section-bg footer-bg"
      style={{ backgroundImage: `url(/assets/img/team/team-bg.png)` }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-5 col-lg-5 col-12">
            <div className="tv-team-slider-area">
              <Swiper
                loop={true}
                spaceBetween={35}
                speed={1500}
                slidesPerView={1}
                direction="horizontal"
                autoplay={{
                  delay: 4500,
                  reverseDirection: true,
                  disableOnInteraction: false,
                }}
                pagination={{
                  el: '.tv-team-pagination',
                  clickable: true,
                  renderBullet: (index: number, className: string) => {
                    return `
                  <span class="${className}">
                    <img src="${teamMembers[index].image}" alt="${teamMembers[index].name}" />
                  </span>
                `;
                  },
                }}
                navigation={{ prevEl: '.arrow-prev', nextEl: '.arrow-next' }}
                modules={[Autoplay, Navigation, Pagination]}
                className="swiper-container tv-team-slide-active"
              >
                {teamMembers.map((member) => (
                  <SwiperSlide className="swiper-slide" key={member.linkedin}>
                    <div className="single-team-item">
                      <img src={member.image} alt={member.name} />
                      <div className="team-social">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${member.name} LinkedIn profile`}
                        >
                          <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                      </div>
                      <div className="team-content d-flex justify-content-between align-items-center">
                        <div>
                          <h2 className="team-name">{member.name}</h2>
                          <p className="designation">{member.designation}</p>
                        </div>
                        <div>
                          <div className="round-shape">-</div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="col-xl-7 col-lg-7 col-12 order-md-0">
            <div className="tv-team-right-area">
              <div className="tv-section-title-box mb-40">
                <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                  AtiSunya Team
                </span>
                <h4 className="tv-section-title pb-20 tv-spltv-text tv-spltv-in-right">
                  Meet the experts behind AtiSunya Private Limited.
                </h4>
                <p>
                  Our leadership and consulting team helps businesses move faster with
                  Microsoft Dynamics 365, Azure, Power Platform, training, and digital
                  transformation services.
                </p>
              </div>
              <div className="tv-team-arrow-box d-flex justify-content-md-end">
                <div>
                  <div
                    className="it-fade-anim"
                    data-fade-from="top"
                    data-ease="bounce"
                    data-delay=".7"
                  >
                    <button className="arrow-next mb-25">
                      <i className="fa-light fa-arrow-left-long"></i>
                    </button>
                  </div>
                  <div
                    className="it-fade-anim"
                    data-fade-from="top"
                    data-ease="bounce"
                    data-delay=".5"
                  >
                    <button className="arrow-prev active">
                      <i className="fa-light fa-arrow-right-long"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="tv-team-pagination d-flex"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
