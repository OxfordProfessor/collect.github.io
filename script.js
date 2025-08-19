// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initCounterAnimations();
    initCharts();
    initInkEffects();
    initProgressNav();
});

// 滚动动画初始化
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // 触发数字计数动画
                if (entry.target.classList.contains('stat-card')) {
                    animateCounter(entry.target);
                }
                
                // 触发图表动画
                if (entry.target.classList.contains('chart-container')) {
                    animateChart(entry.target);
                }
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.stat-card, .chart-container, .taiji-container, .bamboo-scroll, .hourglass-container, .beauty-timeline, .gender-fish');
    animatedElements.forEach(el => observer.observe(el));
}

// 数字计数动画
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        counter.style.opacity = '0';
    });
}

function animateCounter(card) {
    const counter = card.querySelector('.stat-number');
    if (!counter || counter.classList.contains('animated')) return;
    
    counter.classList.add('animated');
    counter.style.opacity = '1';
    
    const target = parseFloat(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = current.toFixed(1);
    }, 16);
    
    // 添加墨滴扩散效果
    createInkEffect(card);
}

// 墨滴扩散效果
function createInkEffect(element) {
    const inkDrop = document.createElement('div');
    inkDrop.className = 'ink-drop';
    inkDrop.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, rgba(0,0,0,0.1) 0%, transparent 70%);
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: inkSpread 2s ease-out forwards;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(inkDrop);
    
    setTimeout(() => {
        inkDrop.remove();
    }, 2000);
}

// 水墨效果初始化
function initInkEffects() {
    // 为页面添加随机的水墨效果
    setInterval(() => {
        createRandomInkEffect();
    }, 3000);

    // 添加毛笔字效果
    addBrushTextEffect();

    // 添加水墨扩散效果
    addInkSpreadEffect();
}

function createRandomInkEffect() {
    const inkEffect = document.createElement('div');
    const size = 30 + Math.random() * 40;
    const opacity = 0.02 + Math.random() * 0.03;

    inkEffect.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(ellipse, rgba(0,0,0,${opacity}) 0%, rgba(0,0,0,${opacity * 0.5}) 40%, transparent 70%);
        border-radius: 50%;
        top: ${Math.random() * 100}vh;
        left: ${Math.random() * 100}vw;
        animation: inkFade 6s ease-out forwards;
        pointer-events: none;
        z-index: -1;
        transform: rotate(${Math.random() * 360}deg);
    `;

    document.body.appendChild(inkEffect);

    setTimeout(() => {
        inkEffect.remove();
    }, 6000);
}

// 毛笔字效果
function addBrushTextEffect() {
    const titles = document.querySelectorAll('.chapter-title, .main-title');
    titles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            title.style.filter = 'blur(0.3px)';
            title.style.textShadow = '3px 3px 8px rgba(0,0,0,0.2)';
        });

        title.addEventListener('mouseleave', () => {
            title.style.filter = 'none';
            title.style.textShadow = '2px 2px 4px rgba(0,0,0,0.1)';
        });
    });
}

// 水墨扩散效果
function addInkSpreadEffect() {
    const sections = document.querySelectorAll('.chapter-section');
    sections.forEach((section, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    createSectionInkEffect(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(section);
    });
}

function createSectionInkEffect(section) {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const inkDrop = document.createElement('div');
            const size = 20 + Math.random() * 30;

            inkDrop.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.02) 50%, transparent 80%);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: sectionInkSpread 4s ease-out forwards;
                pointer-events: none;
                z-index: 1;
            `;

            section.appendChild(inkDrop);

            setTimeout(() => {
                inkDrop.remove();
            }, 4000);
        }, i * 1000);
    }
}

// 图表初始化
function initCharts() {
    // 肥胖率趋势图
    createObesityTrendChart();
    
    // 饮食对比图
    createDietComparisonChart();
    
    // 活动变化图
    createActivityChart();
}

// 肥胖率趋势图
function createObesityTrendChart() {
    const ctx = document.getElementById('obesityTrendChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1980', '1990', '2000', '2010', '2020'],
            datasets: [{
                label: '肥胖率 (%)',
                data: [2, 4, 7, 12, 16.4],
                borderColor: '#2c3e50',
                backgroundColor: 'rgba(44, 62, 80, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#e74c3c',
                pointBorderColor: '#2c3e50',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: '中国居民肥胖率变化趋势',
                    font: {
                        size: 16,
                        family: 'Noto Serif SC'
                    },
                    color: '#2c3e50'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 20,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    },
                    ticks: {
                        font: {
                            family: 'Noto Serif SC'
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    },
                    ticks: {
                        font: {
                            family: 'Noto Serif SC'
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// 饮食对比图
function createDietComparisonChart() {
    const ctx = document.getElementById('dietComparisonChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['谷物', '肉类', '蛋类', '奶类', '食用油'],
            datasets: [{
                label: '1982年 (g/天)',
                data: [509.7, 20.2, 7.3, 8.1, 18.2],
                backgroundColor: 'rgba(52, 73, 94, 0.8)',
                borderColor: '#34495e',
                borderWidth: 1
            }, {
                label: '2020年 (g/天)',
                data: [296.3, 126.2, 48.3, 35.8, 43.2],
                backgroundColor: 'rgba(231, 76, 60, 0.8)',
                borderColor: '#e74c3c',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '饮食结构变化对比 (1982年 vs 2020年)',
                    font: {
                        size: 16,
                        family: 'Noto Serif SC'
                    },
                    color: '#2c3e50'
                },
                legend: {
                    labels: {
                        font: {
                            family: 'Noto Serif SC'
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    },
                    ticks: {
                        font: {
                            family: 'Noto Serif SC'
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    },
                    ticks: {
                        font: {
                            family: 'Noto Serif SC'
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// 活动变化图
function createActivityChart() {
    const ctx = document.getElementById('activityChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['步行/骑行', '私家车/电动车', '公共交通'],
            datasets: [{
                label: '1990年',
                data: [75, 15, 10],
                backgroundColor: [
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(231, 76, 60, 0.8)',
                    'rgba(52, 152, 219, 0.8)'
                ],
                borderColor: [
                    '#2ecc71',
                    '#e74c3c',
                    '#3498db'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '出行方式变化 (1990年 vs 2022年)',
                    font: {
                        size: 16,
                        family: 'Noto Serif SC'
                    },
                    color: '#2c3e50'
                },
                legend: {
                    labels: {
                        font: {
                            family: 'Noto Serif SC'
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// 图表动画触发
function animateChart(container) {
    if (container.classList.contains('chart-animated')) return;
    container.classList.add('chart-animated');
    
    // 添加淡入效果
    container.style.opacity = '0';
    container.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        container.style.transition = 'all 1s ease-out';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes inkFade {
        0% {
            transform: scale(0);
            opacity: 0.3;
        }
        50% {
            opacity: 0.1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 1s ease-out forwards;
    }
    
    .stat-card {
        transition: all 0.3s ease;
    }
    
    .taiji-container {
        transition: transform 0.3s ease;
    }
    
    .taiji-container:hover {
        transform: rotate(10deg) scale(1.05);
    }
    
    .bamboo-scroll {
        transition: all 0.3s ease;
    }
    
    .bamboo-scroll:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0,0,0,0.15);
    }
    
    .beauty-era {
        transition: all 0.3s ease;
    }
    
    .beauty-era:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    }

    @keyframes sectionInkSpread {
        0% {
            transform: scale(0);
            opacity: 0.8;
        }
        50% {
            opacity: 0.3;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }

    /* 水墨纹理效果 */
    .chapter-section::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image:
            radial-gradient(circle at 15% 25%, rgba(0,0,0,0.01) 1px, transparent 1px),
            radial-gradient(circle at 85% 75%, rgba(0,0,0,0.008) 1px, transparent 1px);
        background-size: 80px 80px, 120px 120px;
        pointer-events: none;
        z-index: -1;
        animation: textureFloat 25s linear infinite;
    }

    @keyframes textureFloat {
        0% { transform: translate(0, 0); }
        25% { transform: translate(-10px, -5px); }
        50% { transform: translate(5px, -10px); }
        75% { transform: translate(-5px, 5px); }
        100% { transform: translate(0, 0); }
    }
`;
document.head.appendChild(style);

// 进度导航栏初始化
function initProgressNav() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    // 点击导航项滚动到对应章节
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 滚动时更新导航状态
    function updateNavigation() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navItems.forEach(item => item.classList.remove('active'));
                if (navItems[index]) {
                    navItems[index].classList.add('active');
                }
            }
        });
    }

    // 监听滚动事件
    window.addEventListener('scroll', updateNavigation);

    // 初始化导航状态
    updateNavigation();
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
