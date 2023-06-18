let btnDownload = document.getElementById("btnDownload");
let xmlArchive = document.getElementById("arquivo");
let warningStatusIct = document.getElementById("warningStatusIct");
let dollarBox = document.getElementById("dollarBox");
let firstInputBox = document.querySelector(".profileFirstField");
let secondInputBox = document.getElementById("btnSend");
let boxSegundoPasso = document.querySelector(".profileSecondField");
let radio = document.querySelector("#radioTestesEspeciais"); // alterar nome da variavel para ficar legível
let radioMoreTests = document.querySelector("#radioTestesEspeciais2"); // alterar nome da variavel para ficar legível

function selecionarArquivo() {
  document.getElementById("arquivo").click();
}

boxSegundoPasso.addEventListener("click", function () {
  if (boxSegundoPasso.value == "Sim") {
    radio.style.display = "block";
    radioMoreTests.style.display = "block";
  } else if (boxSegundoPasso.value == "Não" || boxSegundoPasso.value == "") {
    radio.style.display = "none";
    radioMoreTests.style.display = "none";
  }
});

secondInputBox.addEventListener("click", function (e) {
  e.preventDefault();
});

btnDownload.addEventListener("click", function (e) {
  e.preventDefault();
  profileOrderFromUser(firstInputBox.value);
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

async function sendArchiveXML() {
  const formData = new FormData();
  formData.append("xlsx", xmlArchive.files[0], "arquivo");

  let sla = fetch(`http://localhost:3333/infoStructureInfosFromUser`, {
    method: "POST",
    body: formData,
  });
  if ((await sla).status == 200) {
    alert("Requisição feita com sucesso !");
    // warningStatusIct.innerHTML += "Requisição feita com sucesso !";
  } else {
    alert(
      "Arquivo com extensão errada, selecione um arquivo de extensão xml !"
    );
  }
}

let profileOrderFromUser = async (valor) => {
  let corpo = {
    profile: valor,
  };
  let corpoJSON = JSON.stringify(corpo);
  sendDataProfile(corpoJSON);
};

async function sendDataProfile(objvalorCampos) {
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
