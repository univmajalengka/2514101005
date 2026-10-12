// Toggle Mobile Menu
document.getElementById('mobile-menu-btn').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Hitung Total Harga Tiket
function calculateTotal() {
    const paket = document.getElementById('paket-select').value;
    const jumlah = parseInt(document.getElementById('jumlah').value) || 1;
    let harga = 10000;

    if (paket === 'Camping') harga = 25000;
    if (paket === 'Rombongan') harga = 8000;

    const total = harga * jumlah;
    document.getElementById('total-harga').innerText = 'Rp ' + total.toLocaleString('id-ID');
}

function selectPaket(namaPaket) {
    document.getElementById('paket-select').value = namaPaket;
    calculateTotal();
}

// Kirim WhatsApp
function sendWhatsApp(event) {
    event.preventDefault();
    const nama = document.getElementById('nama').value;
    const telepon = document.getElementById('telepon').value;
    const paket = document.getElementById('paket-select').value;
    const tanggal = document.getElementById('tanggal').value;
    const jumlah = document.getElementById('jumlah').value;
    const total = document.getElementById('total-harga').innerText;

    const text = `Halo Admin Wisata Alam Pasir Paratz,%0A%0ASaya ingin memesan tiket:%0A- Nama: ${nama}%0A- No. HP: ${telepon}%0A- Paket: ${paket}%0A- Tanggal: ${tanggal}%0A- Jumlah: ${jumlah} tiket%0A- Total Estimasi: ${total}%0A%0AMohon konfirmasinya. Terima kasih!`;
    window.open(`https://wa.me/6283823742523?text=${text}`, '_blank');
}

// --- SISTEM PENYIMPANAN FOTO LOCALSTORAGE (PERMANEN DI BROWSER) ---
let savedImages = JSON.parse(localStorage.getItem('pasir_paratz_images')) || [];

// Muat gambar tersimpan saat halaman dibuka
window.addEventListener('DOMContentLoaded', () => {
    renderGallery();
});

function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = '';

    if (savedImages.length === 0) {
        grid.innerHTML = `
            <div id="empty-gallery-msg" class="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200">
                <i class="fa-regular fa-images text-4xl text-slate-300 mb-3 block"></i>
                <p class="text-slate-600 font-medium">Belum ada foto yang diunggah.</p>
                <p class="text-sm text-slate-400">Pilih foto dari tombol di atas untuk menambah galeri secara tersimpan.</p>
            </div>
        `;
        return;
    }

    savedImages.forEach((src, index) => {
        const card = document.createElement('div');
        card.className = "group relative overflow-hidden rounded-2xl shadow-md bg-white border border-slate-200 h-64";
        card.innerHTML = `
            <img src="${src}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer" onclick="openLightbox('${src}')">
            <button onclick="deleteImage(${index})" class="absolute top-3 right-3 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-80 hover:opacity-100 shadow-md">
                <i class="fa-solid fa-trash text-xs"></i>
            </button>
        `;
        grid.appendChild(card);
    });
}

// Handle Upload Baru
function handleImageUpload(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const src = e.target.result;
            savedImages.push(src);
            try {
                localStorage.setItem('pasir_paratz_images', JSON.stringify(savedImages));
                renderGallery();
            } catch (err) {
                alert("Ukuran foto terlalu besar untuk disimpan secara permanen di browser ini. Coba foto dengan resolusi lebih kecil.");
            }
        };
        reader.readAsDataURL(file);
    });
}

// Hapus Foto
function deleteImage(index) {
    savedImages.splice(index, 1);
    localStorage.setItem('pasir_paratz_images', JSON.stringify(savedImages));
    renderGallery();
}

// Lightbox
function openLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').classList.remove('hidden');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
}