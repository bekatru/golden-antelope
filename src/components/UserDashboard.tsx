import { useAuth } from "../hooks/useAuth";

const UserDashboard = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <div>No user information available.</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      {user.photo && user.name && <img src={user.photo} alt={user.name} width="100" />}
      <p>Email: {user.email}</p>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
};

export default UserDashboard;