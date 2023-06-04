// pages/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:8000/login?username=${username}&password=${password}`,
    {method: 'POST'});
    const data = await response.json();

    if (data.Status === 'Login Success!') {
      // This is where you would handle a successful login
      // For example, redirecting to a new page:
      router.push('/');
    } else {
      // And here is where you would handle a failed login attempt
      alert(data.Status);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;