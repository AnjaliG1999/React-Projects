function Carousel() {
    var cake1 = "img/cake1.jpg";
    var cake2 = "img/cake2.jpg";
    var cake3 = "img/cake3.jpg";
    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img src={cake1} style={{height:"350px"}} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                <img src={cake2} style={{height:"350px"}} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                <img src={cake3} style={{height:"350px"}} className="d-block w-100" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"  data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"  data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            </div>
        
    );
}
                
export default Carousel;