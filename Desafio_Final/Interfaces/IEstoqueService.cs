﻿using Desafio_Final.Filter;
using Desafio_Final.Models;
using Desafio_Final.ViewModel;

namespace Desafio_Final.Interfaces
{
    public interface IEstoqueService
    {
        List<EstoqueViewModel> ConsultarTodosProdutos();
        bool CadastrarProduto(CadastroEstoqueViewModel produtoViewModel);
        bool ExcluirProduto(int produtoId);
        bool AlterarProduto(EstoqueViewModel produtoViewModel);
        List<EstoqueViewModel> FiltrarProdutos(FiltroProdutos filtro);


    }
}
