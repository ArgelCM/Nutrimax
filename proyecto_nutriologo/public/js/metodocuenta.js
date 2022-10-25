function borrar()
{
    a = document.querySelector(".a")
    b = document.querySelector(".b")
    c = document.querySelector(".c")
    d = document.querySelector(".d")

    a.value = "";
    b.value = "";
    c.value = "";
    d.value = "";
}

function agregar()
{
    var a = document.getElementById("a").value;


    
        nuevotarjeta(a);
        borrar();

}

function nuevotarjeta(a)
{
    card = document.querySelector(".Contenedorpadrecuentabancaria")
    var a = document.getElementById("a").value;
    var b = document.getElementById("b").value;
    var c = document.getElementById("c").value;
    var d = document.getElementById("d").value;

            const shoppingCartRow = document.createElement('div');
            const content = `
            <div class="card shadow mb-3 " >
                <div class="card-header py-3">
                  <p class="text-dark m-0 fw-bold">Cuenta Bancaria</p>
                </div>
                <div class="card-body">
                  <form>
                    <div class="row">
                      <div class="col-xl-6">
                        <i class="bi bi-wallet-fill"></i>
                      </div>
                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label" for="username"
                            ><strong>Cuenta interbancaria</strong></label
                          >
                        </div>
                        <label
                          class="form-label"
                          style="
                            padding-bottom: 0px;
                            margin-bottom: 3px;
                            padding-top: 0px;
                            margin-top: -1px;
                          "
                          >${d}</label
                        >
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label" for="first_name"
                            ><strong>R.F.C</strong></label
                          >
                        </div>
                        <label class="form-label">${c}</label>
                      </div>
                      <div class="col">
                        <div class="mb-3">
                          <label class="form-label" for="last_name"
                            ><strong>Banco</strong></label
                          >
                        </div>
                        <label class="form-label">${b}</label>
                      </div>
                    </div>
                    <div class="mb-3">
                      <button
                        class="btn btn-danger btn-sm"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#ec"
                      >
                        Eliminar</button
                      ><button
                        class="btn btn-primary btn-sm"
                        type="button"
                        style="margin-left: 29px"
                        data-bs-toggle="modal"
                        data-bs-target="#ac"
                      >
                        Editar
                      </button>
                    </div>
                  </form>
                </div>
            </div>
            
            `

            shoppingCartRow.innerHTML = content;
            card.append(shoppingCartRow)



}