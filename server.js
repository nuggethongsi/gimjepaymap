require('dotenv').config(); // .env 파일 로드

const express = require('express');
const path = require('path'); // path 모듈 로드
const app = express();

// .env 파일에서 API 키 가져오기
const KAKAO_API_KEY = process.env.KAKAO_API_KEY;
const NAVER_API_KEY = process.env.NAVER_API_KEY;

// 정적 파일 제공
app.use(express.static('public'));

// EJS 설정
app.set('view engine', 'ejs');

// views 폴더 경로를 절대 경로로 설정
app.set('views', path.join(__dirname, 'views')); // 절대 경로 설정

// 기본 라우트
app.get('/', (req, res) => {
    res.render('index', {
        kakaoApiKey: KAKAO_API_KEY, // 카카오 API 키 전달
        naverApiKey: NAVER_API_KEY, // 네이버 API 키 전달
    });
});

// Vercel에서 서버리스로 처리하므로 app.listen을 제거하고, app을 export함
module.exports = app;
