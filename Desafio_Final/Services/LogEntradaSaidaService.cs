using Desafio_Final.Constants;
using Desafio_Final.Filter;
using Desafio_Final.Interfaces;
using Desafio_Final.Models;
using Desafio_Final.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace Desafio_Final.Services
{
    public class LogEntradaSaidaService : ILogEntradaSaidaService
    {
        private readonly EstoqueContext _contexto;

        public LogEntradaSaidaService(EstoqueContext contexto)
        {
            _contexto = contexto;
        }

        public bool EntradaProduto(LogEntradaSaidaViewModel logViewModel)
        {
            try
            {
                var produto = _contexto.Estoques.Find(logViewModel.ProdutoId);

                if (produto == null)
                {
                    return false;
                }

                produto.Quantidade += logViewModel.Quantidade;

                var logEntradaSaida = new LogEntradaSaida
                {
                    ProdutoId = logViewModel.ProdutoId,
                    Quantidade = logViewModel.Quantidade,
                    TipoMovimento = TipoEntradaLog.Entrada,
                    DataMovimento = DateTime.Now
                };

                _contexto.Estoques.Update(produto);
                _contexto.LogEntradaSaida.Add(logEntradaSaida);
                _contexto.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool SaidaProduto(LogEntradaSaidaViewModel logViewModel)
        {
            try
            {
                var produto = _contexto.Estoques.Find(logViewModel.ProdutoId);

                if (produto == null || produto.Quantidade < logViewModel.Quantidade)
                {
                    return false;
                }

                produto.Quantidade -= logViewModel.Quantidade;

                var logEntradaSaida = new LogEntradaSaida
                {
                    ProdutoId = logViewModel.ProdutoId,
                    Quantidade = logViewModel.Quantidade,
                    TipoMovimento = TipoEntradaLog.Saida,
                    DataMovimento = DateTime.Now
                };

                _contexto.Estoques.Update(produto);
                _contexto.LogEntradaSaida.Add(logEntradaSaida);
                _contexto.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<LogConsultaViewModel> ConsultarTodosOsLogs()
        {
            var logs = _contexto.LogEntradaSaida
                .Join(_contexto.Estoques,
                    log => log.ProdutoId,
                    estoque => estoque.Id,
                    (log, estoque) => new LogConsultaViewModel
                    {
                        Id = log.Id,
                        ProdutoId = (int)log.ProdutoId,
                        NomeProduto = estoque.NomeProduto,
                        Quantidade = (int)log.Quantidade,
                        TipoMovimento = log.TipoMovimento,
                        DataMovimento = log.DataMovimento                       
                    })
                .ToList();

                    return logs;
        }

        public List<LogConsultaViewModel> FiltrarLogs(FiltroLog filtro)
        {
            var query = _contexto.LogEntradaSaida
                .Include(e => e.Produto)
                .AsQueryable();

            if (filtro.ProdutoId != null)
            {
                query = query.Where(e => e.ProdutoId == filtro.ProdutoId);
            }

            if (!string.IsNullOrWhiteSpace(filtro.NomeProduto))
            {
                query = query.Where(e => e.Produto.NomeProduto.Contains(filtro.NomeProduto));
            }

            if (filtro.Quantidade != null)
            {
                query = query.Where(e => e.Quantidade == filtro.Quantidade);
            }

            if (!string.IsNullOrWhiteSpace(filtro.TipoMovimento))
            {
                query = query.Where(e => e.TipoMovimento == filtro.TipoMovimento);
            }

            if (filtro.DataMovimento != null)
            {
                query = query.Where(e => e.DataMovimento == filtro.DataMovimento);
            }

            var result = query.ToList();

            var logs = result.Select(e => new LogConsultaViewModel
            {
                Id = e.Id,
                ProdutoId = e.ProdutoId ?? 0,
                NomeProduto = e.Produto.NomeProduto,
                Quantidade = e.Quantidade ?? 0,
                TipoMovimento = e.TipoMovimento,
                DataMovimento = e.DataMovimento
            }).ToList();

            return logs;
        }

        public bool ExcluirLog(int logId)
        {
            try
            {
                var log = _contexto.LogEntradaSaida.Find(logId);

                if (log == null)
                {
                    return false;
                }

                _contexto.LogEntradaSaida.Remove(log);
                _contexto.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}

