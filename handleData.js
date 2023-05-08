const fs = require('fs');
const path = require('path');
const prompt = require('prompt-sync')()
const id = require('uniqid')

const datadir = './data'
const dataPath = path.join(datadir, 'data.json')

const tampilData = () => {
    if(!fs.existsSync(dataPath)){
        return ('Data belum ada')
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
        if(newData.find(d => d.id == inputData.id)){
            return('Id barang sudah ada')
        } else {
            newData.push(inputData)
            const newDataString = JSON.stringify(newData)
            fs.writeFileSync(dataPath, newDataString)
            return('Berhasil menambahkan data')
        }
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

const tampilBarangById = (id) => {
    const data = fs.readFileSync(dataPath)
    const dataJson = JSON.parse(data)
    const dataById = dataJson.find(d => d.id === parseInt(id))
    if(dataById){
        return dataById
    } else {
        return "Id tidak ditemukan"
    }
}

const updateData = (idBarang, newData) => {
    const data = fs.readFileSync(dataPath)
    const dataJson = JSON.parse(data)
    const findIndexData = dataJson.findIndex(data => data.id === parseInt(idBarang))
    if(findIndexData != -1){
        dataJson[findIndexData] = newData
        const dataString = JSON.stringify(dataJson)
        fs.writeFileSync(dataPath, dataString)
        return (dataJson[findIndexData]) 
    } else {
        return('Id tidak ditemmukan')
    }
}

const hapusBarangById = (idBarang) => {
    const data = fs.readFileSync(dataPath)
    const dataJson = JSON.parse(data)
    const newData = dataJson.filter(d => d.id != parseInt(idBarang))
    const newDataString = JSON.stringify(newData)
    fs.writeFileSync(dataPath, newDataString);
    return("Data berhasil dihapus")
}

if(!fs.existsSync(datadir)){
    fs.mkdirSync(datadir)
}

module.exports = {
    tampilData,
    tambahData,
    tampilHargaBarang,
    updateData,
    hapusBarangById,
    tampilBarangById
}