// Buat sebuah aplikasi untuk:
// 1. menyimpan data stok barang (id barang, nama, harga, kuantitas)
// 2. menampilkan semua data stok barang
// 3. menampilkan total harga semua barang (harga * kuantitas)
// 4. update data barang *opsional
// 5. hapus data barang *opsional

// ** data di simpan ke dalam sebuah file
// ** data inputan diambil dari prompt atau inputan user

const path = require('path');
const fs = require('fs');
const prompt = require('prompt-sync')()
const uniqid = require('uniqid')
const handleData = require('./handleData')

ulang = true
const main = async() => {
    while(ulang){
    let menu = parseInt(prompt(console.log(`
    1. Tampilkan data stok
    2. Tambah data
    3. Tampilkan total harga barang
    4. Update data
    5. Delete data
    6. exit
    `)))
    
    if (menu === 1){
        console.log(handleData.tampilData())
    }
    else if (menu === 2){
        const id = uniqid()
        const nama = prompt(console.log('Masukkan nama barang : '))
        const harga = parseInt(prompt(console.log('Masukkan harga barang : ')))
        const kuantitas = parseInt(prompt(console.log('Masukkan kuantitas barang : ')))
        const newData = {
            id,
            nama,
            harga,
            kuantitas
        }
        handleData.tambahData(newData)
    }
    else if (menu === 3){
        console.log(handleData.tampilHargaBarang())
    }
    else if (menu === 4){
        const namaBarang = prompt(console.log('Masukkan nama barang untuk diupdate: '))
        handleData.updateData(namaBarang)
    }
    else if (menu === 5){
        const namaBarang = prompt(console.log('Masukkan nama barang untuk dihapus: '))
        handleData.hapusBarangByName(namaBarang)
    }
    else if (menu === 6){
        ulang = false
    }
}
}

main()