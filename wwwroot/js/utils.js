// utils.js - General utility functions

export const SIDEBAR_HTML = `
    <div class="sidebar">
        <div class="logo">
            <i class="fa-solid fa-graduation-cap"></i>
            <span>NineEdu</span>
        </div>
        <ul class="nav-links">
            <li class="active"><a href="/" data-page="index"><i class="fa-solid fa-house"></i> <span>Tổng quan</span></a></li>
            <li><a href="/Home/Tuition" data-page="tuition"><i class="fa-solid fa-wallet"></i> <span>Học phí</span></a></li>
            <li><a href="/Home/Schedule" data-page="schedule"><i class="fa-solid fa-calendar-days"></i> <span>Lịch học</span></a></li>
            <li><a href="/Home/Chat" data-page="chat"><i class="fa-solid fa-comment-dots"></i> <span data-i18n="chat">Liên hệ</span></a></li>
            <li><a href="/Home/News" data-page="news"><i class="fa-solid fa-newspaper"></i> <span data-i18n="news">Bản tin</span></a></li>
        </ul>

        <div class="sidebar-footer">
            <div class="footer-actions">
                <button class="icon-btn" id="themeToggle" title="Chế độ tối/sáng">
                    <i class="fa-solid fa-moon"></i>
                </button>
                <button class="icon-btn" id="notificationBtn" title="Thông báo">
                    <i class="fa-solid fa-bell"></i>
                </button>
                <button class="icon-btn" id="settingsBtn" title="Cài đặt">
                    <i class="fa-solid fa-gear"></i>
                </button>
            </div>

            <div class="lang-selector">
                <button class="lang-btn" data-lang="vi" title="Tiếng Việt">VN</button>
                <div class="lang-divider"></div>
                <button class="lang-btn" data-lang="en" title="English">EN</button>
            </div>
            <div class="user-info">
                <img src="https://i.pravatar.cc/150?img=12" alt="Parent">
                <div class="user-text">
                    <p class="user-name">Phụ huynh</p>
                    <button class="logout-btn" id="logoutBtn">
                        <i class="fa-solid fa-right-from-bracket"></i>
                        <span data-i18n="logout">Đăng xuất</span>
                    </button>
                </div>
            </div>
        </div>


    </div>
`;

export function injectSidebar() {
    const container = document.getElementById('sidebar-container');
    if (!container) return;
    container.innerHTML = SIDEBAR_HTML;

    // Active link logic
    const currentPath = window.location.pathname.split('/').pop() || '/';
    const navLinks = container.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.parentElement.classList.remove('active'); 
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '/' && href === '/')) {
            link.parentElement.classList.add('active');
        }
    });

    // Logout listener
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            import('./auth.js').then(m => m.logout());
        };
    }

    // Child Selector initialization
    const childSelector = document.getElementById('childSelector');
    if (childSelector) {
        import('./data.js').then(m => {
            renderChildSelector(childSelector, m.studentsData, m.getActiveStudent, m.setActiveStudent);
        });
    }

    // i18n initialization
    import('./i18n.js').then(m => {
        m.translatePage();
        const btns = container.querySelectorAll('.lang-btn');
        const currentLang = m.getLang();
        btns.forEach(btn => {
            if (btn.getAttribute('data-lang') === currentLang) btn.classList.add('active');
            btn.onclick = () => m.setLang(btn.getAttribute('data-lang'));
        });
    });
}


export function renderChildSelector(container, studentsData, getActiveStudent, setActiveStudent) {
    container.innerHTML = '';
    const activeStudent = getActiveStudent();
    if (!activeStudent) return;
    const activeStudentId = activeStudent.id;
    
    studentsData.forEach(student => {
        const img = document.createElement('img');
        img.src = student.avatar;
        img.className = 'child-avatar ' + (student.id === activeStudentId ? 'active' : '');
        img.title = student.name;
        img.onclick = () => {
            setActiveStudent(student.id);
            renderChildSelector(container, studentsData, getActiveStudent, setActiveStudent);
        };
        container.appendChild(img);
    });
}


export function initTheme() {
    const isDark = localStorage.getItem('theme') === 'dark';
    if (isDark) document.documentElement.setAttribute('data-theme', 'dark');
}

export function setText(id, text) { 
    const el = document.getElementById(id); 
    if (el) el.innerText = text; 
}

export function setTrend(id, trendObj) {
    const el = document.getElementById(id);
    if (el && trendObj) {
        el.className = `stat-trend ${trendObj.type}`;
        const icon = trendObj.type === 'success' ? 'fa-caret-up' : (trendObj.type === 'danger' ? 'fa-caret-down' : 'fa-minus');
        el.innerHTML = `<i class="fa-solid ${icon}"></i> ${trendObj.text}`;
    }
}

export function renderList(containerId, dataArray, renderFn, emptyMsg) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    if (!dataArray || dataArray.length === 0) {
        container.innerHTML = `<div class="empty-state"><i class="fa-regular fa-folder-open"></i><p>${emptyMsg}</p></div>`;
        return;
    }
    dataArray.forEach((item, index) => { 
        container.insertAdjacentHTML('beforeend', renderFn(item, index)); 
    });
}

