// const { config } = require("bower/lib");

let btnDownload = document.getElementById("btnDownload");
let xmlArchive = document.getElementById("arquivo");
// let xmlFile = document.getElementById("sendArchive");
let dollarBox = document.getElementById("dollarBox");
let firstInputBox = document.querySelector(".profileFirstField");
let secondInputBox = document.getElementById("btnSend");
let boxSegundoPasso = document.querySelector(".profileSecondField");
let radio = document.querySelector("#radioTestesEspeciais"); // alterar nome da variavel para ficar legível
let radioMoreTestes = document.querySelector("#radioTestesEspeciais2"); // alterar nome da variavel para ficar legível
// let profileMil = document.querySelector(".1000");

function selecionarArquivo() {
  document.getElementById("arquivo").click();
}

boxSegundoPasso.addEventListener("blur", function () {
  if (boxSegundoPasso.value == "Sim") {
    radio.style.display = "block";
    radioMoreTestes.style.display = "block";
  } else if (boxSegundoPasso.value == "Não" || boxSegundoPasso.value == "") {
    radio.style.display = "none";
    radioMoreTestes.style.display = "none";
  }
});

secondInputBox.addEventListener("click", function (e) {
  e.preventDefault();
});

btnDownload.addEventListener("click", function (e) {
  e.preventDefault();
  sendDataOfProfile(firstInputBox.value);
  window.location.href = `${baseURL()}/downloadQuotation`;
});

async function getDollar() {
  let config = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const response = await fetch(`${dollarURL()}/USD-BRL/30`, config);
    if (response.status == 200) {
      let dolResponse = await response.json();
      const dolLast30Days = dolResponse.map((dolHigh) => {
        let sla = parseFloat(dolHigh.high);
        return sla;
      });
      const dollastDay = dolLast30Days.reduce(
        (acumulador, numero) => acumulador + numero,
        0
      );
      let mediaDollar = dollastDay / dolLast30Days.length;
      showDollar(mediaDollar.toFixed(5));
    } else {
      throw response;
    }
  } catch (error) {
    responseErro(error);
  }
}

getDollar();

let showDollar = (todaysDollar) => {
  dollarBox.innerHTML += `Dólar: ${todaysDollar}`;
};

// async function sendArchive(objArquivosUpload) {
//   let configs = {
//     method : "POST";
//     headers : {
//       "Content-type": "application/json",
//   }
//     body: objArquivosUpload
//     const formData = new FormData();
//     formData.append("arquivo", xmlArchive.files[0], "ict_cost_model");
//   // const urlEnconded = new URLSearchParams();
//   // formData.toString();
//   // console.log(formData);
//   // console.log(urlEnconded);
//   // console.log(formData);

//   try {
//     const resposta = await fetch(
//       `http://localhost:3333/infoStructureInfosFromUser`,
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     const dados = await resposta.json();
//     console.log(dados);
//   } catch (erro) {
//     console.error(erro);
//   }
// }

secondInputBox.addEventListener("click", function (e) {
  e.preventDefault();
  sendDataOfProfile(firstInputBox.value);
});

let sendDataOfProfile = async (valor) => {
  let corpo = {
    profile: valor,
  };
  let corpoJSON = JSON.stringify(corpo);
  loginValida(corpoJSON);
};

async function loginValida(objvalorCampos) {
  let configs = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: objvalorCampos,
  };
  try {
    let requestProfile = await fetch(
      `${baseURL()}/loadStructureInfosFromUser`,
      configs
    );
    if (requestProfile.status == 201) {
      let requestProfileResponse = await requestProfile.json();
      console.log(requestProfileResponse);
    } else {
      throw requestProfile;
    }
  } catch (erro) {
    profileErro(erro);
  }
}

/* async function sendXml(xmlData) {
  let configs = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: xmlData,
  };
  try {
    let login = await fetch(`${baseURL()}/users/login`, configs);
    if (login.status == 201) {
      let loginResponse = await login.json();
      // botao de prevent, não envia enquanto o usuario não clicar no botão
      botao.addEventListener("click", function (e) {
        e.preventDefault();
        botao.style.display = "none";
        loading.style.display = "block";
        loading.style.marginTop = "10px";
        if ((erroLogin.style.display = "block")) {
          erroLogin.style.display = "none";
        }
        setTimeout(() => {
          loginSucesso(loginResponse);
        }, 4000);
      });
    } else {
      throw login;
    }
  } catch (erro) {
    // botao de prevent, não envia enquanto o usuario não clicar no botão
    botao.addEventListener("click", function (e) {
      e.preventDefault();
      loginErro(erro);
    });
  }
}

btnUploadXml.addEventListener(""); */
