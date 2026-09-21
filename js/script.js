const menuBtn = document.querySelector('#menu-btn');
const navMenu = document.querySelector('#nav-menu');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

function filterProduk(kategori) {

    const semuaProduk =
        document.querySelectorAll(
            ".product-card-new"
        );

    let jumlah = 0;


    semuaProduk.forEach(
        function(produk) {

            const kategoriProduk =
                produk.dataset.category;


            if (
                kategori === "Semua" ||
                kategoriProduk === kategori
            ) {

                produk.style.display = "block";

                jumlah++;

            } else {

                produk.style.display = "none";

            }

        }
    );
    document.getElementById(
        "jumlahProduk"
    ).innerText =
        "Menampilkan " +
        jumlah +
        " produk";
    document.getElementById(
        "produk"
    ).scrollIntoView({
        behavior: "smooth"
    });

}
function filterHarga() {
    const checkbox =
        document.querySelectorAll(
            ".price-filter input:checked"
        );
    const semuaProduk =
        document.querySelectorAll(
            ".product-card-new"
        );
    if (checkbox.length === 0) {

        semuaProduk.forEach(
            function(produk) {
                produk.style.display =
                    "block";
            }
        );
        return;
    }
    semuaProduk.forEach(
        function(produk) {
            const harga =
                parseInt(
                    produk.dataset.price
                );
            let cocok = false;
            checkbox.forEach(
                function(item) {
                    const range =
                        item.value.split("-");
                    if (range.length === 1) {
                        if (
                            harga >=
                            parseInt(range[0])
                        ) {
                            cocok = true;
                        }
                    } else {
                        const minimum =
                            parseInt(range[0]);
                        const maximum =
                            parseInt(range[1]);
                        if (
                            harga >= minimum &&
                            harga <= maximum
                        ) {
                            cocok = true;

                        }

                    }

                }
            );


            if (cocok) {

                produk.style.display =
                    "block";

            } else {

                produk.style.display =
                    "none";

            }

        }
    );

}

function tambahKeranjang(namaProduk) {
    alert(
        namaProduk +
        " berhasil ditambahkan ke keranjang 🛒"
    );
}
const nomorWhatsApp = "6285711904693";
let produkDipilih = "";
let hargaProduk = 0;

function formatRupiah(angka) {
    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }
    ).format(angka);
}
function keProduk() {
    const produk =
        document.getElementById("produk");
    produk.scrollIntoView({
        behavior: "smooth"
    });
}

function beliProduk(
    nama,
    harga,
    gambar
) {

    // Simpan data produk
    produkDipilih = nama;
    hargaProduk = harga;
    // Tampilkan nama produk
    document.getElementById(
        "transactionProduct"
    ).innerText = nama;
    // Tampilkan harga
    document.getElementById(
        "transactionPrice"
    ).innerText =
        formatRupiah(harga);
    // Tampilkan gambar
    document.getElementById(
        "transactionImage"
    ).src = gambar;
    // Reset jumlah menjadi 1
    document.getElementById(
        "jumlah"
    ).value = "1";
    // Tampilkan total
    document.getElementById(
        "totalHarga"
    ).innerText =
        formatRupiah(harga);
    // Tampilkan bagian transaksi
    document.getElementById(
        "transaksi"
    ).style.display = "block";
    // Scroll ke transaksi
    document.getElementById(
        "transaksi"
    ).scrollIntoView({
        behavior: "smooth"
    });
}
document
    .getElementById("jumlah")
    .addEventListener(
        "change",
        function () {
            const jumlah =
                parseInt(this.value);
            const total =
                hargaProduk * jumlah;
            document.getElementById(
                "totalHarga"
            ).innerText =
                formatRupiah(total);
        }
    );
function kirimPesanan() {
    const nama =
        document.getElementById(
            "nama"
        ).value.trim();
    const nomor =
        document.getElementById(
            "nomor"
        ).value.trim();
    const alamat =
        document.getElementById(
            "alamat"
        ).value.trim();
    const jumlah =
        parseInt(
            document.getElementById(
                "jumlah"
            ).value
        );
    if (
        nama === "" ||
        nomor === "" ||
        alamat === ""
    ) {
        alert(
            "Silakan lengkapi data pemesanan terlebih dahulu."
        );
        return;

    }
    if (
        produkDipilih === "" ||
        hargaProduk === 0
    ) {
        alert(
            "Silakan pilih produk terlebih dahulu."
        );
        return;
    }
    const total =
        hargaProduk * jumlah;
    const pesan =
        "Halo Zendaya Store" +
        "\n\n" +

        "Saya ingin melakukan pemesanan." +
        "\n\n" +

        "Nama: " +
        nama +

        "\nNomor WhatsApp: " +
        nomor +

        "\nProduk: " +
        produkDipilih +

        "\nJumlah: " +
        jumlah +

        "\nHarga Satuan: " +
        formatRupiah(hargaProduk) +

        "\nTotal: " +
        formatRupiah(total) +

        "\nAlamat: " +
        alamat;
    const url =
        "https://wa.me/" +
        nomorWhatsApp +
        "?text=" +
        encodeURIComponent(pesan);

    window.open(
        url,
        "_blank"
    );

}
