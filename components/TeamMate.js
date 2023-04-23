function TeamMate({ name, role, imagePath }) {
    return (
        <>
            <img className="img-fluid rounded-circle shadow" src={imagePath} alt={name + `'s avator`} />
            <h5 className="mt-3 font-weight-bold">{name}</h5>
            <p className="lead">{role}</p>
        </>
    );
}

export default TeamMate;