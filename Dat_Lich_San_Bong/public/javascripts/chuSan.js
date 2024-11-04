async function addSanBong() {
    const form = document.getElementById('sanBongForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/add-field', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const newSanBong = await response.json();
            appendToTable(newSanBong);
            form.reset(); 
        } else {
            console.error('Failed to add Sân Bóng');
        }
    } catch (error) {
        console.error(error);
    }
}

function appendToTable(sanBong) {
    const tableBody = document.getElementById('sanBongTableBody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${tableBody.children.length + 1}</td>
        <td>${sanBong.tenSan}</td>
        <td>${sanBong.diaDiem}</td>
        <td>${sanBong.giaTheoGio}</td>
        <td>${sanBong.trangThai}</td>
        <td>
            <button onclick="editUser('${sanBong._id}')">Edit</button>
            <form action="/delete-post/${sanBong._id}?_method=DELETE" method="post">
                <input type="submit" value="Delete" class="btn-delete">
            </form>
        </td>
    `;
    tableBody.appendChild(newRow);
}
