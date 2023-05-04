const fs = require('fs');
const path = require('path');
const prompt = require('prompt-sync')()

const datadir = './data'
const dataPath = path.join(datadir, 'data.json')

const tampilData = () => {
    if(!fs.existsSync(dataPath)){
        console.log('Data belum ada')
    } else {
        const data = fs.readFileSync(dataPath)
        dataJson = JSON.parse(data)
        const result = dataJson.map(d => {
            return {
                nama: d.nama,
                stok: d.kuantitas
            }
        })
        return result
    }
}

const tambahData = (inputData) => {
    if(!fs.existsSync(dataPath)){
        const dataArray = []
        dataArray.push(inputData)
        const dataString = JSON.stringify(dataArray)
        fs.writeFileSync(dataPath, dataString)
    } else {
        const oldData = fs.readFileSync(dataPath)
        const newData = JSON.parse(oldData)
        newData.push(inputData)
        const newDataString = JSON.stringify(newData)
        fs.writeFileSync(dataPath, newDataString)
        console.log('Berhasil menambahkan data')
    }
}

const tampilHargaBarang = () => {
    const data = fs.readFileSync(dataPath)
    const dataJson = JSON.parse(data)
    const result = dataJson.map(d => {
        return {
            nama: d.nama,
            totalHarga: d.kuantitas * d.harga
        }
    })
    return result
}

const updateData = (namaBarang) => {
    const data = fs.readFileSync(dataPath)
    const dataJson = JSON.parse(data)
    const findIndexData = dataJson.findIndex(data => data.nama === namaBarang)
    if(findIndexData != -1){
        const id = dataJson[findIndexData].id
        const nama = prompt(console.log('Masukkan nama barang (baru) : '))
        const harga = parseInt(prompt(console.log('Masukkan harga barang (baru) : ')))
        const kuantitas = parseInt(prompt(console.log('Masukkan kuantitas barang (baru) : ')))
        const newData = {
            id,
            nama,
            harga,
            kuantitas
        }
        dataJson[findIndexData] = newData
        const dataString = JSON.stringify(dataJson)
        fs.writeFileSync(dataPath, dataString)
    } else {
        console.log('Nama barang tidak ditemukan')
    }
}

const hapusBarangByName = (namaBarang) => {
    const data = fs.readFileSync(dataPath)
    const dataJson = JSON.parse(data)
    const findIndexByName = dataJson.findIndex(data => data.nama === namaBarang)
    if (findIndexByName !== -1){
        const konfirmasi = prompt(console.log(`Yakin hapus ${namaBarang} dari data? (y/t): `))
        if (konfirmasi === 'y'){
            dataJson.splice(findIndexByName, 1)
            const dataString = JSON.stringify(dataJson)
            fs.writeFileSync(dataPath, dataString)
        }
    }
}

if(!fs.existsSync(datadir)){
    fs.mkdirSync(datadir)
}

module.exports = {
    tampilData,
    tambahData,
    tampilHargaBarang,
    updateData,
    hapusBarangByName
}