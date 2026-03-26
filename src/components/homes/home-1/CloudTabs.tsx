import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* TYPES */
type TabType =
  | "Microsoft Dynamics 365"
  | "Business Central"
  | "Azure"
  | "SAP"
  | "Office 365";

type ContentType = {
  title: string;
  desc: string;
  img: string;
};

const tabs: TabType[] = [
  "Microsoft Dynamics 365",
  "Business Central",
  "Azure",
  "SAP",
  "Office 365",
];

const content: Record<TabType, ContentType> = {
  "Microsoft Dynamics 365": {
    title: "Microsoft Dynamics 365 Solutions",
    desc: "Streamline your business operations with intelligent CRM and ERP solutions powered by Dynamics 365.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },

  "Business Central": {
    title: "Business Central ERP",
    desc: "Manage finances, operations, and supply chain efficiently with Microsoft Business Central.",
    img: "https://images.unsplash.com/photo-1605379399642-870262d3d051",
  },

  Azure: {
    title: "Microsoft Azure Cloud Platform",
    desc: "Build, deploy, and scale applications globally with secure and scalable Azure cloud services.",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692",
  },

  SAP: {
    title: "SAP Cloud Transformation",
    desc: "Transform enterprise workflows and unlock efficiency with SAP cloud solutions.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  },

  "Office 365": {
    title: "Microsoft Office 365 Solutions",
    desc: "Boost productivity and collaboration with Office 365 tools like Teams, Outlook, and SharePoint.",
    img: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f",
  },
};

export default function CloudPixelPerfect(): JSX.Element {

  // ✅ FIXED DEFAULT VALUE
  const [active, setActive] = useState<TabType>("Azure");

  const activeData = content[active];

  return (
    <div className="tv-blog-area pt-130 pb-130">
      <div className="container">

        {/* ================= TABS ================= */}
        <div className="tabs-center">
          <div className="tabs-pill">

            {tabs.map((tab) => (
              <button
                key={tab}
                className="tab-btn"
                onClick={() => setActive(tab)}
              >
                {active === tab && (
                  <motion.div
                    layoutId="pill"
                    className="pill-bg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <span className={active === tab ? "active-text" : ""}>
                  {tab}
                </span>
              </button>
            ))}

          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -70 }}
            transition={{ duration: 0.4 }}
            className="row align-items-center hero-section"
          >

            {/* LEFT */}
            <div className="col-lg-6">

              <motion.h2
                className="hero-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {activeData.title}
              </motion.h2>

              <motion.p
                className="hero-desc"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {activeData.desc}
              </motion.p>

              <Link to="#" className="hero-btn">
                Know More
              </Link>

            </div>

            {/* RIGHT */}
            <div className="col-lg-6 text-end">

              <motion.img
                key={activeData.img}
                src={activeData.img}
                alt={activeData.title}
                className="hero-img"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
              />

            </div>

          </motion.div>
        </AnimatePresence>

      </div>

      {/* ================= CSS ================= */}
      <style>{`

      .tabs-center{
        display:flex;
        justify-content:center;
        margin-bottom:70px;
      }

      .tabs-pill{
        display:flex;
        gap:6px;
        padding:6px;
        border-radius:16px;
        background:linear-gradient(90deg,#5b4dd8,#8e87db);
        box-shadow:0 10px 30px rgba(92,79,255,0.3);
      }

      .tab-btn{
        position:relative;
        border:none;
        background:none;
        padding:14px 28px;
        font-weight:600;
        color:white;
        cursor:pointer;
        white-space:nowrap;
      }

      .pill-bg{
        position:absolute;
        inset:0;
        background:#e4e1ff;
        border-radius:12px;
      }

      .active-text{
        position:relative;
        color:#4c44c4;
        z-index:2;
      }

      .hero-title{
        font-size:50px;
        font-weight:700;
        margin-bottom:20px;
      }

      .hero-desc{
        font-size:18px;
        margin-bottom:30px;
      }

      .hero-btn{
        background:#3657ff;
        color:#fff;
        padding:14px 34px;
        border-radius:12px;
      }

      .hero-img{
        width:520px;
        border-radius:24px;
      }

      `}</style>
    </div>
  );
}