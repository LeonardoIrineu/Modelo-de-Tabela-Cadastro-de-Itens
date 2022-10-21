class Produto {

    constructor() {
        this.id = 1
        this.arrayProdutos = []
        this.editId = null
    }

    salvar() {
       let produto = this.lerDados()

      if(this.validaCampos(produto)) {
            if(this.editId == null) {
                this.adicionar(produto) 
            } else {
                this.atualizar(this.editId, produto)
            }
                  
      } 

       this.listaTabela()
       this.cancelar()
    }

    listaTabela() {
        let tbody = document.querySelector('#tbody')
        tbody.innerText = ''

        for(let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow()

            let td_id = tr.insertCell()
            let td_produto = tr.insertCell()
            let td_valor = tr.insertCell()
            let td_acoes = tr.insertCell()

            td_id.innerText = this.arrayProdutos[i].id
            td_produto.innerText = this.arrayProdutos[i].nomeProduto
            td_valor.innerText = this.arrayProdutos[i].precoProduto
            
            td_id.classList.add('center')

            let imgEdit = document.createElement('img')
            imgEdit.src = 'img/edit.png'
            imgEdit.setAttribute('onclick', 'produto.editarProduto('+ JSON.stringify(this.arrayProdutos[i]) +')')

            let imgDelet = document.createElement('img')
            imgDelet.src = 'img/delet.png'
            imgDelet.setAttribute('onclick','produto.deletar('+this.arrayProdutos[i].id+')')

            td_acoes.appendChild(imgEdit)
            td_acoes.appendChild(imgDelet)
        }

    }

    adicionar(produto) {
        produto.precoProduto = parseFloat(produto.precoProduto)
        this.arrayProdutos.push(produto)
        this.id++
    }

    atualizar(id, produto) {
        for(let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto
                this.arrayProdutos[i].precoProduto = produto.precoProduto
            }
        }
    }

    editarProduto(dados) {
        this.editId = dados.id

        document.querySelector('#produto').value = dados.nomeProduto
        document.querySelector('#preco').value = dados.precoProduto

        document.querySelector('#atualizar').innerText = 'Atualizar'
    }

    lerDados() {
        let produto = {}

        produto.id = this.id
        produto.nomeProduto = document.querySelector('#produto').value
        produto.precoProduto = document.querySelector('#preco').value
        return produto
    }

    validaCampos(produto) {
        let msg = ''

        if(produto.nomeProduto == '') {
            msg += '- informe o nome do produto \n'
        }

        if(produto.precoProduto == '') {
            msg += '- informe o preço do produto \n'
        }

        if(msg != '') {
            alert(msg)
            return false
        }

        return true
    }

    cancelar() {
        document.querySelector('#produto').value = ''
        document.querySelector('#preco').value = ''

        document.querySelector('#atualizar').innerText = 'Salvar'
        this.editId = null
    }

    deletar(id) {
        if( confirm('Deseja deletar o produto ID' + id)) {
            let tbody = document.querySelector('#tbody')

            for(let i = 0; i < this.arrayProdutos.length;i++){
                if(this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1)
                    tbody.deleteRow(i)
                }
            }

        }
    }
}

var produto = new Produto()