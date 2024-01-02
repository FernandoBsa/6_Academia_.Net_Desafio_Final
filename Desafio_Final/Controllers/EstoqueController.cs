using Desafio_Final.Filter;
using Desafio_Final.Interfaces;
using Desafio_Final.Models;
using Desafio_Final.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Desafio_Final.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstoqueController : ControllerBase
    {
        private readonly IEstoqueService _estoqueService;
        public EstoqueController(IEstoqueService estoqueService)
        {
            _estoqueService = estoqueService;
        }

        [HttpPost]
        [Route("CadastroProduto")]
        public IActionResult CadastroProduto([FromBody] CadastroEstoqueViewModel produtoViewModel)
        {
            try
            {
                if (produtoViewModel == null)
                {
                    return BadRequest(new { error = "Dados do produto inválidos." });
                }

                var (sucesso, mensagem) = _estoqueService.CadastrarProduto(produtoViewModel);

                if (sucesso)
                {
                    return Ok(new { success = mensagem });
                }
                else
                {
                    return BadRequest(new { error = mensagem });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Ocorreu um erro ao processar a solicitação." });
            }
        }


        [HttpGet]
        [Route("ConsultarTodosProdutos")]
        public IActionResult ConsultarTodosProdutos()
        {
            try
            {
                var produtos = _estoqueService.ConsultarTodosProdutos();

                if (produtos == null || !produtos.Any())
                {
                    return NotFound(new { error = "Nenhum produto encontrado." });
                }

                return Ok(produtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Ocorreu um erro ao processar a solicitação." });
            }
        }

        [HttpPut]
        [Route("AlterarProduto")]
        public IActionResult AlterarProduto([FromBody] EstoqueViewModel produtoViewModel)
        {
            try
            {
                if (produtoViewModel == null || produtoViewModel.Id <= 0)
                {
                    return BadRequest(new { error = "Dados do produto inválidos." });
                }

                if (_estoqueService.AlterarProduto(produtoViewModel))
                {
                    return Ok(new { success = "Produto alterado com sucesso." });
                }

                return NotFound(new { error = "Produto não encontrado." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Ocorreu um erro ao processar a solicitação." });
            }
        }

        [HttpDelete]
        [Route("ExcluirProduto/{produtoId}")]
        public IActionResult ExcluirProduto(int produtoId)
        {
            try
            {
                var mensagem = _estoqueService.VerificarMovimentoRegistrado(produtoId);

                if (mensagem != null)
                {
                    return BadRequest(new { error = mensagem });
                }

                if (_estoqueService.ExcluirProduto(produtoId))
                {
                    return Ok(new { success = "Produto excluído com sucesso." });
                }

                return NotFound(new { error = "Produto não encontrado." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Ocorreu um erro ao processar a solicitação." });
            }

        }

        [HttpGet]
        [Route("FiltrarProdutos")]
        public IActionResult FiltrarProdutos([FromQuery] FiltroProdutos filtro)
        {
            try
            {
                var produtos = _estoqueService.FiltrarProdutos(filtro);

                if (produtos == null || !produtos.Any())
                {
                    return NotFound(new { error = "Nenhum produto encontrado com os filtros fornecidos." });
                }

                return Ok(produtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Ocorreu um erro ao processar a solicitação." });
            }
        }

        [HttpGet]
        [Route("ObterDetalhesProduto/{produtoId}")]
        public IActionResult ObterDetalhesProduto(int produtoId)
        {
            try
            {
                var produto = _estoqueService.ObterDetalhesProduto(produtoId);

                if (produto != null)
                {
                    return Ok(produto);
                }
                else
                {
                    return NotFound(new { error = "Produto não encontrado." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Ocorreu um erro ao obter os detalhes do produto." });
            }
        }

    }
}
