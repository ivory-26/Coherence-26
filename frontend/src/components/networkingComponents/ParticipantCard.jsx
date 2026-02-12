function ParticipantCard({ user }) {
    return (
        <div className="bg-zinc-800 p-5 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-400">{user.college}</p>
            <p className="mt-2 text-sm">{user.bio}</p>

            <div className="flex gap-4 mt-4">
                {user.linkedin && (
                    <a href={user.linkedin} target="_blank" rel="noreferrer"
                        className="text-blue-400 underline">
                        LinkedIn
                    </a>
                )}
                {user.github && (
                    <a href={user.github} target="_blank" rel="noreferrer"
                        className="text-gray-300 underline">
                        GitHub
                    </a>
                )}
            </div>
        </div>
    );
}

export default ParticipantCard;
