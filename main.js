const baseURL = "http://10.10.24.141/senggol/api/index.php/daftar";

function htmlizeResponse(res) {
    return (
        `<div class="alert alert-secondary mt-2" role="alert"><pre>` +
        JSON.stringify(res, null, 2) +
        "</pre></div>"
    );
}

async function postData() {
    let resultElement = document.getElementById("postResult");
    resultElement.innerHTML = "";
    const nik = document.getElementById("post-nik").value;
    const nama = document.getElementById("post-nama").value;
    const alamat = document.getElementById("post-alamat").value;
    const surel = document.getElementById("post-surel").value;
    const postData = {
        nik: nik,
        nama: nama,
        alamat: alamat,
        surel: surel
    };
    try {
        const res = await fetch(`${baseURL}`, {
            method: "post",
            body: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
        }
        const data = await res.json();
        const result = {
            status: res.status + "-" + res.statusText,
            headers: {
                "Content-Type": res.headers.get("Content-Type"),
                "Content-Length": res.headers.get("Content-Length"),
            },
            data: data,
        };
        resultElement.innerHTML = htmlizeResponse(result);
    } catch (err) {
        resultElement.innerHTML = htmlizeResponse(err.message);
    }
}

function clearPostOutput() {
    document.getElementById("postResult").innerHTML = "";
}