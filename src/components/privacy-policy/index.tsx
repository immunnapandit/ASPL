import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';

export default function PrivacyPolicy() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Privacy Policy" subtitle="Privacy Policy" />
        <section className="pt-130 pb-130">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-9 col-lg-10">
                <div className="tv-blog-details-wrapper">
                  <h3>Privacy Policy</h3>
                  <p>
                    AtiSunya respects your privacy and is committed to protecting the information
                    you share with us through our website, forms, and service interactions.
                  </p>
                  <p>
                    We may collect contact details, business information, and website usage data to
                    respond to inquiries, improve user experience, and deliver relevant consulting,
                    implementation, and support services.
                  </p>
                  <p>
                    Information is used only for legitimate business purposes, including client
                    communication, service delivery, support, and internal analysis. We do not sell
                    personal information to third parties.
                  </p>
                  <p>
                    Where required, trusted service providers may process information on our behalf
                    for hosting, communication, analytics, or operational support under appropriate
                    safeguards.
                  </p>
                  <p>
                    If you need details about the data we hold, or want to request correction or
                    deletion of your information, please contact us at
                    {' '}
                    <a href="mailto:info@atisunya.co">info@atisunya.co</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterOne />
    </Wrapper>
  );
}
