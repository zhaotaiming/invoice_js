import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== 'undefined') {
      const isLoggedIn = sessionStorage.getItem('loggedIn'); // ✅ 改成 sessionStorage
      if (isLoggedIn !== 'true') {
        router.push('/login');
        return;
      }

      const interval = setInterval(() => {
        if (window.addRows && window.loadFontData) {
          window.loadFontData();
          window.addRows(10);
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, []);

  if (!isClient) return null;

  return (
    <>
      <Head>
        <title>請求書作成</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.9/xlsx.full.min.js" defer></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" defer></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.13/jspdf.plugin.autotable.min.js" defer></script>
        <script src="/invoice.js" defer></script>
      </Head>

      <div className="nav">
        <a className="logo" href="https://nissin-shouji.vercel.app/">返回主页</a>
        <div className="title">請求書生成</div>
      </div>

      <div id="infoForm">
        <div className="information">相手の名前（必須）:</div>
        <input type="text" id="userName" name="userName" /><br /><br />

        <div className="information">請求日（必須）:</div>
        <input type="date" id="date" name="date" /><br /><br />

        <div className="information">郵便番号:</div>
        <input type="text" id="postalCode" name="postalCode" /><br /><br />

        <div className="information">地址1(必須):</div>
        <input type="text" id="address1" name="address1" /><br /><br />

        <div className="information">地址2:</div>
        <input type="text" id="address2" name="address2" /><br /><br />

        <div className="information">地址3:</div>
        <input type="text" id="address3" name="address3" /><br /><br />

        <div className="information">電話番号（必須）:</div>
        <input type="text" id="phoneNumber" name="phoneNumber" /><br /><br />

        <div id="inputRows">
          {/* 动态输入行将由 JS 添加 */}
        </div>

        <button type="button" onClick={() => window.addRows?.(5)} className="more">更多</button>

        <label htmlFor="note">備考欄:</label>
        <textarea id="note" name="note" rows="4" cols="50"></textarea><br /><br />

        <button type="button" onClick={() => window.generatePDF1?.()}>PDFを生成</button>
        <button type="button" onClick={() => window.generatePDF2?.()}>PDFを生成(登録番号なし)</button>
        <button type="button" onClick={() => window.exportToExcel?.()}>导出 Excel</button>
      </div>
    </>
  );
}
