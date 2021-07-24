import { Link } from "react-router-dom";

function ErrorPage() {
  const errorImg = "img/404.png";
  return (
    <div className="container row error-container">
      <div className="errorImg col-8">
        <img src={errorImg} alt="404 Page not found" height="500px" />
      </div>
      <div id="ErrorToHome" className="errorImg col-4">
        <h2>Oops!</h2>
        <h3>PAGE NOT FOUND</h3>
        <br />
        <p>We looked everywhere for this page.</p>
        <p>Are you sure the website URL is correct?</p>
        <p>Get in touch with the site owner.</p>
        <Link to="/home">
          <button className="btn btn-outline-primary">
            Go back to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
}
export default ErrorPage;
