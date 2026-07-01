import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, CalendarDays, GraduationCap, X } from 'lucide-react';

const HIDDEN_ROUTES = ['/admin'];
const STORAGE_KEY = 'mct-enrollment-popup-dismissed';

export default function MctEnrollmentPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const shouldHideForRoute = HIDDEN_ROUTES.some((route) =>
      currentPath.startsWith(route)
    );

    if (shouldHideForRoute || sessionStorage.getItem(STORAGE_KEY) === 'true') {
      return;
    }

    const showTimer = window.setTimeout(() => {
      setIsVisible(true);
    }, 900);

    return () => window.clearTimeout(showTimer);
  }, []);

  const closePopup = () => {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="mct-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mct-popup-title"
    >
      <button
        type="button"
        className="mct-popup__backdrop"
        aria-label="Close MCT enrollment popup"
        onClick={closePopup}
      />

      <motion.div
        className="mct-popup__card"
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{
          y: -6,
          boxShadow:
            '0 34px 90px rgba(10, 22, 94, 0.24), 0 0 0 1px rgba(43, 77, 255, 0.2)',
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          className="mct-popup__close"
          aria-label="Close popup"
          onClick={closePopup}
        >
          <X size={18} strokeWidth={2.2} />
        </button>

        <div className="mct-popup__icon" aria-hidden="true">
          <GraduationCap size={34} strokeWidth={1.8} />
        </div>

        <span className="mct-popup__eyebrow">Microsoft Certified Trainer Path</span>
        <h2 id="mct-popup-title">Become a MCT Certified Trainer</h2>
        <p>
          Upgrade your profile with AtiSunya's MCT readiness program. Build
          instructional skills, improve training delivery, and prepare for the
          Microsoft Certified Trainer journey with expert guidance.
        </p>

        <div className="mct-popup__deadline">
          <CalendarDays size={18} />
          <span>
            Last date for Become MCT: <strong>30 Jun</strong>. Enroll now.
          </span>
        </div>

        <div className="mct-popup__highlights">
          <span>
            <Award size={16} />
            Microsoft ISCP aligned
          </span>
          <span>
            <CalendarDays size={16} />
            Live global batches
          </span>
        </div>

        <div className="mct-popup__actions">
          <a href="/microsoft-certified-trainer" className="mct-popup__primary">
            Enroll Now
            <ArrowRight size={18} />
          </a>
          <a href="/contact" className="mct-popup__secondary">
            Learn More
          </a>
        </div>
      </motion.div>
    </div>
  );
}
