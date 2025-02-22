import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const squadMembers = [
  {
    name: "Shadow",
    role: "Sniper",
    avatar: "https://i.pravatar.cc/150?img=1",
    rank: "Elite",
  },
  {
    name: "Vortex",
    role: "Strategist",
    avatar: "https://i.pravatar.cc/150?img=2",
    rank: "Master",
  },
  {
    name: "Blaze",
    role: "Assault",
    avatar: "https://i.pravatar.cc/150?img=3",
    rank: "Veteran",
  },
  {
    name: "Ghost",
    role: "Stealth",
    avatar: "https://i.pravatar.cc/150?img=4",
    rank: "Pro",
  },
];

export default function MySquadPage() {
  const [motto, setMotto] = useState("Together, We Conquer!");

  return (
    <div
      className="container py-5 text-white"
      style={{ backgroundColor: "#121212", minHeight: "100vh" }}
    >
      <h2 className="text-center mb-4">⚡ My Squad ⚡</h2>
      <div className="text-center text-muted mb-4">
        <em>"{motto}"</em>
      </div>

      <div className="row g-4 justify-content-center">
        {squadMembers.map((member, index) => (
          <div key={index} className="col-md-5">
            <div className="card bg-dark text-white p-3 shadow border border-secondary">
              <div className="d-flex align-items-center">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="rounded-circle me-3"
                  width="60"
                  height="60"
                />
                <div>
                  <h5 className="mb-1">{member.name}</h5>
                  <p className="mb-1 text-muted">{member.role}</p>
                  <span className="badge bg-primary">{member.rank}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={() => setMotto("Legends Never Die!")}
          className="btn btn-primary"
        >
          Change Motto
        </button>
      </div>
    </div>
  );
}
