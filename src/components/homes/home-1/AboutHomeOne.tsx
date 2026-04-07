import { useEffect, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';

const globalLocations = [
  {
    id: 'california',
    title: 'USA - California',
    address: '8909 Veritas Road Manteca, CA 95337',
    email: 'sales@dynatechconsultancy.com',
    phone: '+1 844 787 3365',
    thumbClassName: 'is-california',
    mapSrc: 'https://www.google.com/maps?q=California%2C%20USA&z=4&output=embed',
    mapLabel: 'California',
    flagClassName: 'is-usa',
    flagText: 'USA',
    markerPosition: { x: '46%', y: '58%' }
  },
  {
    id: 'new-jersey',
    title: 'USA - New Jersey',
    address: '1547 B Finnegan Ln, North Brunswick, NJ 08902',
    email: 'sales@dynatechconsultancy.com',
    phone: '+1 551 722 7202',
    thumbClassName: 'is-new-jersey',
    mapSrc: 'https://www.google.com/maps?q=New%20Jersey%2C%20USA&z=6&output=embed',
    mapLabel: 'New Jersey',
    flagClassName: 'is-usa',
    flagText: 'USA',
    markerPosition: { x: '62%', y: '45%' }
  },
  {
    id: 'leeds',
    title: 'UK - Leeds',
    address: 'Annexe G, Oaktree House 408 Oakwood Lane, Leeds, UK LS8 3LG - 62020',
    email: 'sales@dynatechconsultancy.com',
    phone: '+44 113 328 0397',
    thumbClassName: 'is-leeds',
    mapSrc: 'https://www.google.com/maps?q=Leeds%2C%20UK&z=6&output=embed',
    mapLabel: 'Leeds',
    flagClassName: 'is-uk',
    flagText: 'UK',
    markerPosition: { x: '57%', y: '34%' }
  },
  {
    id: 'ahmedabad',
    title: 'India - Ahmedabad',
    address: '18, Times Corporate Park, Thaltej, Ahmedabad, India - 380059',
    email: 'sales@dynatechconsultancy.com',
    phone: '+91 722 705 2731 / +91 848 801 6596',
    thumbClassName: 'is-ahmedabad',
    mapSrc: 'https://www.google.com/maps?q=Ahmedabad%2C%20India&z=8&output=embed',
    mapLabel: 'Ahmedabad',
    flagClassName: 'is-india',
    flagText: 'IND',
    markerPosition: { x: '76%', y: '53%' }
  }
];

export default function AboutHomeOne() {
  const [activeLocationId, setActiveLocationId] = useState(globalLocations[0].id);
  const [displayedLocationId, setDisplayedLocationId] = useState(globalLocations[0].id);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const activeLocation =
    globalLocations.find((location) => location.id === activeLocationId) ??
    globalLocations[0];
  const displayedLocation =
    globalLocations.find((location) => location.id === displayedLocationId) ??
    globalLocations[0];

  useEffect(() => {
    if (activeLocationId === displayedLocationId) {
      return;
    }

    const timer = window.setTimeout(() => {
      setDisplayedLocationId(activeLocationId);
      setIsMapLoaded(false);
    }, 420);

    return () => window.clearTimeout(timer);
  }, [activeLocationId, displayedLocationId]);

  return (
    <div className="tv-about-area z-index-1 p-relative pt-130 pb-130 white-bg">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-xl-5 col-lg-5">
            <div className="tv-section-title-box">
              <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                About Company
              </span>
              <h4 className="tv-section-title pb-20 tv-spltv-text tv-spltv-in-right">
                AtiSunya is a trusted Microsoft partner delivering digital solutions.
              </h4>
            </div>
          </div>
          <div className="col-xl-7 col-lg-7 text-end  ">
            <div
              className="tv-fade-anim button"
              data-fade-from="top"
              data-ease="bounce"
              data-delay=".5"
            >
              <Link to="/contact" className="tv-btn-secondary">
                <span className="btn-wrap">
                  <span className="btn-text1">Know More</span>
                  <span className="btn-text2">Know More</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="tv-about-section mt-60">
          <div className="row align-items-center">
            <div
              className="col-xl-4 col-lg-6 col-md-6 wow itfadeUp"
              data-wow-duration=".9s"
              data-wow-delay=".3s"
            >
              <div className="tv-about-left">
                <div className="single-icon-box">
                  <span>
                    <img src="assets/img/icon/about-icon-1.png" alt="" />
                  </span>
                  <div className="icon-box-content">
                    <h3>Our Mission</h3>
                    <p>
                      To drive digital transformation through reliable Microsoft-based solutions.
                    </p>
                  </div>
                </div>
                <div className="single-icon-box">
                  <span>
                    <img src="assets/img/icon/about-icon-2.png" alt="" />
                  </span>
                  <div className="icon-box-content">
                    <h3>Our Vission</h3>
                    <p>
                      To drive innovation and excellence across industries worldwide.
                    </p>
                  </div>
                </div>
                <div className="single-icon-box">
                  <span>
                    <img src="assets/img/icon/about-icon-3.png" alt="" />
                  </span>
                  <div className="icon-box-content">
                    <h3>Our Awards</h3>
                    <p>
                      Recognized for excellence in delivering Microsoft-based solutions and digital transformation services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-6 col-md-6 wow itfadeUp"
              data-wow-duration=".9s"
              data-wow-delay=".5s"
            >
              <div className="tv-about-middle">
                <img src="assets/img/about/about-1-1.png" alt="" />
                <p>
                  Honored for delivering excellence through certified expertise, trusted partnerships, and innovative technology solutions.{' '}
                </p>
              </div>
            </div>
            <div
              className="col-xl-4 d-xxl-block d-xl-block d-none col-md-6 col-sm-6 wow itfadeUp"
              data-wow-duration=".9s"
              data-wow-delay=".7s"
            >
              <div className="tv-about-right">
                <img src="assets/img/about/about-1-2.png" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="tv-about2-footprints mt-130">
          <div className="tv-section-title-box text-center mb-50">
            <h4 className="tv-section-title">Our Global Footprints</h4>
          </div>

          <div className="row g-4 align-items-stretch">
            <div className="col-xl-5 col-lg-5">
              <div className="tv-about2-footprints-list">
                {globalLocations.map((location) => {
                  const isActive = location.id === activeLocation.id;

                  return (
                    <button
                      key={location.id}
                      type="button"
                      className={`tv-about2-location-card ${isActive ? 'is-active' : ''}`}
                      onClick={() => {
                        if (location.id !== activeLocationId) {
                          setActiveLocationId(location.id);
                        }
                      }}
                    >
                      <div className={`tv-about2-location-thumb ${location.thumbClassName}`}></div>
                      <div className="tv-about2-location-content">
                        <h5>{location.title}</h5>
                        <ul>
                          <li>
                            <span>
                              <i className="fa-solid fa-location-dot"></i>
                            </span>
                            {location.address}
                          </li>
                          <li>
                            <span>
                              <i className="fa-solid fa-envelope"></i>
                            </span>
                            {location.email}
                          </li>
                          <li>
                            <span>
                              <i className="fa-solid fa-phone"></i>
                            </span>
                            {location.phone}
                          </li>
                        </ul>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="col-xl-7 col-lg-7">
              <div
                className="tv-about2-map-wrap"
                style={
                  {
                    '--tv-badge-x': activeLocation.markerPosition.x,
                    '--tv-badge-y': activeLocation.markerPosition.y
                  } as CSSProperties
                }
              >
                <div className={`tv-about2-map-frame ${isMapLoaded ? 'is-loaded' : ''}`}>
                <iframe
                  key={displayedLocation.id}
                  title={`${displayedLocation.title} map`}
                  src={displayedLocation.mapSrc}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setIsMapLoaded(true)}
                ></iframe>
                </div>

                <div className={`tv-about2-map-overlay ${isMapLoaded ? 'is-hidden' : ''}`}></div>
                <div className="tv-about2-map-flight">
                  <i className="fa-solid fa-location-arrow"></i>
                </div>

                <div className="tv-about2-map-badge">
                  <div className={`tv-about2-map-flag ${activeLocation.flagClassName}`}>
                    {activeLocation.flagText}
                  </div>
                  <span>{activeLocation.mapLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
