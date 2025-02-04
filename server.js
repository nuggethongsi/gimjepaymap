require('dotenv').config(); // .env 파일 로드

const express = require('express');
const app = express();
const port = 3000;

// API 키가 정상적으로 로드되는지 확인
console.log('✅ Kakao API Key:', process.env.KAKAO_API_KEY);
console.log('✅ Naver API Key:', process.env.NAVER_API_KEY);

// 정적 파일 제공
app.use(express.static('public'));

// EJS 설정
app.set('view engine', 'ejs');
app.set('views', './views');

// 기본 라우트
app.get('/', (req, res) => {
    res.render('index', {
        kakaoApiKey: process.env.KAKAO_API_KEY, // 카카오 API 키 전달
        naverApiKey: process.env.NAVER_API_KEY, // 네이버 API 키 전달
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
