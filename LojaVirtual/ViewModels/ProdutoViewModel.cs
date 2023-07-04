using Loja.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace LojaVirtual.ViewModels
{
    public class ProdutoViewModel : Entity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MinLength(3, ErrorMessage = "Mínimo {0} caracteres")]
        public string Nome { get; set; }
        [Required]
        [MinLength(3, ErrorMessage = "Mínimo {0} caracteres")]
        public string Descricao { get; set; }
        [Required]
        [MinLength(3, ErrorMessage = "Mínimo {0} caracteres")]
        public string Image { get; set; }

        [Required(ErrorMessage = "Preencha um valor")]
        [Range(typeof(decimal), "0", "9999999999")]
        public decimal Preco { get; set; }
        [Required(ErrorMessage = "O campo Quantidade é obrigatório.")]
        [Range(1, int.MaxValue, ErrorMessage = "O campo Quantidade deve ser um valor maior que zero.")]
        public int Quantidade { get; set; }

        [Required(ErrorMessage = "O campo Ativo é obrigatório.")]
        public bool Ativo { get; set; }
        public DateTime CriadoEm { get; set; }
        public DateTime AtualizadoEm { get; set; }
        public TipoPromocao? Promocao { get; set; }
    }
}
