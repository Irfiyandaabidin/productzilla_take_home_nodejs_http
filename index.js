// Buat sebuah aplikasi menggunakan module HTTP untuk:
// 1. menyimpan data stok barang (id barang, nama, harga, kuantitas)
// 2. menampilkan semua data stok barang
// 3. menampilkan satu barang berdasarkan id
// 4. update data barang
// 5. hapus data barang

const http = require('http');
const url = require('url');
const handleData = require('./handleData');

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true)
    const method = req.method
    if(pathname === '/produk'){
        if (method === 'GET' && query.id != undefined){
            res.end(JSON.stringify(handleData.tampilBarangById(query.id)))
        
        } else if(method === 'GET'){
            res.end(JSON.stringify(handleData.tampilData()))
        
        } else if (method === 'POST'){
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            })
            req.on('end', () => {
                const data = JSON.parse(body)
                res.end(handleData.tambahData(data))
            })
        
        } else if (method === 'PUT' && query.id != undefined){
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            })
            req.on('end', () => {
                const data = JSON.parse(body)
                res.end(JSON.stringify(handleData.updateData(query.id, data)))
            })
        } else if (method === 'DELETE' && query.id != undefined){
            res.end(JSON.stringify(handleData.hapusBarangById(query.id)))
        }
    } else {

    }
})

const PORT = 3000
server.listen(PORT)

console.log('Server running on port 3000')