import Breadcrumb from '../../common/Breadcrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';

export default function TermsConditions() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="Terms & Conditions" subtitle="Terms & Conditions" />
        <section className="pt-130 pb-130">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-9 col-lg-10">
                <div className="tv-blog-details-wrapper">
                  <h3>Terms & Conditions</h3>
                  <p>
                    By accessing and using the AtiSunya website, you agree to use the site only for
                    lawful purposes and in a way that does not interfere with the security,
                    availability, or proper operation of our services.
                  </p>
                  <p>
                    Website content, branding, documents, and materials are provided for general
                    business information and may be updated without prior notice. Nothing on this
                    website creates a binding service agreement unless explicitly confirmed in
                    writing.
                  </p>
                  <p>
                    Project scopes, timelines, commercial terms, and delivery obligations are
                    governed by separate proposals, statements of work, or signed agreements between
                    AtiSunya and the client.
                  </p>
                  <p>
                    While we aim to keep website information accurate and current, AtiSunya does not
                    guarantee uninterrupted access or that all content will always be error-free.
                  </p>
                  <p>
                    For questions related to these terms, please contact
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
