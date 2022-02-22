
window.addEventListener('DOMContentLoaded', (event) => {
    test();
});

const test = (judul = null) => {
    var data = [];
    for (var key in localStorage){
        if (Array.isArray(JSON.parse(window.localStorage.getItem(key)))) {
            data.push(JSON.parse(window.localStorage.getItem(key)));
        }
     }
     data.forEach(element => {
         element.forEach(row => {
             if (row['judul'] == judul) {
                 if (row['status'] == 'false') {
                    var html;
                    html = '<article class="book_item" id="itemContent'+row['id']+'">'
                    html += '<h3 id="bookTitle'+row['id']+'">'+row['judul']+'</h3>'
                    html += '<p>Penulis: <span id="textPenulis'+row['id']+'">'+row['penulis']+'</span></p>'
                    html += '<p>Tahun: <span id="textTahun'+row['id']+'">'+row['tahun']+'</span></p>'
                    html += '<input type="hidden" id="check'+row['id']+'" value="'+row['check']+'"></div>'
                    html += '<div class="action">'
                    html += '<button class="red" onclick="destroy('+row['id']+')">Hapus buku</button>'
                    html += '<button class="green" onclick="done('+row['id']+')">Selesai dibaca</button>'
                    html += '</div>'
                    html += '</article>'
                
                    document.getElementById('incompleteBookshelfList').insertAdjacentHTML("afterend", html)
                } else {
                     var html;
                     html = '<article class="book_item" id="itemContent'+row['id']+'">'
                     html += '<h3 id="bookTitle'+row['id']+'">'+row['judul']+'</h3>'
                     html += '<p>Penulis: <span id="textPenulis'+row['id']+'">'+row['penulis']+'</span></p>'
                     html += '<p>Tahun: <span id="textTahun'+row['id']+'">'+row['tahun']+'</span></p>'
                     html += '<input type="hidden" id="check'+row['id']+'" value="'+row['check']+'"></div>'
                     html += '<div class="action">'
                     html += '<button class="red" onclick="destroy('+row['id']+')">Hapus buku</button>'
                     html += '<button class="green" onclick="rollback('+row['id']+')">Rollback</button>'
                     html += '</div>'
                     html += '</article>'
                 
                     document.getElementById('completeBookshelfList').insertAdjacentHTML("afterend", html)
                 }
             } else {
                if (row['status'] == 'false') {
                    var html;
                    html = '<article class="book_item" id="itemContent'+row['id']+'">'
                    html += '<h3 id="bookTitle'+row['id']+'">'+row['judul']+'</h3>'
                    html += '<p>Penulis: <span id="textPenulis'+row['id']+'">'+row['penulis']+'</span></p>'
                    html += '<p>Tahun: <span id="textTahun'+row['id']+'">'+row['tahun']+'</span></p>'
                    html += '<input type="hidden" id="check'+row['id']+'" value="'+row['check']+'"></div>'
                    html += '<div class="action">'
                    html += '<button class="red" onclick="destroy('+row['id']+')">Hapus buku</button>'
                    html += '<button class="green" onclick="done('+row['id']+')">Selesai dibaca</button>'
                    html += '</div>'
                    html += '</article>'
                
                    document.getElementById('incompleteBookshelfList').insertAdjacentHTML("afterend", html)
                } else {
                     var html;
                     html = '<article class="book_item" id="itemContent'+row['id']+'">'
                     html += '<h3 id="bookTitle'+row['id']+'">'+row['judul']+'</h3>'
                     html += '<p>Penulis: <span id="textPenulis'+row['id']+'">'+row['penulis']+'</span></p>'
                     html += '<p>Tahun: <span id="textTahun'+row['id']+'">'+row['tahun']+'</span></p>'
                     html += '<input type="hidden" id="check'+row['id']+'" value="'+row['check']+'"></div>'
                     html += '<div class="action">'
                     html += '<button class="red" onclick="destroy('+row['id']+')">Hapus buku</button>'
                     html += '<button class="green" onclick="rollback('+row['id']+')">Rollback</button>'
                     html += '</div>'
                     html += '</article>'
                 
                     document.getElementById('completeBookshelfList').insertAdjacentHTML("afterend", html)
                 }
             }
         })
     });
}

document.getElementById('searchBookTitle').addEventListener("keypress", function(e) {
    if (e.key === 'Enter') {
        document.getElementById('searchSubmit').click();
        e.preventDefault();
      }
})

document.getElementById('searchSubmit').addEventListener("click", function() {
    test(document.getElementById('searchBookTitle').value);
    
})

document.getElementById('bookSubmit').addEventListener("click", function() {
    var judul = document.getElementById('judul');
    var penulis = document.getElementById('penulis');
    var tahun = document.getElementById('tahun');
    if (judul.value == '') {
        alert("Judul harus di isi");
        return false;
    }
    if (penulis.value == '') {
        alert("Penulis harus di isi");
        return false;
    }
    if (tahun.value == '') {
        alert("Tahun harus di isi");
        return false;
    }
    var inputBookIsComplete = document.getElementById('inputBookIsComplete');
    var key = new Date().getTime();
    var array = [];
    var html;
    html = '<article class="book_item" id="itemContent'+key+'">';
    html += '<h3 id="bookTitle'+key+'"></h3>';
    html += '<p>Penulis: <span id="textPenulis'+key+'"></span></p>';
    html += '<p>Tahun: <span id="textTahun'+key+'"></span></p>';
    html += '<input type="hidden" id="check'+key+'"></div>';
    html += '<div class="action">';
    html += '<button class="red" onclick="destroy('+key+')">Hapus buku</button>';
    if (inputBookIsComplete.checked) {
        html += '<button class="green" onclick="rollback('+key+')">Rollback</button>';
    } else {
        html += '<button class="green" onclick="done('+key+')">Selesai dibaca</button>';
    }
    html += '</div>';
    html += '</article>';
    if (inputBookIsComplete.checked) {
        document.getElementById('completeBookshelfList').insertAdjacentHTML("afterend", html);
        document.getElementById('completeBookshelfList').style.display = 'block';
        document.getElementById('bookTitle'+key).innerHTML = judul.value;
        document.getElementById('textPenulis'+key).innerHTML = penulis.value;
        document.getElementById('textTahun'+key).innerHTML = tahun.value;
        document.getElementById('check'+key).value = inputBookIsComplete.checked;
        array.push({
            'id': key,
            'judul': judul.value,
            'penulis': penulis.value,
            'tahun': tahun.value,
            'check': inputBookIsComplete.checked,
            'status': 'done'
        })
        window.localStorage.setItem(key, JSON.stringify(array))
        reset()
    } else {
        document.getElementById('incompleteBookshelfList').insertAdjacentHTML("afterend", html);
        document.getElementById('incompleteBookshelfList').style.display = 'block';
        document.getElementById('bookTitle'+key).innerHTML = judul.value;
        document.getElementById('textPenulis'+key).innerHTML = penulis.value;
        document.getElementById('textTahun'+key).innerHTML = tahun.value;
        document.getElementById('check'+key).value = inputBookIsComplete.checked;
        array.push({
            'id': key,
            'judul': judul.value,
            'penulis': penulis.value,
            'tahun': tahun.value,
            'check': inputBookIsComplete.checked,
            'status': 'false'
        })
        window.localStorage.setItem(key, JSON.stringify(array))
        reset();
    }
})

 function reset() {
    document.getElementById('judul').value = '';
    document.getElementById('penulis').value = '';
    document.getElementById('tahun').value = '';
    document.getElementById('inputBookIsComplete').checked = false;
}

function done(id) {
    var array = [];
    var judul = document.getElementById('bookTitle'+id);
    var penulis = document.getElementById('textPenulis'+id);
    var tahun = document.getElementById('textTahun'+id);
    var check = document.getElementById('check'+id).checked = true;
    array.push({
        'id': id,
        'judul': judul.innerHTML,
        'penulis': penulis.innerHTML,
        'tahun': tahun.innerHTML,
        'check': check,
        'status': 'done'
    })
    window.localStorage.setItem(id, JSON.stringify(array))
    var html;
    html = '<article class="book_item" id="itemContent'+id+'">'
    html += '<h3 id="bookTitle'+id+'">'+judul.innerHTML+'</h3>'
    html += '<p>Penulis: <span id="textPenulis'+id+'">'+penulis.innerHTML+'</span></p>'
    html += '<p>Tahun: <span id="textTahun'+id+'">'+tahun.innerHTML+'</span></p>'
    html += '<input type="hidden" id="check'+id+'" value="'+check.checked+'"></div>'
    html += '<div class="action">'
    html += '<button class="red" onclick="destroy('+id+')">Hapus buku</button>'
    html += '<button class="green" onclick="rollback('+id+')">Rollback</button>'
    html += '</div>'
    html += '</article>'
    document.getElementById('itemContent'+id).remove();
    document.getElementById('completeBookshelfList').insertAdjacentHTML("afterend", html)
}

function rollback(id) {
    window.localStorage.removeItem(id)
    var array = [];
    var judul = document.getElementById('bookTitle'+id);
    var penulis = document.getElementById('textPenulis'+id);
    var tahun = document.getElementById('textTahun'+id);
    var check = document.getElementById('check'+id).checked = true;
    array.push({
        'id': id,
        'judul': judul.innerHTML,
        'penulis': penulis.innerHTML,
        'tahun': tahun.innerHTML,
        'check': check,
        'status': 'false'
    })
    window.localStorage.setItem(id, JSON.stringify(array))
    var html;
    html = '<article class="book_item" id="itemContent'+id+'">'
    html += '<h3 id="bookTitle'+id+'">'+judul.innerHTML+'</h3>'
    html += '<p>Penulis: <span id="textPenulis'+id+'">'+penulis.innerHTML+'</span></p>'
    html += '<p>Tahun: <span id="textTahun'+id+'">'+tahun.innerHTML+'</span></p>'
    html += '<input type="hidden" id="check'+id+'" value="'+check.checked+'"></div>'
    html += '<div class="action">'
    html += '<button class="red" onclick="destroy('+id+')">Hapus buku</button>'
    html += '<button class="green" onclick="done('+id+')">Selesai dibaca</button>'
    html += '</div>'
    html += '</article>'

    document.getElementById('itemContent'+id).remove();
    document.getElementById('incompleteBookshelfList').insertAdjacentHTML("afterend", html)
}

function destroy(id) {
    var message = confirm("Apakah anda yakin ingin mengahapus data ini?");
    if (message == true) {
        window.localStorage.removeItem(id)
        document.getElementById('itemContent'+id).remove();
    }
}