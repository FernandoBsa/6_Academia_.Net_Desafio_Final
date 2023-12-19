using System.ComponentModel.DataAnnotations;

namespace Desafio_Final.ViewModel
{
    public class EstoqueViewModel
    {
        public int Id { get; set; }
        public string NomeProduto { get; set; }
        public string Fabricante { get; set; }
        public int Quantidade { get; set; }
        public decimal PrecoUnitario { get; set; }
    }
}
