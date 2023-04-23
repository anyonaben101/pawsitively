import TeamMate from "./TeamMate";

function Team({ members }) {
    return (
        <>
            <h4 className='text-center font-weight-bold'>Our team</h4>
            <p className='text-center lead'>Dedicated to quality and finding the best for pets</p>
            <div className='row mt-5'>
                {members.map((member, index) => (
                    <div key={index} className='col-md-2 px-4 text-center'>
                        <TeamMate name={member.name} role={member.role} imagePath={member.imagePath} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Team;