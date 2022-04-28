const form = document.querySelector('.form') as HTMLFormElement;
const cadastrar = document.querySelector('.cadastrar') as HTMLButtonElement;
const cancelar = document.querySelector('.cancelar') as HTMLButtonElement;

//Captura evento de click
cadastrar.addEventListener('click', () => {
    aluno.cadastrar();
});

cancelar.addEventListener('click', () => {
    aluno.cancelar();
});

//Previne envio do formulário
form.addEventListener('submit', function (event) {
    event.preventDefault();
})

class Aluno {
    nome = document.querySelector('#nome') as HTMLInputElement;
    sobrenome = document.querySelector('#sobrenome') as HTMLInputElement;
    nota1 = document.querySelector('#nota1') as HTMLInputElement;
    nota2 = document.querySelector('#nota2') as HTMLInputElement;
    nota3 = document.querySelector('#nota3') as HTMLInputElement;
    listaAlunos: any = [];

    //salva aluno no array
    cadastrar() {

        if (this.validaDados()) { //chama validaDados
            const aluno = this.recebeDados(); //chama recebeDados
            this.listaAlunos.push(aluno);
            this.limpaErro() //limpa inputs em caso de erro na listagem anterior
            this.criaLista(); //cria lista com os dados do aluno
            this.cancelar(); //limpa o input para nova entrada
        } else {
            this.exibeErro()
        }
    }

    criaLista() {
        const tbody = document.querySelector('#tbody') as HTMLTableElement;
        tbody.innerHTML = ''

        for (let i in this.listaAlunos) {
            let tr = tbody.insertRow(); //função do JS para criar nova linha dentro da tabela
            let tdNome = tr.insertCell();
            let tdMedia = tr.insertCell();
            let tdStatus = tr.insertCell();

            tdNome.innerText = this.listaAlunos[i].nomeCompleto.toUpperCase();
            tdMedia.innerText = this.listaAlunos[i].media.toFixed(2);
            tdStatus.innerText = this.listaAlunos[i].status.toUpperCase();

            //cor do status
            if (tdStatus.innerText == 'REPROVADO') {
                tdStatus.className += 'reprovado'
            } else if (tdStatus.innerText == 'APROVADO') {
                tdStatus.className += 'aprovado';
            }
        }
    }

    //salva dados do aluno no objeto aluno
    recebeDados() {

        let aluno: {
            nome: string, sobrenome: string, nomeCompleto?: string, nota1: number, nota2: number, nota3: number, media?: number, status?: string, id?: number
        } = {
            nome: this.nome.value,
            sobrenome: this.sobrenome.value,
            nota1: Number(this.nota1.value),
            nota2: Number(this.nota2.value),
            nota3: Number(this.nota3.value),
        }

        aluno.media = this.calculaMedia(aluno.nota1, aluno.nota2, aluno.nota3);
        aluno.status = this.confereStatus(aluno.media);
        aluno.nomeCompleto = `${aluno.nome} ${aluno.sobrenome}`;

        return aluno;
    }

    validaDados(): boolean {
        const aluno = this.recebeDados();

        if (
            this.nome.value == '' || this.sobrenome.value == '' || this.nota1.value == '' || this.nota2.value == '' || this.nota3.value == '') return false;
        return true;
    }

    calculaMedia(n1: number, n2: number, n3: number): number {
        let media = 0;

        media = ((n1 + n2 + n3) / 3);
        return media
    }

    confereStatus(media: number): string {
        let status;
        if (media >= 6) {
            status = 'APROVADO';
        } else {
            status = 'REPROVADO';
        }
        return status;
    }

    cancelar() {
        this.nome.value = '';
        this.sobrenome.value = '';
        this.nota1.value = '';
        this.nota2.value = '';
        this.nota3.value = '';

        this.nome.focus();
    }

    exibeErro() {

        if (this.nome.value == '') {
            this.nome.className = 'erro';
        }

        if (this.sobrenome.value == '') {
            this.sobrenome.className = 'erro';
        }

        if (this.nota1.value == '' || this.nota2.value == '' || this.nota3.value == '') {
            this.nota1.className = 'erro';
            this.nota2.className = 'erro';
            this.nota3.className = 'erro';
        }
    }

    limpaErro() {
        if (this.nome.value !== '') {
            this.nome.className = '';
        }

        if (this.sobrenome.value !== '') {
            this.sobrenome.className = '';
        }

        if (this.nota1.value !== '' || this.nota2.value !== '' || this.nota3.value !== '') {
            this.nota1.className = '';
            this.nota2.className = '';
            this.nota3.className = '';
        }
    }

}
const aluno = new Aluno();
