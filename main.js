// Data Structure
const CATEGORIES = {
    free: [
        {
            name: "AI 생산성 도구",
            sub: ["개인 비서", "연구", "스프레드시트", "번역기", "프레젠테이션"]
        },
        {
            name: "AI 비디오 도구",
            sub: ["비디오 향상기", "비디오 편집", "비디오 생성기", "텍스트를 비디오로 변환"]
        },
        {
            name: "AI 텍스트 생성기",
            sub: ["프롬프트 생성기", "글쓰기 생성기", "의역", "이야기꾼", "카피라이팅"]
        },
        {
            name: "AI 비즈니스 도구",
            sub: ["웹사이트 제작 도구", "마케팅", "금융", "프로젝트 관리", "소셜 미디어"],
            features: {
                "웹사이트 제작 도구": {
                    title: "웹 자동 배포",
                    id: "web-auto-deploy"
                }
            }
        },
        {
            name: "AI 이미지 도구",
            sub: ["디자인 생성기", "이미지 생성기", "이미지 편집", "텍스트를 이미지로 변환"]
        },
        {
            name: "자동화 도구",
            sub: ["워크플로", "AI 에이전트"]
        },
        {
            name: "AI 아트 생성기",
            sub: ["만화 생성기", "인물 사진 생성기", "아바타", "로고 생성기", "3D"]
        },
        {
            name: "AI 오디오 생성기",
            sub: ["오디오 편집", "텍스트 음성 변환", "음악", "전사자"]
        },
        {
            name: "기타 AI 도구",
            sub: ["피트니스", "종교", "학생", "패션", "선물 아이디어"]
        },
        {
            name: "AI 코드 도구",
            sub: ["코드 도우미", "로우코드/노코드", "SQL"]
        }
    ],
    paid: [
        // Categories can be duplicated or different for paid
        {
            name: "AI 프리미엄 도구",
            sub: ["전문가용 편집", "엔터프라이즈 솔루션"]
        }
    ]
};

// SVG Icons
const ICONS = {
    github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
    firebase: `<svg viewBox="0 0 24 24" fill="#FFCA28"><path d="M3.89 15.67L5.7 4.57c.05-.28.22-.52.48-.64.26-.11.55-.09.78.05l2.03 1.26 2.14-4.05c.13-.25.39-.4.67-.4s.54.15.67.4l2.14 4.05 2.03-1.26c.23-.14.52-.16.78-.05.26.12.43.36.48.64l1.81 11.1c.05.32-.05.65-.27.89-.22.24-.54.38-.87.38H5.03c-.33 0-.65-.14-.87-.38-.22-.24-.32-.57-.27-.89z"/></svg>`,
    cloudflare: `<svg viewBox="0 0 24 24" fill="#F38020"><path d="M12.4 12.4c-.1.1-.1.2-.1.3 0 .1.1.2.2.3.1 0 .2.1.3.1.1 0 .2-.1.3-.2l1.4-1.4c.1-.1.1-.2.1-.3 0-.1-.1-.2-.2-.3-.1 0-.2-.1-.3-.1-.1 0-.2.1-.3.2l-1.4 1.4zm6.6-6.6c-1-1-2.4-1.6-3.9-1.6-2.5 0-4.6 1.6-5.4 3.9-.4-.2-.8-.3-1.3-.3-1.7 0-3 1.3-3 3 0 .2 0 .4.1.6C3.1 12 1.5 14.1 1.5 16.5c0 3 2.5 5.5 5.5 5.5h11c3 0 5.5-2.5 5.5-5.5 0-3-2.5-5.5-5.5-5.5-.3 0-.6 0-.9.1 0-2.4-1.8-4.3-4.1-4.3z"/></svg>`,
    gemini: `<svg viewBox="0 0 24 24" fill="#4285F4"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>` // Simplified Gemini placeholder
};

// UI Elements
const level1Nav = document.getElementById('level1');
const categoriesContainer = document.getElementById('categories-container');
const detailView = document.getElementById('detail-view');
const detailContent = document.getElementById('detail-content');
const backBtn = document.getElementById('back-btn');

// State
let currentTab = 'free';

// Initialize
function init() {
    renderCategories(currentTab);
    
    level1Nav.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-btn')) {
            const tabs = level1Nav.querySelectorAll('.nav-btn');
            tabs.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            currentTab = e.target.dataset.id;
            renderCategories(currentTab);
            hideDetail();
        }
    });

    backBtn.addEventListener('click', hideDetail);
}

function renderCategories(tab) {
    categoriesContainer.innerHTML = '';
    const cats = CATEGORIES[tab];

    cats.forEach(cat => {
        const row = document.createElement('div');
        row.className = 'category-row';
        
        let subButtons = cat.sub.map(s => `<button class="sub-btn">${s}</button>`).join('');
        
        row.innerHTML = `
            <h2>${cat.name}</h2>
            <div class="subcategory-grid">
                ${subButtons}
            </div>
        `;

        // Check for specific features (like Web Auto Deploy)
        if (cat.features) {
            for (const subName in cat.features) {
                const feature = cat.features[subName];
                const featBtn = document.createElement('button');
                featBtn.className = 'feature-btn';
                featBtn.innerHTML = `
                    <h3>${feature.title}</h3>
                    <div class="icon-stack">
                        ${ICONS.cloudflare}
                        <span class="icon-plus">+</span>
                        ${ICONS.firebase}
                        <span class="icon-plus">+</span>
                        ${ICONS.gemini}
                        <span class="icon-plus">+</span>
                        ${ICONS.github}
                    </div>
                    <p style="margin-top: 1rem; color: #64748B;">클릭하여 자동 배포 시스템 구축 방법 알아보기</p>
                `;
                featBtn.addEventListener('click', () => showDetail(feature.id));
                row.appendChild(featBtn);
            }
        }

        categoriesContainer.appendChild(row);
    });
}

function showDetail(id) {
    if (id === 'web-auto-deploy') {
        renderWebAutoDeploy();
    }
    categoriesContainer.classList.add('hidden');
    level1Nav.classList.add('hidden');
    detailView.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function hideDetail() {
    detailView.classList.add('hidden');
    categoriesContainer.classList.remove('hidden');
    level1Nav.classList.remove('hidden');
}

function renderWebAutoDeploy() {
    detailContent.innerHTML = `
        <div class="hero-section">
            <h2>🎯 코드 한 번 푸시하면 자동으로 배포되는 개발 시스템 만들기</h2>
            <p>GitHub + Gemini CLI + Firebase + Cloudflare로 완전 자동 배포 파이프라인 구축</p>
        </div>

        <section class="structure-section">
            <h3 style="font-size: 1.5rem; margin-bottom: 1.5rem;">2. 전체 구조 설명</h3>
            <div class="structure-grid">
                <div class="structure-card">
                    <h4>GitHub</h4>
                    <p>코드 저장소 & 버전 관리</p>
                </div>
                <div class="structure-card">
                    <h4>Gemini CLI</h4>
                    <p>AI 코드 생성 & 자동화 비서</p>
                </div>
                <div class="structure-card">
                    <h4>Firebase</h4>
                    <p>백엔드, 앱 호스팅 & 서비스 운영</p>
                </div>
                <div class="structure-card">
                    <h4>Cloudflare</h4>
                    <p>배포 최적화, CDN & 도메인 연결</p>
                </div>
            </div>
        </section>

        <section class="workflow-section">
            <h3 style="font-size: 1.5rem; margin-bottom: 1.5rem;">3. 동작 흐름</h3>
            <div class="workflow-step">
                <div class="step-number">1</div>
                <div>
                    <strong>Gemini CLI로 코드 생성</strong>
                    <p>AI가 프론트/백엔드 코드를 자동으로 생성합니다.</p>
                </div>
            </div>
            <div class="workflow-step">
                <div class="step-number">2</div>
                <div>
                    <strong>GitHub에 코드 업로드 (Push)</strong>
                    <p>코드를 저장소에 올리는 순간, 배포 이벤트가 발생합니다.</p>
                </div>
            </div>
            <div class="workflow-step">
                <div class="step-number">3</div>
                <div>
                    <strong>Firebase에서 자동 빌드 & 실행</strong>
                    <p>DB, 인증, 서버 기능이 자동으로 연결되고 빌드됩니다.</p>
                </div>
            </div>
            <div class="workflow-step">
                <div class="step-number">4</div>
                <div>
                    <strong>Cloudflare가 배포 + CDN 처리</strong>
                    <p>전 세계 사용자에게 가장 빠른 속도로 서비스를 제공합니다.</p>
                </div>
            </div>
        </section>

        <section class="video-section">
            <h3 style="font-size: 1.5rem; margin-bottom: 1.5rem;">📺 실습 가이드 영상</h3>
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/dW1HP15_YUM?start=74" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </section>
    `;
}

init();
