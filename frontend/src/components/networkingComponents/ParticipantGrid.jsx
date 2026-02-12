import ParticipantCard from "./ParticipantCard";

function ParticipantGrid({ participants }) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {participants.map(user => (
                <ParticipantCard key={user.id} user={user} />
            ))}
        </div>
    );
}

export default ParticipantGrid;
