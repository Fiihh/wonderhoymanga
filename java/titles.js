const mangaDetailData = {
    "Yuru CampAnthology Comic": {
        cover: "assets/yurucamp1203.jpg",
        author: "Afro",
        illustrator: "Various Artists",
        theme: "Camping, Slice of Life",
        type: "Manga",
        status: "End",
        official: "https://yurucamp.jp/",
        synopsis: "Sekelompok gadis menikmati kegiatan camping santai di berbagai tempat indah di Jepang. Cerita ringan, hangat, dan penuh momen komedi.",
        genres: ["Slice of Life", "Comedy", "Outdoor"],
        chapters: 25
    }
};

// Ambil title dari URL
const params = new URLSearchParams(window.location.search);
const title = params.get("title");

// Update title halaman
document.title = `${title} - Wonderhoy`;

const data = mangaDetailData[title];

if (data) {
    // Set data ke elemen HTML
    document.getElementById("title").textContent = title;
    document.getElementById("author").textContent = data.author;
    document.getElementById("illustrator").textContent = data.illustrator;
    document.getElementById("theme").textContent = data.theme;
    document.getElementById("type").textContent = data.type;
    document.getElementById("status").textContent = data.status;
    
    // Set official link
    const officialLink = document.getElementById("official");
    officialLink.href = data.official;
    officialLink.textContent = "Official Website";
    
    document.getElementById("synopsis").textContent = data.synopsis;
    
    // Set cover image
    const mangaCover = document.getElementById("mangaCover");
    mangaCover.src = data.cover;
    mangaCover.alt = `${title} Cover`;

    // Genre pills - sekarang di dalam manga info
    const genreWrap = document.getElementById("genreList");
    genreWrap.innerHTML = '';
    data.genres.forEach(g => {
        const pill = document.createElement("span");
        pill.className = "genre-pill";
        pill.textContent = g;
        genreWrap.appendChild(pill);
    });

    // Chapter List
    const chapterWrap = document.getElementById("chapterList");
    chapterWrap.innerHTML = '';
    
    const currentDate = new Date();
    
    for (let i = data.chapters; i >= 1; i--) {
        const ch = document.createElement("div");
        ch.className = "chapter-item";
        
        const chapterDate = new Date(currentDate);
        chapterDate.setDate(currentDate.getDate() - ((data.chapters - i) * 7));
        
        const formattedDate = chapterDate.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        ch.innerHTML = `
            <span class="chapter-number">Chapter ${i}</span>
            <span class="chapter-date">${formattedDate}</span>
        `;
        ch.onclick = () => {
            window.location.href = `reader.html?title=${encodeURIComponent(title)}&chapter=${i}`;
        };
        chapterWrap.appendChild(ch);
    }
    
    // Read button functionality
    document.getElementById("readButton").onclick = () => {
        window.location.href = `reader.html?title=${encodeURIComponent(title)}&chapter=1`;
    };

    // Bookmark button functionality
    document.querySelector('.btn-secondary').onclick = () => {
        addToBookmark(title, data.cover);
    };

} else {
    // Jika data tidak ditemukan
    document.body.innerHTML = `
        <div style="padding: 30px; text-align: center; color: white; background: #000; min-height: 100vh; font-size: 14px;">
            <h1 style="color: #7c3aed; margin-bottom: 15px; font-size: 1.5rem;">Manga tidak ditemukan</h1>
            <p style="margin-bottom: 20px; opacity: 0.8;">Manga yang Anda cari tidak tersedia.</p>
            <a href="index.html" style="color: #7cdcff; text-decoration: none; font-weight: 600; 
                   background: rgba(255,255,255,0.1); padding: 10px 20px; border-radius: 10px; font-size: 13px;">
                Kembali ke Beranda
            </a>
        </div>
    `;
}

// Bookmark functionality
function addToBookmark(mangaTitle, cover) {
    let bookmarks = JSON.parse(localStorage.getItem('mangaBookmarks')) || [];
    
    const alreadyBookmarked = bookmarks.some(bookmark => bookmark.title === mangaTitle);
    
    if (!alreadyBookmarked) {
        const bookmark = {
            title: mangaTitle,
            cover: cover,
            dateAdded: new Date().toISOString()
        };
        
        bookmarks.push(bookmark);
        localStorage.setItem('mangaBookmarks', JSON.stringify(bookmarks));
        
        showNotification(`"${mangaTitle}" berhasil ditambahkan ke bookmark!`, 'success');
    } else {
        showNotification(`"${mangaTitle}" sudah ada di bookmark!`, 'warning');
    }
}

// Notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 15px;
        right: 15px;
        background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(234, 179, 8, 0.9)'};
        color: white;
        padding: 12px 18px;
        border-radius: 10px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.1);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 500;
        font-size: 13px;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2500);
}

// Error handling untuk gambar
document.getElementById('mangaCover').addEventListener('error', function() {
    this.src = 'assets/placeholder-cover.jpg';
    this.alt = 'Cover tidak tersedia';
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.location.href = 'index.html';
    }
});

// Load animation
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.manga-header, .content-section');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(15px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.4s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

