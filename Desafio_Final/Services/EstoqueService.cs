using Desafio_Final.Filter;
using Desafio_Final.Interfaces;
using Desafio_Final.Models;
using Desafio_Final.ViewModel;

namespace Desafio_Final.Services
{
    public class EstoqueService : IEstoqueService
    {
        private readonly EstoqueContext _contexto;

        public EstoqueService(EstoqueContext contexto)
        {
            _contexto = contexto;
        }

        public List<EstoqueViewModel> ConsultarTodosProdutos()
        {
            try
            {
                var produtos = _contexto.Estoques.Select(e => new EstoqueViewModel
                {
                    Id = e.Id,
                    NomeProduto = e.NomeProduto,
                    Fabricante = e.Fabricante,
                    Quantidade = (int)e.Quantidade,
                    PrecoUnitario = (decimal)e.PrecoUnitario
                }).ToList();

                return produtos;
            }
            catch (Exception ex)
            {             
                throw new Exception("Ocorreu um erro ao consultar os produtos.");
            }
        }

        public List<EstoqueViewModel> FiltrarProdutos(FiltroProdutos filtro)
        {
            try
            {
                var query = _contexto.Estoques.AsQueryable();

                if (!string.IsNullOrWhiteSpace(filtro.NomeProduto))
                {
                    query = query.Where(e => e.NomeProduto.Contains(filtro.NomeProduto));
                }

                if (!string.IsNullOrWhiteSpace(filtro.Fabricante))
                {
                    query = query.Where(e => e.Fabricante.Contains(filtro.Fabricante));
                }

                if (filtro.QuantidadeDe != null)
                {
                    query = query.Where(e => e.Quantidade >= filtro.QuantidadeDe);
                }

                if (filtro.QuantidadeAte != null)
                {
                    query = query.Where(e => e.Quantidade <= filtro.QuantidadeAte);
                }

                var result = query.ToList();

                var produtos = result.Select(e => new EstoqueViewModel
                {
                    Id = e.Id,
                    NomeProduto = e.NomeProduto,
                    Fabricante = e.Fabricante,
                    Quantidade = (int)e.Quantidade,
                    PrecoUnitario = (decimal)e.PrecoUnitario
                }).ToList();

                return produtos;
            }
            catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao filtrar os produtos.");
            }

        }

        public (bool, string) CadastrarProduto(CadastroEstoqueViewModel produtoViewModel)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(produtoViewModel.NomeProduto) ||
                    string.IsNullOrWhiteSpace(produtoViewModel.Fabricante) ||
                    string.IsNullOrWhiteSpace(produtoViewModel.Quantidade.ToString()) ||
                    string.IsNullOrWhiteSpace(produtoViewModel.PrecoUnitario.ToString()) ||
                    produtoViewModel.Quantidade <= 0 ||
                    produtoViewModel.PrecoUnitario <= 0)
                {
                    return (false, "Todos os campos são obrigatórios.");
                }

                var produtoExistente = _contexto.Estoques
                    .FirstOrDefault(p => p.NomeProduto == produtoViewModel.NomeProduto);

                if (produtoExistente != null)
                {
                    return (false, "Produto já cadastrado.");
                }

                var novoProduto = new Estoque
                {
                    NomeProduto = produtoViewModel.NomeProduto,
                    Fabricante = produtoViewModel.Fabricante,
                    Quantidade = produtoViewModel.Quantidade,
                    PrecoUnitario = produtoViewModel.PrecoUnitario
                };

                _contexto.Estoques.Add(novoProduto);
                _contexto.SaveChanges();

                return (true, "Produto cadastrado com sucesso.");
            }
            catch (Exception ex)
            {
                return (false, "Ocorreu um erro ao cadastrar o produto.");
            }
        }

        public bool ExcluirProduto(int produtoId)
        {
            try
            {
                var produto = _contexto.Estoques.Find(produtoId);

                if (produto == null)
                {
                    return false;
                }

                _contexto.Estoques.Remove(produto);
                _contexto.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool AlterarProduto(EstoqueViewModel produtoViewModel)
        {
            try
            {
                var produtoExistente = _contexto.Estoques.Find(produtoViewModel.Id);

                if (produtoExistente == null)
                {
                    return false;
                }

                produtoExistente.NomeProduto = produtoViewModel.NomeProduto;              
                produtoExistente.Fabricante = produtoViewModel.Fabricante;
                produtoExistente.Quantidade = produtoViewModel.Quantidade;
                produtoExistente.PrecoUnitario = produtoViewModel.PrecoUnitario;

                _contexto.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public string VerificarMovimentoRegistrado(int produtoId)
        {
            try
            {
                bool movimentoRegistrado = _contexto.LogEntradaSaida.Any(log => log.ProdutoId == produtoId);

                if (movimentoRegistrado)
                {
                    return "Não é possível excluir o produto, pois há movimentos registrados.";
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return "Ocorreu um erro ao verificar os movimentos registrados.";
            }
        }

        public EstoqueViewModel ObterProduto(int produtoId)
        {
            try
            {
                var produto = _contexto.Estoques
                    .Where(e => e.Id == produtoId)
                    .Select(e => new EstoqueViewModel
                    {
                        Id = e.Id,
                        NomeProduto = e.NomeProduto,
                        Fabricante = e.Fabricante,
                        Quantidade = (int)e.Quantidade,
                        PrecoUnitario = (decimal)e.PrecoUnitario
                    })
                    .FirstOrDefault();

                return produto;
            }
            catch (Exception ex)
            {
                throw new Exception("Ocorreu um erro ao obter os detalhes do produto.");
            }
        }

    }   
}
