hora()
hora1()
function calc()
{
//para tomar los valores de la pantalla de la calculadora 
    edt = document.getElementById("inputResultado");
//resolver la operaciones 
    nuevo = document.getElementById("a").textContent;
    edt.value = nuevo;
}
function calc1()
{
//para tomar los valores de la pantalla de la calculadora 
    edt = document.getElementById("inputResultado");
//resolver la operaciones 
    nuevo = document.getElementById("b").textContent;
    edt.value = nuevo;
}

function calc2()
{
//para tomar los valores de la pantalla de la calculadora 
    edt = document.getElementById("inputretirar");
//resolver la operaciones 
    nuevo = document.getElementById("b").textContent;
    edt.value = nuevo;
}

function retirar()
{ 
    a = document.getElementById("inputretirar").value;
    pantalla =document.getElementById("id").value;
    pantalla.value = a;
}

function nose()
{
    edt = document.getElementById("inputretirar").value;
    a = document.getElementById("saldo").value;
    if( a >= edt)
    {
    pot()
    po()
    pota()
    potsaa()
    }
    else
    {
        alert("no tienes suficiente dinero")
    }
}

function pot()
{
    edt = document.getElementById("inputretirar").value;
    a = document.getElementById("saldo").value;
    resultado = a - edt;
    pantalla = document.getElementById("saldo1");
    pantalla.value = resultado;
}

function po()
{
    edt = document.getElementById("inputretirar").value;
    a = document.getElementById("saldo").value;
    resultado = a - edt;
    a.value = resultado;
}
function pota()
{
    edt = document.getElementById("inputretirar").value;
    pantalla = document.getElementById("totalretirar");
    pantalla.value = edt;
}
function potsaa()
{
    edt = document.getElementById("inputResultado").value;
    pantalla = document.getElementById("cuentaretirar");
    pantalla.value = edt;
}
function pota1()
{
    edt = document.getElementById("inputretirar").value;
    pantalla = document.getElementById("dinerore");
    pantalla.value = edt;
}
function hora()
{
    document.querySelector(".hora").innerHTML = Date();
}
function hora1()
{
    document.querySelector(".hora1").innerHTML = Date();
}