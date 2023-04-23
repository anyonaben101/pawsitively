function Service({service}) {
    return ( <>
        <div className="jumbotron">
            <h4 className="font-weight-bold">{service.title}</h4>
            <p className="lead">{service.description}</p>
        </div>
    </>);
}

export default Service;