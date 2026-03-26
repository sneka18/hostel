function navbar()
{
    return(
        <div>
               <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
      <a href="/" className="d-flex align-items-center link-body-emphasis text-decoration-none">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#8F87F1" className="bi bi-house-heart-fill me-3" viewBox="0 0 16 16">
  <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707z"/>
  <path d="m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018"/>
</svg>
        <span className="fs-4">Smart-Stay</span>
      </a>

      <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        <a className="me-3 py-2 link-body-emphasis text-decoration-none" href="#">
          Home
        </a>
        <a className="me-3 py-2 link-body-emphasis text-decoration-none" href="#features">
        Features
        </a>
        <a className="me-3 py-2 link-body-emphasis text-decoration-none" href="#price">
        Pricing
        </a>
        <a className="py-2 link-body-emphasis text-decoration-none" href="#register">
          Register
        </a>
      </nav>
      <br />
      <br />
      <br />
      <br />
    </div>

        </div>
    )
}

export default navbar;