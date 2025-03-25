// pages/login.js
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState('');

  const correctPassword = 'weiwei'; // 你可以自定义密码

  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止表单默认刷新
    if (password === correctPassword) {
      sessionStorage.setItem('loggedIn', 'true');
      router.replace('/');
    } else {
      alert('密码错误，请重试');
    }
  };

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>🔒登録</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="パスワードを入力してください"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', width: '200px' }}
        />
        <br /><br />
        <button type="submit" style={{ padding: '10px 20px' }}>ログイン</button>
        <br /><br />
        <button type="button" onClick={() => window.location.href = 'https://nissin-shouji.vercel.app/'}>
          ホームページに戻る
        </button>
      </form>
    </div>
  );
}
