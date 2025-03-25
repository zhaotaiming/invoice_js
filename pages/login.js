// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const correctPassword = 'weiwei'; // 可以自己修改密码

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      localStorage.setItem('loggedIn', 'true'); // 登录标记
      router.push('/'); // 跳转到主页
    } else {
      setError('密码错误，请重试！');
    }
  };

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>🔐認証</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="请输入密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '8px', fontSize: '16px' }}
        />
        <br /><br />
        <button type="submit" style={{ padding: '10px 20px' }}>
          登录
        </button>
      </form>

            {/* 🔙 返回按钮 */}
      <button
        onClick={() => window.location.href = 'https://www.4399.com/'}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#888',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        ホームページに戻る
      </button>



      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
