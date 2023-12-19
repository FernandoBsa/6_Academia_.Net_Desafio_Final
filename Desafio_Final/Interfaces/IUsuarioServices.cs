using Desafio_Final.Models;
using Desafio_Final.ViewModel;

namespace Desafio_Final.Interfaces
{
    public interface IUsuarioServices
    {
        bool CadastroUsuario(CasdastroUsuarioViewModel usuario);
        bool ConsultarUsuarioExiste(string usuario);
        bool ValidarLogin(LoginViewModel loginViewModel);
    }
}
