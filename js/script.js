   // Initialize AOS (Animate On Scroll)
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-in-out'
        });

        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeToggleMobile = document.getElementById('themeToggleMobile');
        const body = document.body;

        function toggleTheme() {
            body.classList.toggle('dark');
            const isDark = body.classList.contains('dark');
            
            // Update theme icon
            const themeIcons = document.querySelectorAll('.theme-toggle i');
            themeIcons.forEach(icon => {
                icon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
            });
            
            // Save preference to localStorage
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }

        themeToggle.addEventListener('click', toggleTheme);
        themeToggleMobile.addEventListener('click', toggleTheme);

        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.remove('dark');
            document.querySelectorAll('.theme-toggle i').forEach(icon => {
                icon.className = 'fas fa-sun';
            });
        }

        // Mobile Navigation
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileNav = document.getElementById('mobileNav');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        const navLinks = document.querySelectorAll('.nav-link');

        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('show');
        });

        // Close mobile nav when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('show');
                
                // Update active state
                updateActiveNav(link.getAttribute('href'));
            });
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileNav.classList.remove('show');
            }
        });

        // Active Navigation State
        function updateActiveNav(targetId) {
            // Update desktop nav
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === targetId) {
                    link.classList.add('active');
                }
            });
            
            // Update mobile nav
            mobileNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === targetId) {
                    link.classList.add('active');
                }
            });
        }

        // Set active nav on page load
        window.addEventListener('load', () => {
            const currentHash = window.location.hash || '#home';
            updateActiveNav(currentHash);
        });

        // Update active nav on scroll
        const sections = document.querySelectorAll('section');
        const navLinksAll = document.querySelectorAll('.nav-link, .mobile-nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - 200) {
                    current = '#' + section.getAttribute('id');
                }
            });

            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === current) {
                    link.classList.add('active');
                }
            });
        });

        // Language Switcher
        const langButtons = document.querySelectorAll('.lang-switcher button');
        const translations = {
            id: {
                // Navigation
                'nav.home': 'Beranda',
                'nav.about': 'Tentang',
                'nav.skills': 'Keahlian',
                'nav.projects': 'Proyek',
                'nav.experience': 'Pengalaman',
                'nav.contact': 'Kontak',

                // Hero
                'hero.title': 'Desain dan Pengembangan Aplikasi Web yang Skalabel',
                'hero.desc': 'Saya <span style="color: var(--primary-cyan); font-weight: 600;">Muhamad Irsal</span>, Pengembang Fullstack yang membangun sistem web yang skalabel dengan antarmuka pengguna modern dan arsitektur backend yang kokoh.',
                'hero.badge.web': 'Fullstack Developer',
                'hero.badge.uiux': 'UI/UX Designer',
                'hero.badge.video': 'Video Editor',
                'hero.badge.creative': 'Creative Technologist',
                'hero.btn.projects': '<i class="fas fa-rocket"></i> Lihat Proyek',
                'hero.btn.cv': '<i class="fas fa-download"></i> Unduh CV',

                // About
                'about.title': 'Tentang Saya',
                'about.subtitle': 'Merancang solusi digital dengan semangat dan presisi',
                'about.role': 'Arsitek Digital Kreatif',
                'about.desc1': 'Dengan keahlian yang mencakup pengembangan web, editing video, dan desain grafis, saya menciptakan pengalaman digital yang secara visual menakjubkan dan secara fungsional kuat. Pendekatan saya menggabungkan presisi teknis dengan inovasi kreatif.',
                'about.desc2': 'Saat ini berperan sebagai mentor di Wowlab, saya membimbing siswa Jepang dalam menavigasi industri IT dan mempersiapkan karir teknologi internasional. Peran ini memungkinkan saya untuk berbagi pengetahuan sambil tetap berada di garis depan kemajuan teknologi.',
                'about.exp1': 'Lebih dari 1 Tahun',
                'about.exp': 'Pengalaman Profesional',
                'about.project1': 'Lebih dari 10 Proyek',
                'about.project': 'Berhasil Disampaikan',

                // Skills
                'skills.title': 'Keahlian Teknis',
                'skills.subtitle': 'Menguasai alat dan teknologi yang mendukung pengalaman digital modern',
                'skills.frontend': 'Pengembangan Frontend',
                'skills.backend': 'Backend & Database',
                'skills.creative': 'Desain Kreatif',

                // Projects
                'projects.title': 'Proyek Unggulan',
                'projects.subtitle': 'Memamerkan solusi inovatif yang memadukan kreativitas dengan teknologi',
                'projects.p1.title': 'Portofolio Interaktif 3D',
                'projects.p1.desc': 'Website portofolio modern dengan elemen 3D, efek glassmorphism, dan animasi yang halus.',
                'projects.p2.title': 'Sistem Manajemen Toko Roti',
                'projects.p2.desc': 'Solusi lengkap manajemen inventaris dan penjualan dengan dashboard analitik real-time.',
                'projects.p3.title': 'Mentoring Karir IT',
                'projects.p3.desc': 'Program mentoring komprehensif untuk mempersiapkan siswa untuk karir IT internasional.',
                'projects.p4.title': 'Undangan Pernikahan',
                'projects.p4.desc': ' Situs web undangan pernikahan digital dengan desain modern dan responsif, menampilkan detail acara, lokasi, galeri, hitung mundur, dan konfirmasi kehadiran tamu.',
                'projects.p5.title': 'Management Keuangan',
                'projects.p5.desc': 'Situs web berbasis web untuk pengelolaan keuangan yang memungkinkan pelacakan pendapatan dan pengeluaran, pengelolaan kategori transaksi, serta pemantauan ringkasan dan laporan keuangan.',
                'projects.p6.title': 'Situs Web Perabotan',
                'projects.p6.desc': ' Situs web katalog furnitur dengan fitur manajemen produk dan antarmuka profesional untuk mendukung promosi bisnis online.',
                'projects.p7.title': 'International School Website',
                'projects.p7.desc': 'A responsive website for an international school with features like student information, course management, and event calendar.',
                'projects.p8.title': 'Sistem Manajemen Absensi QR Code',
                'projects.p8.desc': 'Sistem manajemen absensi berbasis QR Code yang memungkinkan pengguna untuk memindai dan mencatat kehadiran secara real-time.',
                'projects.p9.title': 'Undangan RZ · Acara Korporat',
                'projects.p9.desc': 'Platform undangan digital modern dan responsif untuk Grand Opening & Gala Tahunan 2026 RZ Group, dirancang khusus untuk klien korporat dan mitra bisnis.',
                'projects.p10.title': 'Situs Web Klinik Kecantikan',
                'projects.p10.desc': 'Situs web klinik kecantikan modern dan responsif yang dirancang untuk menampilkan layanan, perawatan, dokter, dan informasi klinik dengan antarmuka pengguna yang bersih dan profesional.',
                'projects.p11.title': 'Paris Technic – Platform Layanan AC Profesional',
                'projects.p11.desc': 'Situs web front-end yang sepenuhnya responsif untuk Paris Teknik AC, dikembangkan menggunakan HTML, CSS, dan JavaScript, dilengkapi dengan komponen antarmuka pengguna interaktif, pengguliran yang halus, integrasi API WhatsApp, dan tata letak yang dioptimalkan untuk kinerja.',
                'All.filter.subtitle': 'Semua proyek',
                'Website.filter.subtitle': 'Situs web',
                'Application.filter.subtitle': 'Aplikasi',
                'Sertification.filter.subtitle': 'Sertifikasi',

                // Experience
                'experience.title': 'Pengalaman & Pendidikan',
                'experience.subtitle': 'Perjalanan saya melalui teknologi dan pendidikan',
                'experience.e1.role': 'Mentor & Edukator IT',
                'experience.e1.company': ' Magang Wowlab Jepang',
                'experience.e1.date': '2025 - Sekarang',
                'experience.e1.desc': 'Membimbing siswa Jepang dalam pengembangan karir IT dan keterampilan teknis.',
                'experience.e2.role': 'Full Stack Developer',
                'experience.e2.company': 'Freelance & Kontrak',
                'experience.e2.date': '2023 - Sekarang',
                'experience.e2.desc': 'Mengembangkan aplikasi web dan solusi digital untuk berbagai klien.',
                'experience.e3.role': 'Sarjana Teknologi Informasi',
                'experience.e3.company': 'Lulusan Universitas',
                'experience.e3.date': '2021 - 2025',
                'experience.e3.desc': 'Spesialisasi dalam teknologi web dan pengembangan perangkat lunak.',

                // Contact
                'contact.title': 'Hubungi Saya',
                'contact.subtitle': 'Mari ciptakan sesuatu yang luar biasa bersama',
                'contact.email': 'Email',
                'contact.phone': 'Telepon / WhatsApp',
                'contact.location': 'Lokasi',
                'contact.form.title': 'Kirim Pesan',
                'contact.form.name': 'Nama Anda',
                'contact.form.mail': 'Alamat Email',
                'contact.form.Subject': 'Subjek',
                'contact.form.message': 'Pesan Anda',
                'contact.form.btn': '<i class="fas fa-paper-plane"></i> Kirim Pesan',
                'contact.connect': 'Hubungi Saya',

                // Footer
                'footer.desc': 'Menciptakan pengalaman digital yang luar biasa melalui pengembangan web inovatif dan solusi desain kreatif.',
                'footer.links': 'Tautan Cepat',
                'footer.quickslink.home': 'Beranda',
                'footer.quickslink.About': 'Tentang',
                'footer.quickslink.Projects': 'Proyek',
                'footer.quickslink.Contact': 'Kontak',
                'footer.services': 'Layanan',
                'footer.service.web': 'Pengembangan Web',
                'footer.service.uiux': 'Desain UI/UX',
                'footer.service.video': 'Produksi Video',
                'footer.service.consult': 'Konsultasi IT'
            },
            en: {
                // Navigation
                'nav.home': 'Home',
                'nav.about': 'About',
                'nav.skills': 'Skills',
                'nav.projects': 'Projects',
                'nav.experience': 'Experience',
                'nav.contact': 'Contact',

                // Hero
                'hero.title': 'Designing and Developing Scalable Web Applications',
                'hero.desc': 'I\'m <span style="color: var(--primary-cyan); font-weight: 600;">Muhamad Irsal</span>, Fullstack Developer building scalable web systems with modern UI and solid backend architecture.',
                'hero.badge.web': 'Fullstack Developer',
                'hero.badge.uiux': 'UI/UX Designer',
                'hero.badge.video': 'Video Editor',
                'hero.badge.creative': 'Creative Technologist',
                'hero.btn.projects': '<i class="fas fa-rocket"></i> View Projects',
                'hero.btn.cv': '<i class="fas fa-download"></i> Download CV',

                // About
                'about.title': 'About Me',
                'about.subtitle': 'Crafting digital solutions with passion and precision',
                'about.role': 'Creative Digital Architect',
                'about.desc1': 'With expertise spanning web development, video editing, and graphic design, I create digital experiences that are both visually stunning and functionally robust. My approach combines technical precision with creative innovation.',
                'about.desc2': 'Currently serving as a mentor at Wowlab, I guide Japanese students in navigating the IT industry and preparing for international tech careers. This role allows me to share knowledge while staying at the forefront of technological advancements.',
                'about.exp1': '1+ Years',
                'about.exp': 'Professional Experience',
                'about.project1': '10+ Projects',
                'about.project': 'Successfully Delivered',

                // Skills
                'skills.title': 'Technical Expertise',
                'skills.subtitle': 'Mastering the tools and technologies that power modern digital experiences',
                'skills.frontend': 'Frontend Development',
                'skills.backend': 'Backend & Database',
                'skills.creative': 'Creative Design',

                // Projects
                'projects.title': 'Featured Projects',
                'projects.subtitle': 'Showcasing innovative solutions that blend creativity with technology',
                'projects.p1.title': '3D Interactive Portfolio',
                'projects.p1.desc': 'Modern portfolio website with 3D elements, glassmorphism effects, and smooth animations.',
                'projects.p2.title': 'Bakery Management System',
                'projects.p2.desc': 'Complete inventory and sales management solution with real-time analytics dashboard.',
                'projects.p3.title': 'IT Career Mentorship',
                'projects.p3.desc': 'Comprehensive mentorship program preparing students for international IT careers.',
                'projects.p4.title': 'Invitation Wedding',
                'projects.p4.desc': '  A digital wedding invitation website with a modern, responsive design, featuring event details, location, gallery, countdown, and guest RSVP.',
                'projects.p5.title': 'Financial Management',
                'projects.p5.desc': 'A web-based website for financial management that allows tracking of income and expenses, management of transaction categories, and monitoring of financial summaries and reports.',
                'projects.p6.title': 'Furniture Website',
                'projects.p6.desc': 'A furniture catalog website with product management features and a professional interface to support online business promotion.',
                'projects.p7.title': 'International School Website',
                'projects.p7.desc': 'A responsive website for an international school with features like student information, course management, and event calendar.',
                'projects.p8.title': 'QR Code Attendance Management System',
                'projects.p8.desc': 'A QR Code-based attendance management system that allows users to scan and record attendance in real-time.',
                'projects.p9.title': 'RZ Invitation · Corporate Event',
                'projects.p9.desc': 'A modern and responsive digital invitation platform for RZ Groups Grand Opening & Annual Gala 2026, designed for corporate clients and business partners.',
                'projects.p10.title': 'Beauty Clinic Website',
                'projects.p10.desc': 'A modern and responsive beauty clinic website designed to showcase services, treatments, doctors, and clinic information with a clean and professional user interface.',
                'projects.p11.title': 'Paris Technic – Professional AC Service Platform',
                'projects.p11.desc': 'A fully responsive front-end website for Paris AC Technic, developed using HTML, CSS, and JavaScript, featuring interactive user interface components, smooth scrolling, WhatsApp API integration, and a performance-optimized layout.',
                'All.filter.subtitle': 'All Projects',
                'Website.filter.subtitle': 'Website',
                'Application.filter.subtitle': 'Application',
                'Sertification.filter.subtitle': 'Sertification',

                // Experience
                'experience.title': 'Experience & Education',
                'experience.subtitle': 'My journey through technology and education',
                'experience.e1.role': 'IT Mentor & Educator',
                'experience.e1.company': 'Wowlab Japan Intership',
                'experience.e1.date': '2025 - Present',
                'experience.e1.desc': 'Guiding Japanese students in IT career development and technical skills.',
                'experience.e2.role': 'Full Stack Developer',
                'experience.e2.company': 'Freelance & Contract',
                'experience.e2.date': '2023 - Present',
                'experience.e2.desc': 'Developing web applications and digital solutions for various clients.',
                'experience.e3.role': 'Bachelor\'s in Information Technology',
                'experience.e3.company': 'University Graduate',
                'experience.e3.date': '2021 - 2025',
                'experience.e3.desc': 'Specialized in web technologies and software development.',

                // Contact
                'contact.title': 'Get In Touch',
                'contact.subtitle': 'Let\'s create something amazing together',
                'contact.email': 'Email',
                'contact.phone': 'Phone / WhatsApp',
                'contact.location': 'Location',
                'contact.form.title': 'Send a Message',
                'contact.form.name': 'Your Name',
                'contact.form.mail': 'Email Address',
                'contact.form.Subject': 'Subject',
                'contact.form.message': 'Your Message',
                'contact.form.btn': '<i class="fas fa-paper-plane"></i> Send Message',

                // Footer
                'footer.desc': 'Creating exceptional digital experiences through innovative web development and creative design solutions.',
                'footer.links': 'Quick Links',
                'footer.quickslink.home': 'Home',
                'footer.quickslink.About': 'About',
                'footer.quickslink.Projects': 'Projects',
                'footer.quickslink.Contact': 'Contact',
                'footer.services': 'Services',
                'footer.service.web': 'Web Development',
                'footer.service.uiux': 'UI/UX Design',
                'footer.service.video': 'Video Production',
                'footer.service.consult': 'IT Consulting'
            },
            jp: {
                // Navigation
                'nav.home': 'ホーム',
                'nav.about': '私について',
                'nav.skills': 'スキル',
                'nav.projects': 'プロジェクト',
                'nav.experience': '経験',
                'nav.contact': '連絡先',

                // Hero
                'hero.title': 'スケーラブルなWebアプリケーションの設計と開発',
                'hero.desc': '私は<span style="color: var(--primary-cyan); font-weight: 600;">Muhamad Irsal</span>モダンなUIと堅牢なバックエンドアーキテクチャを備えたスケーラブルなウェブシステムを構築するフルスタック開発者。',
                'hero.badge.web': 'ウェブ開発者',
                'hero.badge.uiux': 'UI/UXデザイナー',
                'hero.badge.video': 'ビデオエディター',
                'hero.badge.creative': 'クリエイティブテクノロジスト',
                'hero.btn.projects': '<i class="fas fa-rocket"></i> プロジェクトを見る',
                'hero.btn.cv': '<i class="fas fa-download"></i> CVをダウンロード',

                // About
                'about.title': '私について',
                'about.subtitle': '情熱と精密さでデジタルソリューションを作り上げる',
                'about.role': 'クリエイティブデジタルアーキテクト',
                'about.desc1': 'ウェブ開発、ビデオ編集、グラフィックデザインにまたがる専門知識により、視覚的に魅力的で機能的に堅牢なデジタル体験を作り出します。私のアプローチは技術的な精密さと創造的な革新を組み合わせています。',
                'about.desc2': '現在Wowlabでメンターとして活動し、日本の学生がIT業界をナビゲートし、国際的なテクノロジーキャリアを準備するのを指導しています。この役割により、技術の進歩の最前線に立ちながら知識を共有することができます。',
                'about.exp1': '1年以上',
                'about.exp': '専門的な経験',
                'about.project1': '10以上のプロジェクト',
                'about.project': '成功裏に納品',

                // Skills
                'skills.title': '技術的専門知識',
                'skills.subtitle': '現代のデジタル体験を支えるツールと技術の習得',
                'skills.frontend': 'フロントエンド開発',
                'skills.backend': 'バックエンドとデータベース',
                'skills.creative': 'クリエイティブデザイン',

                // Projects
                'projects.title': '注目のプロジェクト',
                'projects.subtitle': '創造性と技術を融合した革新的なソリューションの紹介',
                'projects.p1.title': '3Dインタラクティブポートフォリオ',
                'projects.p1.desc': '3D要素、グラスモーフィズム効果、滑らかなアニメーションを備えた現代的なポートフォリオウェブサイト。',
                'projects.p2.title': 'ベーカリー管理システム',
                'projects.p2.desc': 'リアルタイム分析ダッシュボードを備えた完全な在庫管理と販売管理ソリューション。',
                'projects.p3.title': 'ITキャリアメンタリング',
                'projects.p3.desc': '学生が国際的なITキャリアを準備するための包括的なメンタリングプログラム。',
                 'projects.p4.title': '結婚式招待ウェブサイト',
                'projects.p4.desc': '  結婚式の情報、会場の場所、ギャラリー、カウントダウン、出欠確認（RSVP）を掲載した、モダンでレスポンシブなウェブサイトです。',
                'projects.p5.title': '財務管理ウェブサイト',
                'projects.p5.desc': '収入と支出を記録し、取引カテゴリを管理し、財務の概要やレポートを確認できるウェブサイトです。',
                 'projects.p6.title': '家具ウェブサイト',
                'projects.p6.desc': '商品カタログや商品管理機能を備えた、家具ビジネス向けのプロフェッショナルなウェブサイトです。',
                'projects.p7.title': '国際学校のウェブサイト',
                'projects.p7.desc': '学生情報、授業管理、イベントカレンダーなどの機能を備えたレスポンシブな国際学校ウェブサイト。',
                'projects.p8.title': 'QRコード出席管理システム',
                'projects.p8.desc': 'ユーザーがリアルタイムで出席をスキャンして記録できるQRコードベースの出席管理システム。',
                'projects.p9.title': 'RZ招待 · 企業イベント',
                'projects.p9.desc': 'RZグループの2026年グランドオープニング＆アニュアルガラのための、企業クライアントやビジネスパートナー向けに設計された、モダンでレスポンシブなデジタル招待プラットフォーム。',
                'projects.p10.title': '美容クリニックのウェブサイト',
                'projects.p10.desc': 'サービス、治療、医師、クリニック情報をクリーンでプロフェッショナルなユーザーインターフェイスで紹介する、モダンでレスポンシブな美容クリニックのウェブサイト。',
                'projects.p11.title': 'Paris Technic – プロフェッショナルACサービスプラットフォーム',
                'projects.p11.desc': 'HTML、CSS、JavaScriptを使用して開発されたParis AC Technicの完全にレスポンシブなフロントエンドウェブサイトで、インタラクティブなユーザーインターフェイスコンポーネント、スムーズなスクロール、WhatsApp API統合、およびパフォーマンス最適化されたレイアウトを特徴としています。',
                'All.filter.subtitle': 'すべてのプロジェクト',
                'Website.filter.subtitle': 'ウェブサイト',
                'Application.filter.subtitle': 'アプリケーション',
                'Sertification.filter.subtitle': '資格',

                // Experience
                'experience.title': '経験と教育',
                'experience.subtitle': 'テクノロジーと教育の私の旅',
                'experience.e1.role': 'ITメンター＆教育者',
                'experience.e1.company': 'ワウラボ・ジャパンインターンシップ',
                'experience.e1.date': '2025年 - 現在',
                'experience.e1.desc': '日本の学生のITキャリア開発と技術スキルを指導。',
                'experience.e2.role': 'フルスタック開発者',
                'experience.e2.company': 'フリーランス＆契約',
                'experience.e2.date': '2023年 - 現在',
                'experience.e2.desc': 'さまざまなクライアント向けのウェブアプリケーションとデジタルソリューションの開発。',
                'experience.e3.role': '情報技術学士',
                'experience.e3.company': '大学卒業生',
                'experience.e3.date': '2021年 - 2025年',
                'experience.e3.desc': 'ウェブ技術とソフトウェア開発を専門。',
                'contact.connect': '私とつながる',

                // Contact
                'contact.title': 'お問い合わせ',
                'contact.subtitle': '一緒に素晴らしいものを作りましょう',
                'contact.email': 'メール',
                'contact.phone': '電話 / WhatsApp',
                'contact.location': '所在地',
                'contact.form.title': 'メッセージを送信',
                'contact.form.name': 'お名前',
                'contact.form.mail': 'メールアドレス',
                'contact.form.Subject': '件名',
                'contact.form.message': 'メッセージ',
                'contact.form.btn': '<i class="fas fa-paper-plane"></i> メッセージを送信',
                'concact.connect.me': '私とつながろう',

                // Footer
                'footer.desc': '革新的なウェブ開発と創造的なデザインソリューションを通じて卓越したデジタル体験を創出します。',
                'footer.links': 'クイックリンク',
                'footer.quickslink.home': 'ホーム',
                'footer.quickslink.About': '私について',
                'footer.quickslink.Projects': 'プロジェクト',
                'footer.quickslink.Contact': '連絡先',
                'footer.services': 'サービス',
                'footer.service.web': 'ウェブ開発',
                'footer.service.uiux': 'UI/UXデザイン',
                'footer.service.video': 'ビデオ制作',
                'footer.service.consult': 'ITコンサルティング'
            }
        };

        let currentLang = 'en';

        function changeLanguage(lang) {
            currentLang = lang;
            
            // Update active button
            langButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.lang === lang) {
                    btn.classList.add('active');
                }
            });
            
            // Update all translatable elements
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (translations[lang] && translations[lang][key]) {
                    element.innerHTML = translations[lang][key];
                }
            });
            
            // Update placeholders
            document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
                const key = element.getAttribute('data-i18n-placeholder');
                if (translations[lang] && translations[lang][key]) {
                    element.setAttribute('placeholder', translations[lang][key]);
                }
            });
            
            // Save preference to localStorage
            localStorage.setItem('language', lang);
        }

        // Add click event to language buttons
        langButtons.forEach(button => {
            button.addEventListener('click', () => {
                changeLanguage(button.dataset.lang);
            });
        });

        // Load saved language preference
        const savedLang = localStorage.getItem('language') || 'en';
        changeLanguage(savedLang);

        // Contact Form Submission
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show an alert
            let message = '';
            switch(currentLang) {
                case 'id':
                    message = `Terima kasih ${name}! Pesan Anda telah dikirim. Saya akan membalas ke ${email} segera.`;
                    break;
                case 'jp':
                    message = `${name}様、ありがとうございます！メッセージが送信されました。${email}にすぐに返信いたします。`;
                    break;
                default:
                    message = `Thank you ${name}! Your message has been sent. I'll reply to ${email} shortly.`;
            }
            
            alert(message);
            
            // Reset form
            this.reset();
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.background = 'var(--glass-bg)';
            } else {
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.background = 'var(--glass-bg)';
            }
        });

        // Initialize navbar background
        const navbar = document.querySelector('.navbar');
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.background = 'var(--glass-bg)';

        document.addEventListener("DOMContentLoaded", function () {

    const grid = document.querySelector('.projects-grid');
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.project-card'));
    if (cards.length <= 3) return;

    function isDesktop() {
        return window.innerWidth > 768;
    }

    let currentSlide = 0;
    let wrapper, track, prevBtn, nextBtn;
    const fadeDuration = 600; // durasi fade in ms

    function initSlider() {
        if (!isDesktop()) return;

        grid.classList.add('slider-active');
        grid.style.display = "block";

        wrapper = document.createElement('div');
        wrapper.className = 'projects-slider-wrapper';

        track = document.createElement('div');
        track.className = 'projects-slider-track';
        track.style.transition = `opacity ${fadeDuration}ms ease-in-out`; // fade track

        cards.forEach(card => track.appendChild(card));

        wrapper.appendChild(track);
        grid.appendChild(wrapper);

        createNavigation();
        showSlide(currentSlide); // tampilkan slide pertama
    }

    function createNavigation() {
        prevBtn = document.createElement('button');
        nextBtn = document.createElement('button');

        prevBtn.innerHTML = '‹';
        nextBtn.innerHTML = '›';

        prevBtn.className = 'project-nav prev';
        nextBtn.className = 'project-nav next';

        const section = document.querySelector('#projects');
        section.appendChild(prevBtn);
        section.appendChild(nextBtn);

        prevBtn.addEventListener('click', () => slide(-1));
        nextBtn.addEventListener('click', () => slide(1));
    }

    function slide(direction) {
        const itemsPerSlide = 3;
        const totalSlides = Math.ceil(cards.length / itemsPerSlide);

        currentSlide += direction;

        if (currentSlide < 0) currentSlide = 0;
        if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;

        // Fade out track dulu
        track.style.opacity = 0;

        setTimeout(() => {
            const card = cards[0];
            const style = window.getComputedStyle(track);
            const gap = parseFloat(style.gap || 0);
            const cardWidth = card.offsetWidth;

            const slideDistance = (cardWidth + gap) * itemsPerSlide;
            const maxTranslate = track.scrollWidth - wrapper.clientWidth;

            let translateValue = currentSlide * slideDistance;
            if (translateValue > maxTranslate) translateValue = maxTranslate;

            track.style.transform = `translateX(-${translateValue}px)`;

            // Fade in track
            track.style.opacity = 1;
        }, fadeDuration);
    }

    initSlider();

});



 /* =========================================
   PROJECT FILTER + SLIDE ANIMATION
========================================= */
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {

        // Active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach(card => {

            const category = card.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                // Show with animation
                card.style.display = 'block';

                requestAnimationFrame(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';

                    requestAnimationFrame(() => {
                        card.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                });

            } else {
                // Hide with animation
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

/* =========================================
   PROJECT CARD ANIMATION KHUSUS MOBILE
   BERGANTIAN KIRI-KANAN SAAT DISCROLL
========================================= */
document.addEventListener("DOMContentLoaded", function() {
    
    // Fungsi untuk mengecek apakah layar mobile (max-width: 768px)
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Inisialisasi observer untuk animasi scroll
    function initMobileProjectAnimations() {
        if (!isMobile()) return;

        const projectCards = document.querySelectorAll('.project-card');
        
        // Hapus AOS attributes jika ada
        projectCards.forEach(card => {
            card.removeAttribute('data-aos');
            card.removeAttribute('data-aos-delay');
            card.removeAttribute('data-aos-duration');
            
            // Set initial state
            card.style.opacity = '0';
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            // Set transform berdasarkan index
            const index = Array.from(projectCards).indexOf(card);
            if (index % 2 === 0) {
                // Genap: dari kiri
                card.style.transform = 'translateX(-30px)';
                card.classList.add('animate-from-left');
            } else {
                // Ganjil: dari kanan
                card.style.transform = 'translateX(30px)';
                card.classList.add('animate-from-right');
            }
        });

        // Intersection Observer untuk mendeteksi saat card muncul di viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Card muncul di layar
                    const card = entry.target;
                    const index = Array.from(projectCards).indexOf(card);
                    
                    // Tambah delay berdasarkan index
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateX(0)';
                    }, index * 100); // Delay 100ms per index
                    
                    // Stop observing setelah animasi dijalankan
                    observer.unobserve(card);
                }
            });
        }, {
            threshold: 0.2, // Muncul saat 20% card terlihat
            rootMargin: '0px 0px -20px 0px'
        });

        // Observasi semua project cards
        projectCards.forEach(card => {
            observer.observe(card);
        });
    }

    // Panggil fungsi
    initMobileProjectAnimations();

    // Refresh saat resize window
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Reset semua card
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                card.style.opacity = '';
                card.style.transform = '';
                card.style.transition = '';
            });
            
            // Inisialisasi ulang untuk mobile
            initMobileProjectAnimations();
        }, 250);
    });

    // Untuk memicu animasi saat pertama load
    setTimeout(() => {
        if (isMobile()) {
            window.dispatchEvent(new Event('scroll'));
        }
    }, 100);
});