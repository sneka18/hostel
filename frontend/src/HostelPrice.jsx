function HostelPrice() {
    return (
      <div className="HostelPrice" id="price">
        <section id="pricing" className="container">
          <div className="pricing-header p-3 pb-md-4 mx-auto text-center  #C68EFD">
            <h1 className="display-4 fw-normal text-body-emphasis">
            A Plan for Every Student's Stay
            </h1>
            <p className="fs-5 text-body-secondary">
            Simple and affordable accommodation options to suit every student's needs.
            </p>
          </div>
          <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
            <div className="col">
              <div className="card mb-4 rounded-3 shadow-sm">
                <div className="card-header py-3">
                  <h4 className="my-0 fw-normal">Single Room</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    30,000<small className="text-body-secondary fw-light">/sem</small>
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>Private Room</li>
                    <li>Attached Bathroom</li>
                    <li>Study Table</li>
                    <li>Wardrope</li>
                  </ul>
                  <button type="button" className="w-100 btn btn-lg btn-outline-dark">
                    Sign up for free
                  </button>
                </div>
              </div>
            </div>
  
            {/* Labrador Plan */}
            <div className="col">
              <div className="card mb-4 rounded-3 shadow-sm">
                <div className="card-header py-3">
                  <h4 className="my-0 fw-normal">Shared-Room(2)</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    15,000<small className="text-body-secondary fw-light">/sem</small>
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>2 Students per Room</li>
                    <li>Shared Bathroom</li>
                    <li>Maintenance Support</li>
                    <li>Cleaning Services</li>
                  </ul>
                  <button type="button" className="w-100 btn btn-lg btn-dark">
                    Get started
                  </button>
                </div>
              </div>
            </div>
  
            {/* Mastiff Plan */}
            <div className="col">
              <div className="card mb-4 rounded-3 shadow-sm border-dark">
                <div className="card-header py-3 text-bg-dark border-dark">
                  <h4 className="my-0 fw-normal">Shared-Room(3)</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    10,000<small className="text-body-secondary fw-light">/sem</small>
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>3 students per room</li>
                    <li>Shared Bathroom</li>
                    <li>Common Study Table</li>
                    <li>Maintenance Support</li>
                  </ul>
                  <button type="button" className="w-100 btn btn-lg btn-dark">
                    Contact us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <br />
      <br />
      <br />
      <br />
      </div>
    );
  }

export default HostelPrice;