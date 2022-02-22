document.getElementById('bookSubmit').addEventListener("click", function() {
    var judul = document.getElementById('judul')
    var penulis = document.getElementById('penulis')
    var tahun = document.getElementById('tahun')
    var inputBookIsComplete = document.getElementById('inputBookIsComplete')
    var key = new Date().getTime();
    var html;
    html = '<article class="book_item" id="itemContent'+key+'">'
    html += '<h3 id="bookTitle'+key+'"></h3>'
    html += '<p>Penulis: <span id="textPenulis'+key+'"></span></p>'
    html += '<p>Tahun: <span id="textTahun'+key+'"></span></p>'
    html += '<input type="hidden" id="check'+key+'"></div>'
    html += '<div class="action">'
    html += '<button class="red" onclick="destroy('+key+')">Hapus buku</button>'
    if (inputBookIsComplete.checked) {
        html += '<button class="green" onclick="rollback('+key+')">Rollback</button>'
    } else {
        html += '<button class="green" onclick="done('+key+')">Selesai dibaca</button>'
    }
    html += '</div>'
    html += '</article>'
    if (inputBookIsComplete.checked) {
        var array = [];
        document.getElementById('completeBookshelfList').insertAdjacentHTML("afterend", html)
        document.getElementById('completeBookshelfList').style.display = 'block';
        document.getElementById('bookTitle'+key).innerHTML = judul.value;
        document.getElementById('textPenulis'+key).innerHTML = penulis.value;
        document.getElementById('textTahun'+key).innerHTML = tahun.value;
        document.getElementById('check'+key).value = inputBookIsComplete.checked;
        array.push({
            'judul': judul.value, 'penulis': penulis.value, 'tahun': tahun.value
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
        reset();
    }
})

 function reset() {
    document.getElementById('judul').value = '';
    document.getElementById('penulis').value = '';
    document.getElementById('tahun').value = '';
}

function done(id) {
    var array = [];
    var judul = document.getElementById('bookTitle'+id);
    var penulis = document.getElementById('textPenulis'+id);
    var tahun = document.getElementById('textTahun'+id);
    var check = document.getElementById('check'+id).checked = true;
    array.push({
        'judul': judul.innerHTML, 'penulis': penulis.innerHTML, 'tahun': tahun.innerHTML, 'check': check
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
        'judul': judul.innerHTML, 'penulis': penulis.innerHTML, 'tahun': tahun.innerHTML, 'check': check
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