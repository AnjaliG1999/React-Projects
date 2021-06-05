import React from "react";

const CakeTabs = (props) => {
  return (
    <div>
      <ul
        className="nav nav-tabs nav-justified"
        id="myTab"
        role="tablist"
        style={{ marginTop: "5%" }}
      >
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="description-tab"
            data-bs-toggle="tab"
            data-bs-target="#description"
            type="button"
            role="tab"
            aria-controls="description"
            aria-selected="true"
          >
            Description
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="delivery-tab"
            data-bs-toggle="tab"
            data-bs-target="#delivery"
            type="button"
            role="tab"
            aria-controls="delivery"
            aria-selected="false"
          >
            Delivery Information
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="care-tab"
            data-bs-toggle="tab"
            data-bs-target="#care"
            type="button"
            role="tab"
            aria-controls="care"
            aria-selected="false"
          >
            Care Instructions
          </button>
        </li>
      </ul>

      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="description"
          role="tabpanel"
          aria-labelledby="description-tab"
        >
          <div className="cake__description">
            <div className="cakedata__details">
              <h5>Cake Details:</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Flavour:</strong> {props.cake.flavour}
                </li>
                <li className="list-group-item">
                  <strong>Weight:</strong> {props.cake.weight} pounds
                </li>
                <li className="list-group-item">
                  <strong>Shape:</strong> Circle
                </li>
                <li className="list-group-item">
                  <strong>Serves:</strong> 4-6 People
                </li>
                <li className="list-group-item">
                  <strong>Type:</strong> {props.cake.type} Cake
                </li>
              </ul>
            </div>

            <div className="cakedata__about" style={{ flex: 2 }}>
              <h5>About the Cake:</h5>
              {/* truncate description as well? */}
              <p style={{ overflowWrap: "anywhere" }}>
                {props.cake.description}
              </p>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="delivery"
          role="tabpanel"
          aria-labelledby="delivery-tab"
        >
          <ul className="list-group list-group-flush cake__description">
            <li className="list-group-item">
              Every cake we offer is handcrafted and since each chef has his/her
              own way of baking and designing a cake, there might be slight
              variation in the product in terms of design and shape.
            </li>
            <li className="list-group-item">
              The chosen delivery time is an estimate and depends on the
              availability of the product and the destination to which you want
              the product to be delivered.{" "}
            </li>
            <li className="list-group-item">
              Since cakes are perishable in nature, we attempt delivery of your
              order only once. The delivery cannot be redirected to any other
              address.
            </li>
            <li className="list-group-item">
              This product is hand delivered and will not be delivered along
              with courier products.
            </li>
            <li className="list-group-item">
              Occasionally, substitutions of flavours/designs is necessary due
              to temporary and/or regional unavailability issues.
            </li>
          </ul>
        </div>
        <div
          className="tab-pane fade"
          id="care"
          role="tabpanel"
          aria-labelledby="care-tab"
        >
          <ul className="list-group list-group-flush cake__description">
            <li className="list-group-item">
              Store cream cakes in a refrigerator. Fondant cakes should be
              stored in an air conditioned environment.
            </li>
            <li className="list-group-item">
              Slice and serve the cake at room temperature and make sure it is
              not exposed to heat.
            </li>
            <li className="list-group-item">
              Use a serrated knife to cut a fondant cake.
            </li>
            <li className="list-group-item">
              Sculptural elements and figurines may contain wire supports or
              toothpicks or wooden skewers for support.
            </li>
            <li className="list-group-item">
              Sculptural elements and figurines may contain wire supports or
              toothpicks or wooden skewers for support.
            </li>
            <li className="list-group-item">
              The cake should be consumed within 24 hours.
            </li>
            <li className="list-group-item">Enjoy your cake!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CakeTabs;
