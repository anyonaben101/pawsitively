function support() {
    return (<>
        <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto mt-5 shadow p-3">
                    <h1 className="display-4 font-weight-bold text-center">Get in touch</h1>
                    <p className="lead text-center">We'd love to hear from you</p>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea className="form-control" id="message" rows="3"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </>);
}

export default support;