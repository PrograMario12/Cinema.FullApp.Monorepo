import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { logout } = useAuth();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p>Welcome to the admin panel.</p>
            <button onClick={logout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
