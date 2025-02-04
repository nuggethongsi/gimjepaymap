require('dotenv').config(); // .env 파일 로드

const express = require('express');
const path = require('path');
const app = express();

// .env 파일에서 API 키 가져오기
const KAKAO_API_KEY = process.env.KAKAO_API_KEY;
const NAVER_API_KEY = process.env.NAVER_API_KEY;

// 정적 파일 제공 (절대 경로 설정, '/public' 경로는 없이 public 폴더 서빙)
app.use(express.static(path.join(__dirname, 'public'))); // public 폴더 서빙

// EJS 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // views 폴더 절대 경로 설정

// 기본 라우트
app.get('/', (req, res) => {
    res.render('index', {
        kakaoApiKey: KAKAO_API_KEY, // 카카오 API 키 전달
        naverApiKey: NAVER_API_KEY, // 네이버 API 키 전달
    });
});

// data.js MIME 타입 오류 방지 (절대 경로로 서빙)
app.get('/data/data.js', (req, res) => {
    const dataPath = path.join(__dirname, 'public/data/data.js');
    res.type('application/javascript');
    res.sendFile(dataPath, (err) => {
        if (err) {
            console.error(`Error serving data.js: ${err.message}`);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Vercel에서 서버리스로 처리하므로 app.listen을 제거하고, app을 export함
module.exports = app;
