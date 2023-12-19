using Desafio_Final.Filter;
using Desafio_Final.Models;
using Desafio_Final.ViewModel;

namespace Desafio_Final.Interfaces
{
    public interface ILogEntradaSaida
    {
        bool EntradaProduto(LogEntradaSaidaViewModel logViewModel);
        bool SaidaProduto(LogEntradaSaidaViewModel logViewModel);
        List<LogConsultaViewModel> ConsultarTodosOsLogs();
        List<LogConsultaViewModel> FiltrarLogs(FiltroLog filtro);
    }
}
